// NEET Study Assistant - Enhanced Application Logic

// State
let currentSubject = null;
let currentClass = '12';
let currentChapter = null;
let currentSubtopic = null;
let expandedChapters = {};
let allChapters = [];
let isLoading = false;
let conversationHistory = [];
let lastAIResponse = '';
let currentFormulaSubject = 'physics';

// Backend API URL
const API_BASE_URL = '';

// Exam dates (update these)
const IPE_EXAM_DATE = new Date('2026-03-15');
const NEET_EXAM_DATE = new Date('2026-05-04');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCountdowns();
    loadProgress();
    loadSavedContent();
    loadHistory();
    loadRecentActivity();
    updateStats();
    updateStudyStreak();

    // Enter key handler
    document.getElementById('ai-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendCustomQuery();
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.global-search-container')) {
            document.getElementById('search-results').style.display = 'none';
        }
    });

    // Update countdowns every minute
    setInterval(updateCountdowns, 60000);
});

// Countdown timer
function updateCountdowns() {
    const now = new Date();
    const ipedays = Math.ceil((IPE_EXAM_DATE - now) / (1000 * 60 * 60 * 24));
    const neetDays = Math.ceil((NEET_EXAM_DATE - now) / (1000 * 60 * 60 * 24));

    document.getElementById('ipe-countdown').textContent = Math.max(0, ipedays);
    document.getElementById('neet-countdown').textContent = Math.max(0, neetDays);
}

// Global Search
function handleGlobalSearch(query) {
    const resultsContainer = document.getElementById('search-results');

    if (query.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }

    const results = searchAllTopics(query);

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item"><div class="search-result-title">No results found</div></div>';
    } else {
        resultsContainer.innerHTML = results.slice(0, 8).map(r => `
            <div class="search-result-item" onclick="goToSearchResult('${r.subject}', '${r.classLevel}', ${r.chapterNumber})">
                <div class="search-result-title">${highlightMatch(r.name, query)}</div>
                <div class="search-result-meta">${r.subject} • Class ${r.classLevel} • Chapter ${r.chapterNumber}</div>
            </div>
        `).join('');
    }

    resultsContainer.style.display = 'block';
}

function searchAllTopics(query) {
    const results = [];
    const q = query.toLowerCase();

    for (const subject of ['biology', 'chemistry', 'physics']) {
        for (const classLevel of ['11', '12']) {
            const chapters = NCERT_DATA[subject][classLevel];
            for (const ch of chapters) {
                // Search in chapter name and keywords
                const nameMatch = ch.name.toLowerCase().includes(q);
                const keywordMatch = (TOPIC_KEYWORDS[subject]?.[ch.name] || []).some(k => k.toLowerCase().includes(q));

                if (nameMatch || keywordMatch) {
                    results.push({
                        name: ch.name,
                        subject: subject.charAt(0).toUpperCase() + subject.slice(1),
                        classLevel,
                        chapterNumber: ch.number
                    });
                }
            }
        }
    }

    return results;
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong style="color: var(--accent-primary)">$1</strong>');
}

function goToSearchResult(subject, classLevel, chapterNumber) {
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('global-search').value = '';

    selectClass(classLevel);
    selectSubject(subject.toLowerCase());

    setTimeout(() => {
        const chapter = NCERT_DATA[subject.toLowerCase()][classLevel].find(c => c.number === chapterNumber);
        if (chapter) {
            currentChapter = chapter;
            showChapterContent();
        }
    }, 100);
}

// View switching
function switchView(view) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    // Hide all views
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('chapter-content').style.display = 'none';
    document.getElementById('saved-view').style.display = 'none';
    document.getElementById('formulas-view').style.display = 'none';
    document.getElementById('progress-view').style.display = 'none';

    if (view === 'study') {
        if (currentChapter) {
            document.getElementById('chapter-content').style.display = 'block';
        } else {
            document.getElementById('welcome-screen').style.display = 'block';
        }
    } else if (view === 'saved') {
        document.getElementById('saved-view').style.display = 'block';
        loadSavedContent();
    } else if (view === 'formulas') {
        document.getElementById('formulas-view').style.display = 'block';
        showFormulaSubject(currentFormulaSubject);
    } else if (view === 'progress') {
        document.getElementById('progress-view').style.display = 'block';
        updateProgressView();
    }
}

// Subject selection
function selectSubject(subject) {
    currentSubject = subject;

    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`.subject-card.${subject}`).classList.add('active');

    document.getElementById('chapters-section').style.display = 'block';
    updateChapterCounts();
    loadChapters();
}

