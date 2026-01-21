var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/rag.js
async function generateEmbedding(text, apiKey) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "models/text-embedding-004",
        content: { parts: [{ text }] }
      })
    }
  );
  if (!response.ok) {
    throw new Error(`Embedding API Error: ${await response.text()}`);
  }
  const data = await response.json();
  return data.embedding.values;
}
__name(generateEmbedding, "generateEmbedding");
async function searchNcertContent(query, subject, classLevel, supabaseUrl, supabaseKey, geminiKey) {
  const embedding = await generateEmbedding(query, geminiKey);
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/match_ncert_content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": supabaseKey,
      "Authorization": `Bearer ${supabaseKey}`
    },
    body: JSON.stringify({
      query_embedding: embedding,
      subject_filter: subject || null,
      class_filter: classLevel || null,
      match_threshold: 0.6,
      match_count: 5
    })
  });
  if (!response.ok) {
    console.error("Supabase search error:", await response.text());
    return [];
  }
  return await response.json();
}
__name(searchNcertContent, "searchNcertContent");
function formatContext(results) {
  if (!results || results.length === 0) {
    return null;
  }
  const contextParts = results.map((r, i) => {
    const source = `NCERT ${r.subject.charAt(0).toUpperCase() + r.subject.slice(1)} Class ${r.class_level}, Chapter ${r.chapter_number}: ${r.chapter_name}`;
    const subtopic = r.subtopic ? ` (${r.subtopic})` : "";
    return `[Source ${i + 1}: ${source}${subtopic}]
${r.content}`;
  });
  return contextParts.join("\n\n---\n\n");
}
__name(formatContext, "formatContext");
function buildRagPrompt(originalPrompt, context, sources) {
  if (!context) {
    return originalPrompt;
  }
  return `${originalPrompt}

---
## NCERT Reference Content (Use this as authoritative source)

The following content is extracted from NCERT textbooks. Use this to provide accurate, NCERT-aligned answers:

${context}

---
IMPORTANT: 
- Base your response on the NCERT content provided above
- Cite sources when making specific claims (e.g., "According to NCERT...")
- If the NCERT content doesn't cover something, clearly state it's additional information`;
}
__name(buildRagPrompt, "buildRagPrompt");

