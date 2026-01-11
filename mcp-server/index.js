#!/usr/bin/env node

/**
 * NEET Study Assistant MCP Server
 * 
 * Provides NCERT content, MCQs, and formulas as tools for AI models
 * Uses the Model Context Protocol (MCP) standard
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    ListResourcesRequestSchema,
    ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';

// Import NCERT data (we'll use the existing data.js structure)
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load NCERT data
let NCERT_DATA = {};
let FORMULAS_DATA = {};

try {
    // Read and eval the data.js file to get NCERT_DATA
    const dataContent = readFileSync(join(__dirname, '..', 'data.js'), 'utf-8');
    // Extract NCERT_DATA object using regex (simplified approach)
    const match = dataContent.match(/const NCERT_DATA = ({[\s\S]*?});/);
    if (match) {
        NCERT_DATA = eval('(' + match[1] + ')');
    }

    // Load formulas
    const formulasContent = readFileSync(join(__dirname, '..', 'formulas.js'), 'utf-8');
    const formulasMatch = formulasContent.match(/const FORMULAS = ({[\s\S]*?});/);
    if (formulasMatch) {
        FORMULAS_DATA = eval('(' + formulasMatch[1] + ')');
    }
} catch (e) {
    console.error('Error loading data:', e);
}

// Create MCP server
const server = new Server(
    {
        name: 'neet-study-assistant',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
            resources: {}
        }
    }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'get_chapter_info',
                description: 'Get information about a specific NCERT chapter including name, PDF URL, and subtopics',
                inputSchema: {
                    type: 'object',
                    properties: {
                        subject: {
                            type: 'string',
                            description: 'Subject name: biology, chemistry, or physics',
                            enum: ['biology', 'chemistry', 'physics']
                        },
                        class_level: {
                            type: 'string',
                            description: 'Class level: 11 or 12',
                            enum: ['11', '12']
                        },
                        chapter_number: {
                            type: 'number',
                            description: 'Chapter number'
                        }
                    },
                    required: ['subject', 'class_level', 'chapter_number']
                }
            },
            {
                name: 'list_chapters',
                description: 'List all chapters for a subject and class',
                inputSchema: {
                    type: 'object',
                    properties: {
                        subject: {
                            type: 'string',
                            enum: ['biology', 'chemistry', 'physics']
                        },
                        class_level: {
                            type: 'string',
                            enum: ['11', '12']
                        }
                    },
                    required: ['subject', 'class_level']
                }
            },
            {
                name: 'get_subtopics',
                description: 'Get all subtopics for a chapter with their NEET priority levels',
                inputSchema: {
                    type: 'object',
                    properties: {
                        subject: { type: 'string', enum: ['biology', 'chemistry', 'physics'] },
                        class_level: { type: 'string', enum: ['11', '12'] },
                        chapter_number: { type: 'number' }
                    },
                    required: ['subject', 'class_level', 'chapter_number']
                }
            },
            {
                name: 'get_formulas',
                description: 'Get formulas for a physics topic',
                inputSchema: {
                    type: 'object',
                    properties: {
                        topic: {
                            type: 'string',
                            description: 'Physics topic (e.g., mechanics, electrostatics, optics)'
                        }
                    },
                    required: ['topic']
                }
            },
            {
                name: 'search_topics',
                description: 'Search across all NCERT chapters and subtopics',
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'Search query'
                        }
                    },
                    required: ['query']
                }
            }
        ]
    };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
        case 'get_chapter_info': {
            const { subject, class_level, chapter_number } = args;
            const chapters = NCERT_DATA[subject]?.[class_level] || [];
            const chapter = chapters.find(ch => ch.number === chapter_number);

            if (!chapter) {
                return { content: [{ type: 'text', text: 'Chapter not found' }] };
            }

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({
                        name: chapter.name,
                        book: chapter.book,
                        pdfUrl: chapter.pdfUrl,
                        subtopics: chapter.subtopics || []
                    }, null, 2)
                }]
            };
        }

        case 'list_chapters': {
            const { subject, class_level } = args;
            const chapters = NCERT_DATA[subject]?.[class_level] || [];

            return {
                content: [{
                    type: 'text',
                    text: chapters.map(ch =>
                        `${ch.number}. ${ch.name} (${ch.subtopics?.length || 0} subtopics)`
                    ).join('\n')
                }]
            };
        }

        case 'get_subtopics': {
            const { subject, class_level, chapter_number } = args;
            const chapters = NCERT_DATA[subject]?.[class_level] || [];
            const chapter = chapters.find(ch => ch.number === chapter_number);

            if (!chapter?.subtopics) {
                return { content: [{ type: 'text', text: 'No subtopics found' }] };
            }

            const formatted = chapter.subtopics.map(sub => {
                const priority = sub.priority === 'high' ? '🔴' : sub.priority === 'medium' ? '🟡' : '🟢';
                return `${priority} ${sub.name}`;
            }).join('\n');

            return {
                content: [{
                    type: 'text',
                    text: `Subtopics for ${chapter.name}:\n\n${formatted}\n\nLegend: 🔴 High Priority, 🟡 Medium, 🟢 Low`
                }]
            };
        }

        case 'get_formulas': {
            const { topic } = args;
            const formulas = FORMULAS_DATA[topic.toLowerCase()];

            if (!formulas) {
                return { content: [{ type: 'text', text: `No formulas found for topic: ${topic}` }] };
            }

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(formulas, null, 2)
                }]
            };
        }

        case 'search_topics': {
            const { query } = args;
            const results = [];
            const queryLower = query.toLowerCase();

            for (const subject of ['biology', 'chemistry', 'physics']) {
                for (const classLevel of ['11', '12']) {
                    const chapters = NCERT_DATA[subject]?.[classLevel] || [];
                    for (const chapter of chapters) {
                        if (chapter.name.toLowerCase().includes(queryLower)) {
                            results.push({
                                subject,
                                class: classLevel,
                                chapter: chapter.number,
                                name: chapter.name,
                                match: 'chapter'
                            });
                        }

                        for (const sub of (chapter.subtopics || [])) {
                            if (sub.name.toLowerCase().includes(queryLower)) {
                                results.push({
                                    subject,
                                    class: classLevel,
                                    chapter: chapter.number,
                                    chapterName: chapter.name,
                                    subtopic: sub.name,
                                    priority: sub.priority,
                                    match: 'subtopic'
                                });
                            }
                        }
                    }
                }
            }

            return {
                content: [{
                    type: 'text',
                    text: results.length > 0
                        ? JSON.stringify(results.slice(0, 20), null, 2)
                        : 'No matching topics found'
                }]
            };
        }

        default:
            return { content: [{ type: 'text', text: `Unknown tool: ${name}` }] };
    }
});

// Define resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: 'neet://subjects',
                name: 'NEET Subjects',
                description: 'List of all subjects covered',
                mimeType: 'application/json'
            },
            {
                uri: 'neet://stats',
                name: 'NEET Content Stats',
                description: 'Statistics about available content',
                mimeType: 'application/json'
            }
        ]
    };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    if (uri === 'neet://subjects') {
        return {
            contents: [{
                uri,
                mimeType: 'application/json',
                text: JSON.stringify({
                    subjects: ['biology', 'chemistry', 'physics'],
                    classes: ['11', '12']
                })
            }]
        };
    }

    if (uri === 'neet://stats') {
        let totalChapters = 0;
        let totalSubtopics = 0;

        for (const subject of ['biology', 'chemistry', 'physics']) {
            for (const classLevel of ['11', '12']) {
                const chapters = NCERT_DATA[subject]?.[classLevel] || [];
                totalChapters += chapters.length;
                for (const ch of chapters) {
                    totalSubtopics += ch.subtopics?.length || 0;
                }
            }
        }

        return {
            contents: [{
                uri,
                mimeType: 'application/json',
                text: JSON.stringify({
                    totalChapters,
                    totalSubtopics,
                    subjects: 3,
                    classes: 2
                })
            }]
        };
    }

    throw new Error(`Resource not found: ${uri}`);
});

// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('NEET MCP Server running on stdio');
}

main().catch(console.error);