// Class selection
function selectClass(classLevel) {
    currentClass = classLevel;

    document.querySelectorAll('.class-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.class === classLevel);
    });

    updateChapterCounts();

    if (currentSubject) {
        loadChapters();
    }
}

// Update chapter counts
function updateChapterCounts() {
    document.getElementById('bio-chapters').textContent = CHAPTER_COUNTS.biology[currentClass] + ' chapters';
    document.getElementById('chem-chapters').textContent = CHAPTER_COUNTS.chemistry[currentClass] + ' chapters';
    document.getElementById('phys-chapters').textContent = CHAPTER_COUNTS.physics[currentClass] + ' chapters';
}

// Load chapters
function loadChapters() {
    if (!currentSubject) return;

    allChapters = NCERT_DATA[currentSubject][currentClass];
    renderChapters(allChapters);
}

// Render chapters with subtopics
function renderChapters(chapters) {
    const container = document.getElementById('chapter-list');
    const completed = getCompletedChapters();

    if (chapters.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No chapters found</p>';
        return;
    }

    // Add priority legend if chapters have subtopics
    const hasSubtopics = chapters.some(ch => ch.subtopics && ch.subtopics.length > 0);
    let html = '';

    if (hasSubtopics) {
        html += `
            <div class="priority-legend">
                <div class="priority-legend-item"><span class="priority-dot high"></span> High Priority</div>
                <div class="priority-legend-item"><span class="priority-dot medium"></span> Medium</div>
                <div class="priority-legend-item"><span class="priority-dot low"></span> Low</div>
            </div>
        `;
    }

    html += chapters.map(ch => {
        const isCompleted = completed.includes(`${currentSubject}-${currentClass}-${ch.number}`);
        const hasChapterSubtopics = ch.subtopics && ch.subtopics.length > 0;
        const isExpanded = expandedChapters[`${currentSubject}-${currentClass}-${ch.number}`];
        const isActive = currentChapter?.number === ch.number;

        let chapterHtml = `
            <div class="chapter-group">
                <button class="chapter-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${hasChapterSubtopics ? 'has-subtopics' : ''} ${isExpanded ? 'expanded' : ''}" 
                        onclick="${hasChapterSubtopics ? `toggleChapterSubtopics(${ch.number}, event)` : `selectChapter(${ch.number})`}">
                    <span class="chapter-number">${isCompleted ? '✓' : ch.number}</span>
                    <span style="flex: 1; text-align: left;">${ch.name}</span>
                    ${hasChapterSubtopics ? '<span class="expand-icon">▼</span>' : ''}
                </button>
        `;

        if (hasChapterSubtopics) {
            chapterHtml += `
                <div class="subtopics-list ${isExpanded ? 'expanded' : ''}" id="subtopics-${ch.number}">
                    ${ch.subtopics.map(sub => `
                        <button class="subtopic-item ${currentSubtopic?.id === sub.id && currentChapter?.number === ch.number ? 'active' : ''}"
                                onclick="selectSubtopic(${ch.number}, ${sub.id})">
                            <span class="priority-dot ${sub.priority}"></span>
                            <span>${sub.name}</span>
                        </button>
                    `).join('')}
                </div>
            `;
        }

        chapterHtml += '</div>';
        return chapterHtml;
    }).join('');

    container.innerHTML = html;
}

// Toggle chapter subtopics
function toggleChapterSubtopics(chapterNumber, event) {
    event.stopPropagation();
    const key = `${currentSubject}-${currentClass}-${chapterNumber}`;
    expandedChapters[key] = !expandedChapters[key];
    renderChapters(allChapters);
}

// Filter chapters
function filterChapters(query) {
    const filtered = allChapters.filter(ch =>
        ch.name.toLowerCase().includes(query.toLowerCase()) ||
        (ch.subtopics && ch.subtopics.some(sub => sub.name.toLowerCase().includes(query.toLowerCase())))
    );
    renderChapters(filtered);
}

// Select chapter (without subtopic)
function selectChapter(chapterNumber) {
    currentChapter = allChapters.find(ch => ch.number === chapterNumber);
    if (!currentChapter) return;

    currentSubtopic = null; // Reset subtopic
    conversationHistory = [];
    showChapterContent();
    addToHistory(currentChapter.name, currentSubject, currentClass);
}

// Select subtopic
function selectSubtopic(chapterNumber, subtopicId) {
    currentChapter = allChapters.find(ch => ch.number === chapterNumber);
    if (!currentChapter) return;

    currentSubtopic = currentChapter.subtopics?.find(sub => sub.id === subtopicId) || null;
    conversationHistory = [];
    showChapterContent();
    renderChapters(allChapters); // Re-render to show active subtopic
    addToHistory(`${currentChapter.name} - ${currentSubtopic?.name}`, currentSubject, currentClass);
}