// api/explain.js
async function onRequestPost({ request, env }) {
  try {
    const req = await request.json();
    const { topic, subject, class_level, action_type, subtopic, question_type } = req;
    const claude_key = env.CLAUDE_API_KEY;
    const gemini_key = env.GEMINI_API_KEY;
    const supabase_url = env.SUPABASE_URL;
    const supabase_key = env.SUPABASE_ANON_KEY;
    if (!claude_key && !gemini_key) {
      return new Response(JSON.stringify({
        success: false,
        error: "Server misconfiguration: No API keys found in environment variables"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    let ragContext = null;
    let sources = [];
    if (supabase_url && supabase_key && gemini_key) {
      try {
        const searchQuery = subtopic ? `${topic} ${subtopic}` : topic;
        const results = await searchNcertContent(
          searchQuery,
          subject,
          class_level,
          supabase_url,
          supabase_key,
          gemini_key
        );
        if (results && results.length > 0) {
          ragContext = formatContext(results);
          sources = results.map((r) => ({
            chapter: r.chapter_name,
            subject: r.subject,
            classLevel: r.class_level
          }));
        }
      } catch (ragError) {
        console.error("RAG search error:", ragError);
      }
    }
    let system_prompt = getSystemPrompt(action_type, subject, class_level, topic, question_type);
    if (ragContext && action_type !== "mcq") {
      system_prompt = buildRagPrompt(system_prompt, ragContext, sources);
    }
    const user_prompt = `Topic: ${topic}${subtopic ? ` - Subtopic: ${subtopic}` : ""}`;
    if (claude_key) {
      try {
        const content = await callClaude(user_prompt, system_prompt, claude_key);
        let mcqs = null;
        let questions = null;
        if (action_type === "mcq" || action_type === "statement-questions") {
          try {
            let json_str = content.trim();
            if (json_str.startsWith("```json")) json_str = json_str.slice(7, -3);
            else if (json_str.startsWith("```")) json_str = json_str.slice(3, -3);
            const parsed = JSON.parse(json_str);
            if (action_type === "mcq") mcqs = parsed;
            else questions = parsed;
          } catch (e) {
          }
        }
        return new Response(JSON.stringify({
          success: true,
          content,
          provider: "claude",
          mcqs,
          questions,
          sources: sources.length > 0 ? sources : void 0
        }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (e) {
        if (!gemini_key) throw e;
      }
    }
    if (gemini_key) {
      try {
        const content = await callGemini(user_prompt, system_prompt, gemini_key);
        let mcqs = null;
        let questions = null;
        if (action_type === "mcq" || action_type === "statement-questions") {
          try {
            let json_str = content.trim();
            if (json_str.startsWith("```json")) json_str = json_str.slice(7, -3);
            else if (json_str.startsWith("```")) json_str = json_str.slice(3, -3);
            const parsed = JSON.parse(json_str);
            if (action_type === "mcq") mcqs = parsed;
            else questions = parsed;
          } catch (e) {
          }
        }
        return new Response(JSON.stringify({
          success: true,
          content,
          provider: "gemini",
          mcqs,
          questions,
          sources: sources.length > 0 ? sources : void 0
        }), {
          headers: { "Content-Type": "application/json" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.toString(), provider: "gemini" }), {
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    throw new Error("All providers failed");
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost, "onRequestPost");
async function callClaude(prompt, systemPrompt, apiKey) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 3e3,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }]
    })
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API Error: ${err}`);
  }
  const data = await response.json();
  return data.content[0].text;
}
__name(callClaude, "callClaude");
async function callGemini(prompt, systemPrompt, apiKey) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: `${systemPrompt}

Task: ${prompt}` }]
      }],
      generationConfig: {
        maxOutputTokens: 4096,
        temperature: 0.2
      }
    })
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API Error: ${err}`);
  }
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
__name(callGemini, "callGemini");
function getSystemPrompt(action_type, subject, class_level, topic, question_type = "statement") {
  const subject_display = subject.charAt(0).toUpperCase() + subject.slice(1);
  const class_display = `Class ${class_level}`;
  if (action_type === "explain") {
    return `You are an expert NEET exam tutor specializing in ${subject_display} for ${class_display}. 
Explain the concept "${topic}" clearly and thoroughly. Include:
1. Core definition and concept
2. Important points for NEET exam
3. Common misconceptions to avoid
4. Real-world examples or applications
5. Memory tricks or mnemonics if applicable

Format your response with clear headings (##) and bullet points. Be comprehensive but concise.`;
  }
  if (action_type === "eli5") {
    return `You are a friendly tutor explaining ${subject_display} to a ${class_display} student who is struggling.
Explain "${topic}" in the simplest possible terms:
1. Use everyday analogies and examples a teenager can relate to
2. Avoid jargon - when you must use technical terms, explain them simply
3. Use visual descriptions when helpful
4. Keep it encouraging and relatable
5. End with a simple summary in 2-3 lines

Make it so simple that anyone could understand, but still accurate for NEET preparation.`;
  }
  if (action_type === "keypoints") {
    return `You are a NEET exam expert. For "${topic}" in ${subject_display} ${class_display}:
1. List the TOP 10 most important points for NEET
2. Mark which points are MOST FREQUENTLY asked (add \u2B50 for frequently asked)
3. Include any formulas/reactions that MUST be memorized
4. Mention typical question patterns
5. Add 2-3 quick revision points
6. Include common traps/mistakes students make

Format as a clear, numbered list. This should be perfect for last-minute revision.`;
  }
  if (action_type === "mcq") {
    return `You are a NEET exam question creator. Create 5 NEET-style MCQs for "${topic}" in ${subject_display} ${class_display}.

For each question provide:
- The question (similar to actual NEET difficulty)
- 4 options (A, B, C, D)
- Correct answer index (0-3)
- Brief explanation of why it's correct and why others are wrong

Include at least one application-based question and one conceptual question.

Response MUST be a raw JSON array like this:
[
  {
    "question": "Question text here...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Explanation here..."
  }
]
Do not add any markdown formatting or extra text outside the JSON.`;
  }
  if (action_type === "statement-questions") {
    const questionFormat = question_type === "assertion" ? "Assertion-Reason" : "Statement-based";
    const optionsFormat = question_type === "assertion" ? `[
    "Both (A) and (R) are true and (R) is the correct explanation of (A)",
    "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
    "(A) is true but (R) is false",
    "(A) is false but (R) is true"
  ]` : `[
    "Both statements are correct",
    "Only statement I is correct",
    "Only statement II is correct",
    "Both statements are incorrect"
  ]`;
    const statementsFormat = question_type === "assertion" ? `[{"label": "Assertion (A)", "text": "..."}, {"label": "Reason (R)", "text": "..."}]` : `[{"label": "I", "text": "..."}, {"label": "II", "text": "..."}]`;
    return `You are a NEET exam question creator specializing in ${questionFormat} questions.

Create 5 ${questionFormat} questions for "${topic}" in ${subject_display} ${class_display}.

For each question:
1. Create statements that test conceptual understanding
2. Make some statements obviously true/false and others subtle
3. Include common misconceptions students might have
4. Base questions on NCERT content
5. Provide clear explanations

Response MUST be a raw JSON array:
[
  {
    "type": "${question_type}",
    "text": "${question_type === "assertion" ? "Given below are two statements:" : "Consider the following statements:"}",
    "statements": ${statementsFormat},
    "options": ${optionsFormat},
    "correct": 0,
    "explanation": "Explanation of why this is correct, referencing NCERT...",
    "ncertRef": "${subject_display} ${class_display} - Chapter X: Chapter Name"
  }
]

Ensure:
- Statements are factually accurate based on NCERT
- Mix of easy and challenging questions
- Clear, educational explanations
- No markdown, just raw JSON`;
  }
  if (action_type === "ncert") {
    return `You are an NCERT textbook expert. For "${topic}" in ${subject_display} ${class_display}:
1. Specify which NCERT book and exact chapter covers this topic
2. Mention specific page ranges if possible (based on standard NCERT editions)
3. Highlight which sections are most important for NEET
4. Note any diagrams, tables, or figures that are frequently tested
5. Point out any additional topics in the same chapter that are related
6. Mention if this topic also appears in other chapters

Be specific with book names (e.g., "Biology Class 12, Chapter 5: Principles of Inheritance and Variation").`;
  }
  if (action_type === "visual") {
    return `You are an expert at explaining ${subject_display} concepts visually. For "${topic}" in ${class_display}:

Create a clear visual representation using ONE of these formats (choose the most appropriate):

1. **ASCII Diagram** - For structures, cycles, or processes
2. **Flowchart** - For sequential processes (use arrows \u2192, \u2193)
3. **Comparison Table** - For comparing concepts
4. **Mind Map** - For related concepts (use indentation and symbols)

Guidelines:
- Use clear labels
- Show relationships with arrows
- Include key terms
- Add brief explanations below the visual
- Make it easy to memorize

After the visual, add:
- 3 key points to remember
- One memory trick or mnemonic if applicable`;
  }
  return `You are a NEET exam tutor specializing in ${subject_display} for ${class_display}. 
Help the student understand the topic: ${topic}

Guidelines:
- Be accurate and comprehensive
- Use simple language
- Include relevant examples
- Relate to NEET exam requirements
- Use bullet points and headings for clarity
- If the question mentions Telugu, respond in Telugu (\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41)
- If they ask for mnemonics, be creative but accurate`;
}
__name(getSystemPrompt, "getSystemPrompt");

// ../.wrangler/tmp/pages-wGTAjp/functionsRoutes-0.5823004324878674.mjs
var routes = [
  {
    routePath: "/api/explain",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  }
];

// ../../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../AppData/Local/npm-cache/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