function showChapterContent() {
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('active');
    });

    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('chapter-content').style.display = 'block';

    // Update header
    document.getElementById('chapter-badge').textContent = `Chapter ${currentChapter.number}`;
    document.getElementById('subject-badge').textContent = NCERT_DATA[currentSubject].name;
    document.getElementById('subject-badge').className = `badge subject-badge ${currentSubject}`;
    document.getElementById('class-badge').textContent = `Class ${currentClass}`;

    // Chapter title with optional subtopic badge
    let titleHtml = currentChapter.name;
    if (currentSubtopic) {
        titleHtml += ` <span class="current-subtopic-badge"><span class="priority-dot ${currentSubtopic.priority}"></span>${currentSubtopic.name}</span>`;
    }
    document.getElementById('chapter-title').innerHTML = titleHtml;
    document.getElementById('chapter-book').textContent = currentChapter.book;

    // Update complete button
    const isCompleted = getCompletedChapters().includes(`${currentSubject}-${currentClass}-${currentChapter.number}`);
    document.getElementById('complete-icon').textContent = isCompleted ? '✅' : '☐';

    // NCERT reference
    document.getElementById('ncert-book-ref').textContent = `${currentChapter.book} - Chapter ${currentChapter.number}`;
    document.getElementById('ncert-pdf-link').href = currentChapter.pdfUrl;

    // Build subtopic pills if chapter has subtopics
    let subtopicPillsHtml = '';
    if (currentChapter.subtopics && currentChapter.subtopics.length > 0) {
        subtopicPillsHtml = `
            <div class="subtopic-pills">
                <button class="subtopic-pill ${!currentSubtopic ? 'active' : ''}" onclick="selectChapter(${currentChapter.number})">
                    📖 Full Chapter
                </button>
                ${currentChapter.subtopics.map(sub => `
                    <button class="subtopic-pill ${currentSubtopic?.id === sub.id ? 'active' : ''}" 
                            onclick="selectSubtopic(${currentChapter.number}, ${sub.id})">
                        <span class="priority-dot ${sub.priority}"></span>
                        ${sub.name}
                    </button>
                `).join('')}
            </div>
        `;
    }

    // AI placeholder with subtopic pills
    const focusText = currentSubtopic
        ? `Get AI explanations for <strong>${currentSubtopic.name}</strong>`
        : 'Click an action button above to get AI-powered explanations!';

    document.getElementById('ai-content').innerHTML = `
        ${subtopicPillsHtml}
        <div class="ai-placeholder">
            <span>✨</span>
            <p>${focusText}</p>
            <p class="small">Or type your specific question below.</p>
        </div>
    `;

    document.getElementById('follow-up-container').style.display = 'none';
}

// Mark chapter complete
function markChapterComplete() {
    if (!currentChapter) return;

    const key = `${currentSubject}-${currentClass}-${currentChapter.number}`;
    let completed = getCompletedChapters();

    if (completed.includes(key)) {
        completed = completed.filter(c => c !== key);
        document.getElementById('complete-icon').textContent = '☐';
        showToast('Chapter marked as incomplete');
    } else {
        completed.push(key);
        document.getElementById('complete-icon').textContent = '✅';
        showToast('✅ Chapter marked as complete!', 'success');
    }

    localStorage.setItem('completed_chapters', JSON.stringify(completed));
    loadChapters();
    updateStats();
    updateSubjectProgress();
}

function getCompletedChapters() {
    return JSON.parse(localStorage.getItem('completed_chapters') || '[]');
}

// AI Actions
async function aiAction(type) {
    if (!currentChapter || isLoading) return;

    isLoading = true;
    showLoading();

    // Build topic with optional subtopic focus
    let topic = currentChapter.name;
    if (currentSubtopic) {
        topic = `${currentChapter.name} - specifically about: ${currentSubtopic.name}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/explain`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topic: topic,
                subject: currentSubject,
                class_level: currentClass,
                action_type: type,
                subtopic: currentSubtopic?.name || null
            })
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();

        if (data.success) {
            if (type === 'mcq' && data.mcqs) {
                showMCQModal(data.mcqs);
            } else {
                lastAIResponse = data.content;
                conversationHistory.push({ role: 'assistant', content: data.content });
                appendAIMessage(data.content, data.provider);
                document.getElementById('follow-up-container').style.display = 'flex';
            }
        } else {
            appendAIMessage(`Error: ${data.error || 'Something went wrong'}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        appendAIMessage(`Error: ${error.message}`, 'error');
    } finally {
        isLoading = false;
    }
}

// Follow-up questions
async function followUp(type) {
    if (!currentChapter || isLoading || !lastAIResponse) return;

    let prompt = '';
    switch (type) {
        case 'example':
            prompt = `Based on your previous explanation of ${currentChapter.name}, give me a real-world example or practical application. Make it relatable to a student.`;
            break;
        case 'simpler':
            prompt = `Your explanation was a bit complex. Can you explain ${currentChapter.name} in even simpler terms? Use an analogy that a 10-year-old could understand.`;
            break;
        case 'compare':
            prompt = `For ${currentChapter.name}, compare and contrast the key concepts. Create a simple comparison table if applicable.`;
            break;
        case 'telugu':
            prompt = `Please explain the key concepts of ${currentChapter.name} in Telugu (తెలుగు). Keep it simple and clear.`;
            break;
        case 'mnemonics':
            prompt = `Create memory tricks, mnemonics, or easy ways to remember the key facts from ${currentChapter.name}. Make them catchy and memorable for NEET exam.`;
            break;
    }

    await sendQuery(prompt);
}

// Send custom query
async function sendCustomQuery() {
    const input = document.getElementById('ai-input');
    const query = input.value.trim();

    if (!query || !currentChapter || isLoading) return;
    input.value = '';

    await sendQuery(query);
}

async function sendQuery(query) {
    isLoading = true;
    showLoading();

    try {
        const combinedTopic = `${currentChapter.name}. Question: ${query}`;
        conversationHistory.push({ role: 'user', content: query });

        const response = await fetch(`${API_BASE_URL}/api/explain`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topic: combinedTopic,
                subject: currentSubject,
                class_level: currentClass,
                action_type: 'explain'
            })
        });

        if (!response.ok) throw new Error("API failed");
        const data = await response.json();

        if (data.success) {
            lastAIResponse = data.content;
            conversationHistory.push({ role: 'assistant', content: data.content });
            appendAIMessage(data.content, data.provider);
            document.getElementById('follow-up-container').style.display = 'flex';
        } else {
            appendAIMessage(`Error: ${data.error}`, 'error');
        }
    } catch (error) {
        appendAIMessage(`Error: ${error.message}`, 'error');
    } finally {
        isLoading = false;
    }
}

// Show loading
function showLoading() {
    const container = document.getElementById('ai-content');
    container.innerHTML += `
        <div class="ai-message" id="loading-message">
            <div class="loading">
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span>Generating response...</span>
            </div>
        </div>
    `;
    container.scrollTop = container.scrollHeight;
}

// Remove loading
function removeLoading() {
    const loadingMsg = document.getElementById('loading-message');
    if (loadingMsg) loadingMsg.remove();
}

// Append AI message
function appendAIMessage(content, provider) {
    removeLoading();

    const container = document.getElementById('ai-content');
    const placeholder = container.querySelector('.ai-placeholder');
    if (placeholder) placeholder.remove();

    const formattedContent = formatContent(content);

    const messageHTML = `
        <div class="ai-message">
            <span class="provider-badge ${provider}">${provider === 'claude' ? '⚡ Claude' : provider === 'gemini' ? '💎 Gemini' : '⚠️ Error'}</span>
            <div style="margin-top: 12px;">${formattedContent}</div>
            <div style="margin-top: 16px; display: flex; gap: 8px;">
                <button onclick="saveExplanation(\`${escape(content)}\`)" class="follow-up-btn">🔖 Save</button>
                <button onclick="copyToClipboard(\`${escape(content)}\`)" class="follow-up-btn">📋 Copy</button>
            </div>
        </div>
    `;

    container.innerHTML += messageHTML;
    container.scrollTop = container.scrollHeight;
}

// Format content
function formatContent(content) {
    if (!content) return "";
    return content
        .replace(/^### (.+)$/gm, '<h5 style="color: var(--accent-primary); margin-top: 16px; margin-bottom: 8px;">$1</h5>')
        .replace(/^## (.+)$/gm, '<h4 style="color: var(--accent-primary); margin-top: 20px; margin-bottom: 8px;">$1</h4>')
        .replace(/^# (.+)$/gm, '<h4 style="color: var(--accent-primary); margin-top: 20px; margin-bottom: 8px;">$1</h4>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code style="background: var(--bg-primary); padding: 2px 6px; border-radius: 4px;">$1</code>')
        .replace(/^- (.+)$/gm, '<li style="margin-left: 20px; margin-bottom: 4px;">$1</li>')
        .replace(/^• (.+)$/gm, '<li style="margin-left: 20px; margin-bottom: 4px;">$1</li>')
        .replace(/^\d+\. (.+)$/gm, '<li style="margin-left: 20px; margin-bottom: 4px;">$1</li>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}

// Copy to clipboard
function copyToClipboard(content) {
    navigator.clipboard.writeText(unescape(content)).then(() => {
        showToast('📋 Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
}

// Toast notification
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// MCQ Modal
let currentMCQs = [];
let currentMCQIndex = 0;
let mcqScore = 0;
let mcqAnswered = [];
let currentDifficulty = 'easy';

function setDifficulty(diff) {
    currentDifficulty = diff;
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(diff));
    });
}

function showMCQModal(mcqs) {
    removeLoading();
    currentMCQs = mcqs;
    currentMCQIndex = 0;
    mcqScore = 0;
    mcqAnswered = new Array(mcqs.length).fill(false);

    document.getElementById('mcq-modal').style.display = 'flex';
    renderMCQ();
}

function closeMCQModal() {
    document.getElementById('mcq-modal').style.display = 'none';

    // Save MCQ stats
    saveMCQStats();
}

function renderMCQ() {
    const mcq = currentMCQs[currentMCQIndex];
    const container = document.getElementById('mcq-content');

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
            <span style="color: var(--text-secondary);">Question ${currentMCQIndex + 1} of ${currentMCQs.length}</span>
            <span class="mcq-score">Score: ${mcqScore}/${mcqAnswered.filter(a => a).length}</span>
        </div>
        
        <div style="display: flex; gap: 8px; margin-bottom: 20px;">
            ${currentMCQs.map((_, i) => `
                <div style="flex: 1; height: 4px; border-radius: 2px; background: ${mcqAnswered[i] ? 'var(--accent-success)' : i === currentMCQIndex ? 'var(--accent-primary)' : 'var(--bg-tertiary)'}"></div>
            `).join('')}
        </div>
        
        <div class="mcq-question">
            <h4>${mcq.question}</h4>
            <div class="mcq-options">
                ${mcq.options.map((opt, i) => `
                    <button class="mcq-option" data-index="${i}" onclick="selectMCQOption(${i})" ${mcqAnswered[currentMCQIndex] ? 'disabled' : ''}>
                        ${String.fromCharCode(65 + i)}. ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="mcq-explanation" id="mcq-explanation" style="display: none;">
                <strong style="color: var(--accent-primary);">Explanation:</strong>
                <p style="margin-top: 8px;">${mcq.explanation}</p>
            </div>
        </div>
        
        <div class="mcq-navigation">
            <button class="mcq-nav-btn" onclick="prevMCQ()" ${currentMCQIndex === 0 ? 'disabled' : ''}>← Previous</button>
            <button class="mcq-nav-btn" onclick="closeMCQModal()">Close</button>
            ${currentMCQIndex < currentMCQs.length - 1
            ? `<button class="mcq-next-btn" onclick="nextMCQ()" ${!mcqAnswered[currentMCQIndex] ? 'disabled' : ''}>Next →</button>`
            : mcqAnswered.every(a => a)
                ? `<button class="mcq-next-btn" onclick="closeMCQModal()">Complete (${mcqScore}/${currentMCQs.length})</button>`
                : `<button class="mcq-next-btn" disabled>Answer to Continue</button>`
        }
        </div>
    `;

    if (mcqAnswered[currentMCQIndex]) {
        document.querySelectorAll('.mcq-option').forEach((btn, i) => {
            if (i === mcq.correct) {
                btn.classList.add('correct');
            }
        });
        document.getElementById('mcq-explanation').style.display = 'block';
    }
}

function selectMCQOption(index) {
    if (mcqAnswered[currentMCQIndex]) return;

    mcqAnswered[currentMCQIndex] = true;
    const mcq = currentMCQs[currentMCQIndex];

    if (index === mcq.correct) {
        mcqScore++;
    }

    const buttons = document.querySelectorAll('.mcq-option');
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === mcq.correct) {
            btn.classList.add('correct');
        } else if (i === index && i !== mcq.correct) {
            btn.classList.add('incorrect');
        }
    });

    document.getElementById('mcq-explanation').style.display = 'block';
    setTimeout(() => renderMCQ(), 100);
}

function nextMCQ() {
    if (currentMCQIndex < currentMCQs.length - 1) {
        currentMCQIndex++;
        renderMCQ();
    }
}

function prevMCQ() {
    if (currentMCQIndex > 0) {
        currentMCQIndex--;
        renderMCQ();
    }
}

function saveMCQStats() {
    const stats = JSON.parse(localStorage.getItem('mcq_stats') || '{"total": 0, "correct": 0, "byTopic": {}}');

    stats.total += currentMCQs.length;
    stats.correct += mcqScore;

    const topicKey = `${currentSubject}-${currentChapter.name}`;
    if (!stats.byTopic[topicKey]) {
        stats.byTopic[topicKey] = { total: 0, correct: 0 };
    }
    stats.byTopic[topicKey].total += currentMCQs.length;
    stats.byTopic[topicKey].correct += mcqScore;

    localStorage.setItem('mcq_stats', JSON.stringify(stats));
    updateStats();
}

// Storage - Save explanation
function saveExplanation(content) {
    const saved = JSON.parse(localStorage.getItem('saved_explanations') || '[]');

    saved.push({
        id: Date.now(),
        topic: currentChapter.name,
        subject: currentSubject,
        classLevel: currentClass,
        content: unescape(content),
        savedAt: new Date().toISOString()
    });

    localStorage.setItem('saved_explanations', JSON.stringify(saved));
    showToast('🔖 Saved for offline reading!', 'success');
}

// Load saved content
function loadSavedContent() {
    const saved = JSON.parse(localStorage.getItem('saved_explanations') || '[]');
    const container = document.getElementById('saved-list');

    if (saved.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span>🔖</span>
                <h3>No saved content yet</h3>
                <p>Click "Save" on any AI explanation to save it for offline access.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = saved.reverse().map(item => `
        <div class="saved-item">
            <div>
                <h4>${item.topic}</h4>
                <p>${item.subject} • Class ${item.classLevel} • ${new Date(item.savedAt).toLocaleDateString()}</p>
            </div>
            <button onclick="deleteSaved(${item.id})">🗑️ Delete</button>
        </div>
    `).join('');
}

function deleteSaved(id) {
    if (!confirm('Delete this saved explanation?')) return;

    let saved = JSON.parse(localStorage.getItem('saved_explanations') || '[]');
    saved = saved.filter(s => s.id !== id);
    localStorage.setItem('saved_explanations', JSON.stringify(saved));
    loadSavedContent();
    showToast('Deleted!');
}

// History
function addToHistory(topic, subject, classLevel) {
    let history = JSON.parse(localStorage.getItem('study_history') || '[]');
    history = history.filter(h => h.topic !== topic || h.subject !== subject);

    history.unshift({
        topic,
        subject,
        classLevel,
        visitedAt: new Date().toISOString()
    });

    history = history.slice(0, 20);
    localStorage.setItem('study_history', JSON.stringify(history));
    updateStudyStreak();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('study_history') || '[]');
    return history;
}

function loadRecentActivity() {
    const history = loadHistory();
    const container = document.getElementById('recent-activity');

    if (history.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <h3>📜 Recent Activity</h3>
        <div class="saved-list" style="margin-top: 12px;">
            ${history.slice(0, 5).map(item => `
                <div class="saved-item" style="cursor: pointer;" onclick="goToSearchResult('${item.subject}', '${item.classLevel}', 1)">
                    <div>
                        <h4>${item.topic}</h4>
                        <p>${item.subject} • Class ${item.classLevel} • ${new Date(item.visitedAt).toLocaleString()}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Study streak
function updateStudyStreak() {
    const history = loadHistory();
    if (history.length === 0) {
        document.getElementById('study-streak').textContent = '0';
        return;
    }

    const today = new Date().toDateString();
    const dates = [...new Set(history.map(h => new Date(h.visitedAt).toDateString()))];

    let streak = 0;
    const checkDate = new Date();

    for (const date of dates) {
        if (date === checkDate.toDateString()) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    document.getElementById('study-streak').textContent = streak;
}

// Stats
function updateStats() {
    const completed = getCompletedChapters().length;
    document.getElementById('completed-chapters').textContent = completed;

    const stats = JSON.parse(localStorage.getItem('mcq_stats') || '{"total": 0, "correct": 0}');
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    document.getElementById('mcq-accuracy').textContent = accuracy + '%';
}

function updateSubjectProgress() {
    const completed = getCompletedChapters();

    for (const subject of ['biology', 'chemistry', 'physics']) {
        let total = 0;
        let done = 0;

        for (const classLevel of ['11', '12']) {
            const chapters = NCERT_DATA[subject][classLevel];
            total += chapters.length;
            done += chapters.filter(ch => completed.includes(`${subject}-${classLevel}-${ch.number}`)).length;
        }

        const percent = total > 0 ? Math.round((done / total) * 100) : 0;
        document.getElementById(`${subject.slice(0, 3).replace('bio', 'bio')}-progress`).style.width = percent + '%';
    }
}

// Progress view
function updateProgressView() {
    const completed = getCompletedChapters();
    const total = 96; // Total chapters
    const percent = Math.round((completed.length / total) * 100);

    document.getElementById('overall-percentage').textContent = percent + '%';

    // Animate ring
    const ring = document.getElementById('overall-progress-ring');
    const circumference = 339.292;
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;

    // Subject stats
    let bioComplete = 0, chemComplete = 0, physComplete = 0;

    for (const key of completed) {
        if (key.startsWith('biology')) bioComplete++;
        else if (key.startsWith('chemistry')) chemComplete++;
        else if (key.startsWith('physics')) physComplete++;
    }

    document.getElementById('bio-complete').textContent = `${bioComplete}/35`;
    document.getElementById('chem-complete').textContent = `${chemComplete}/19`;
    document.getElementById('phys-complete').textContent = `${physComplete}/28`;

    // MCQ stats
    const stats = JSON.parse(localStorage.getItem('mcq_stats') || '{"total": 0, "correct": 0, "byTopic": {}}');
    document.getElementById('total-mcqs-attempted').textContent = stats.total;
    document.getElementById('correct-mcqs').textContent = stats.correct;
    document.getElementById('incorrect-mcqs').textContent = stats.total - stats.correct;

    // Weak topics
    const weakTopics = [];
    for (const [topic, data] of Object.entries(stats.byTopic || {})) {
        const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
        if (accuracy < 60 && data.total >= 3) {
            weakTopics.push({ topic, accuracy: Math.round(accuracy) });
        }
    }

    const weakContainer = document.getElementById('weak-topics-list');
    if (weakTopics.length === 0) {
        weakContainer.innerHTML = '<p class="empty-state-small">Complete some MCQs to see weak topics</p>';
    } else {
        weakContainer.innerHTML = weakTopics
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, 5)
            .map(t => `
                <div class="weak-topic-item">
                    <span>${t.topic.split('-')[1]}</span>
                    <span style="color: var(--accent-warning);">${t.accuracy}% accuracy</span>
                </div>
            `).join('');
    }
}

// Formulas
function showFormulaSubject(subject) {
    currentFormulaSubject = subject;

    document.querySelectorAll('.formula-tab').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(subject) ||
            (subject === 'physics' && btn.textContent.includes('⚛️')) ||
            (subject === 'chemistry' && btn.textContent.includes('⚗️')) ||
            (subject === 'biology' && btn.textContent.includes('🧬')));
    });

    renderFormulas(FORMULAS[subject] || []);
}

function renderFormulas(formulas) {
    const container = document.getElementById('formula-list');

    if (!formulas || formulas.length === 0) {
        container.innerHTML = '<p class="empty-state-small">No formulas available for this subject</p>';
        return;
    }

    container.innerHTML = formulas.map(f => `
        <div class="formula-card">
            <h4>${f.icon || '📝'} ${f.name}</h4>
            <div class="formula">${f.formula}</div>
            <p class="description">${f.description || ''}</p>
            ${f.chapter ? `<p class="chapter-ref">📖 ${f.chapter}</p>` : ''}
        </div>
    `).join('');
}

function searchFormulas(query) {
    if (!query) {
        renderFormulas(FORMULAS[currentFormulaSubject] || []);
        return;
    }

    const q = query.toLowerCase();
    const filtered = (FORMULAS[currentFormulaSubject] || []).filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        (f.description || '').toLowerCase().includes(q)
    );

    renderFormulas(filtered);
}

// Load progress
function loadProgress() {
    updateSubjectProgress();
}

// Share
function shareChapter() {
    if (!currentChapter) return;

    const text = `Study ${currentChapter.name} (${NCERT_DATA[currentSubject].name} Class ${currentClass}) with NEET Study Assistant!`;

    if (navigator.share) {
        navigator.share({ title: 'NEET Study Assistant', text });
    } else {
        navigator.clipboard.writeText(text);
        showToast('📋 Link copied!', 'success');
    }
}

// Close modals on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});

// ============================================
// MOBILE NAVIGATION
// ============================================

// Toggle mobile sidebar
function toggleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    const menuBtn = document.getElementById('mobile-menu-btn');

    const isOpen = sidebar.classList.contains('mobile-open');

    if (isOpen) {
        closeMobileSidebar();
    } else {
        sidebar.classList.add('mobile-open');
        overlay.classList.add('active');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close mobile sidebar
function closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    const menuBtn = document.getElementById('mobile-menu-btn');

    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    menuBtn.classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle mobile search overlay
function toggleMobileSearch() {
    const searchOverlay = document.getElementById('mobile-search-overlay');
    const isOpen = searchOverlay.classList.contains('active');

    if (isOpen) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    } else {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus on search input
        setTimeout(() => {
            document.getElementById('mobile-search-input').focus();
        }, 100);
    }
}

// Update mobile search results (uses same search logic)
function updateMobileSearchResults(results, query) {
    const container = document.getElementById('mobile-search-results');

    if (results.length === 0) {
        container.innerHTML = '<div class="search-result-item"><div class="search-result-title">No results found</div></div>';
    } else {
        container.innerHTML = results.slice(0, 10).map(r => `
            <div class="search-result-item" onclick="goToSearchResult('${r.subject}', '${r.classLevel}', ${r.chapterNumber}); toggleMobileSearch();">
                <div class="search-result-title">${highlightMatch(r.name, query)}</div>
                <div class="search-result-meta">${r.subject} • Class ${r.classLevel} • Chapter ${r.chapterNumber}</div>
            </div>
        `).join('');
    }
}

// Override handleGlobalSearch to also update mobile search
const originalHandleGlobalSearch = handleGlobalSearch;
handleGlobalSearch = function (query) {
    // Call original for desktop search
    const resultsContainer = document.getElementById('search-results');

    if (query.length < 2) {
        resultsContainer.style.display = 'none';
        document.getElementById('mobile-search-results').innerHTML = '';
        return;
    }

    const results = searchAllTopics(query);

    // Desktop results
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item"><div class="search-result-title">No results found</div></div>';
    } else {
        resultsContainer.innerHTML = results.slice(0, 8).map(r => `
            <div class="search-result-item" onclick="goToSearchResult('${r.subject}', '${r.classLevel}', ${r.chapterNumber})">
                <div class="search-result-title">${highlightMatch(r.name, query)}</div>
                <div class="search-result-meta">${r.subject} • Class ${r.classLevel} • Chapter ${r.chapterNumber}</div>
            </div>
        `).join('');
    }

    resultsContainer.style.display = 'block';

    // Mobile results
    updateMobileSearchResults(results, query);
};

// Update bottom navigation active state
function updateBottomNavActive(view) {
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
}

// Override switchView to also update bottom nav
const originalSwitchView = switchView;
switchView = function (view) {
    // Update header nav (desktop)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    // Update bottom nav (mobile)
    updateBottomNavActive(view);

    // Close mobile sidebar when switching views
    closeMobileSidebar();

    // Hide all views
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('chapter-content').style.display = 'none';
    document.getElementById('saved-view').style.display = 'none';
    document.getElementById('formulas-view').style.display = 'none';
    document.getElementById('progress-view').style.display = 'none';

    if (view === 'study') {
        if (currentChapter) {
            document.getElementById('chapter-content').style.display = 'block';
        } else {
            document.getElementById('welcome-screen').style.display = 'block';
        }
    } else if (view === 'saved') {
        document.getElementById('saved-view').style.display = 'block';
        loadSavedContent();
    } else if (view === 'formulas') {
        document.getElementById('formulas-view').style.display = 'block';
        showFormulaSubject(currentFormulaSubject);
    } else if (view === 'progress') {
        document.getElementById('progress-view').style.display = 'block';
        updateProgressView();
    }
};

// Close sidebar when selecting a chapter on mobile
const originalSelectChapter = selectChapter;
selectChapter = function (chapterNumber) {
    originalSelectChapter(chapterNumber);
    closeMobileSidebar();
};

// Touch gestures for swipe to close sidebar
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
}, { passive: true });

function handleSwipeGesture() {
    const swipeDistance = touchEndX - touchStartX;
    const sidebar = document.querySelector('.sidebar');

    // Swipe left to close sidebar (if open)
    if (swipeDistance < -100 && sidebar.classList.contains('mobile-open')) {
        closeMobileSidebar();
    }

    // Swipe right from edge to open sidebar
    if (swipeDistance > 100 && touchStartX < 30 && !sidebar.classList.contains('mobile-open')) {
        toggleMobileSidebar();
    }
}

// Handle escape key to close overlays
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const searchOverlay = document.getElementById('mobile-search-overlay');
        const sidebar = document.querySelector('.sidebar');

        if (searchOverlay.classList.contains('active')) {
            toggleMobileSearch();
        } else if (sidebar.classList.contains('mobile-open')) {
            closeMobileSidebar();
        }
    }
});
