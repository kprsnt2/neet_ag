// NEET Study Assistant - Main Application Logic

// State
let currentSubject = null;
let currentClass = '12';
let currentChapter = null;
let allChapters = [];
let isLoading = false;

// Backend API URL (FastAPI)
const API_BASE_URL = ''; // Relative path for Cloudflare Pages

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedContent();
    loadHistory();

    // Enter key handler for AI input
    document.getElementById('ai-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendCustomQuery();
    });
});

// View switching
function switchView(view) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    // Hide all views
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('chapter-content').style.display = 'none';
    document.getElementById('saved-view').style.display = 'none';
    document.getElementById('history-view').style.display = 'none';

    // Show selected view
    if (view === 'study') {
        if (currentChapter) {
            document.getElementById('chapter-content').style.display = 'block';
        } else {
            document.getElementById('welcome-screen').style.display = 'block';
        }
    } else if (view === 'saved') {
        document.getElementById('saved-view').style.display = 'block';
        loadSavedContent();
    } else if (view === 'history') {
        document.getElementById('history-view').style.display = 'block';
        loadHistory();
    }
}

// Subject selection
function selectSubject(subject) {
    currentSubject = subject;

    // Update subject cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`.subject-card.${subject}`).classList.add('active');

    // Show chapters section
    document.getElementById('chapters-section').style.display = 'block';

    // Update chapter counts
    updateChapterCounts();

    // Load chapters
    loadChapters();
}

// Class selection
function selectClass(classLevel) {
    currentClass = classLevel;

    // Update class buttons
    document.querySelectorAll('.class-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.class === classLevel);
    });

    // Update chapter counts
    updateChapterCounts();

    // Reload chapters if subject is selected
    if (currentSubject) {
        loadChapters();
    }
}

// Update chapter counts display
function updateChapterCounts() {
    document.getElementById('bio-chapters').textContent = CHAPTER_COUNTS.biology[currentClass] + ' chapters';
    document.getElementById('chem-chapters').textContent = CHAPTER_COUNTS.chemistry[currentClass] + ' chapters';
    document.getElementById('phys-chapters').textContent = CHAPTER_COUNTS.physics[currentClass] + ' chapters';
}

// Load chapters for selected subject and class
function loadChapters() {
    if (!currentSubject) return;

    allChapters = NCERT_DATA[currentSubject][currentClass];
    renderChapters(allChapters);
}

// Render chapters in sidebar
function renderChapters(chapters) {
    const container = document.getElementById('chapter-list');

    if (chapters.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No chapters found</p>';
        return;
    }

    container.innerHTML = chapters.map(ch => `
        <button class="chapter-item ${currentChapter?.number === ch.number ? 'active' : ''}" 
                onclick="selectChapter(${ch.number})">
            <span class="chapter-number">${ch.number}</span>
            <span style="flex: 1; text-align: left;">${ch.name}</span>
        </button>
    `).join('');
}

// Filter chapters by search
function filterChapters(query) {
    const filtered = allChapters.filter(ch =>
        ch.name.toLowerCase().includes(query.toLowerCase())
    );
    renderChapters(filtered);
}

// Select a chapter
function selectChapter(chapterNumber) {
    currentChapter = allChapters.find(ch => ch.number === chapterNumber);

    if (!currentChapter) return;

    // Update chapter list active state
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.chapter-item').classList.add('active');

    // Show chapter content
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('chapter-content').style.display = 'block';

    // Update chapter header
    document.getElementById('chapter-badge').textContent = `Chapter ${currentChapter.number}`;
    document.getElementById('subject-badge').textContent = NCERT_DATA[currentSubject].name;
    document.getElementById('subject-badge').className = `badge subject-badge ${currentSubject}`;
    document.getElementById('class-badge').textContent = `Class ${currentClass}`;
    document.getElementById('chapter-title').textContent = currentChapter.name;
    document.getElementById('chapter-book').textContent = currentChapter.book;

    // Update NCERT reference
    document.getElementById('ncert-book-ref').textContent = `${currentChapter.book} - Chapter ${currentChapter.number}`;
    document.getElementById('ncert-pdf-link').href = currentChapter.pdfUrl;

    // Clear AI content
    document.getElementById('ai-content').innerHTML = `
        <div class="ai-placeholder">
            <span>✨</span>
            <p>Click an action button above to get AI-powered explanations!</p>
            <p class="small">Or type your specific question below.</p>
        </div>
    `;

    // Add to history
    addToHistory(currentChapter.name, currentSubject, currentClass);
}

// AI Actions
async function aiAction(type) {
    if (!currentChapter) return;

    if (isLoading) return;
    isLoading = true;

    // Show loading
    showLoading();

    try {
        const response = await fetch(`${API_BASE_URL}/api/explain`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: currentChapter.name,
                subject: currentSubject,
                class_level: currentClass,
                action_type: type
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'API request failed');
        }

        const data = await response.json();

        if (data.success) {
            if (type === 'mcq' && data.mcqs) {
                showMCQModal(data.mcqs);
            } else {
                appendAIMessage(data.content, data.provider);
            }
        } else {
            appendAIMessage(`Error: ${data.error || 'Something went wrong. Please check backend API keys.'}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        appendAIMessage(`Error calling AI service. Ensure backend API keys are configured. Details: ${error.message}`, 'error');
    } finally {
        isLoading = false;
    }
}

// Show loading state
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

// Remove loading state
function removeLoading() {
    const loadingMsg = document.getElementById('loading-message');
    if (loadingMsg) loadingMsg.remove();
}

// Append AI message
function appendAIMessage(content, provider) {
    removeLoading();

    const container = document.getElementById('ai-content');

    // Remove placeholder if exists
    const placeholder = container.querySelector('.ai-placeholder');
    if (placeholder) placeholder.remove();

    const formattedContent = formatContent(content);

    const messageHTML = `
        <div class="ai-message">
            <span class="provider-badge ${provider}">${provider === 'claude' ? '⚡ Claude' : provider === 'gemini' ? '💎 Gemini' : '⚠️ Error'}</span>
            <div style="margin-top: 12px;">${formattedContent}</div>
            <button onclick="saveExplanation('${escape(content)}')" style="margin-top: 12px; padding: 8px 16px; background: var(--bg-tertiary); border: 1px solid var(--border-subtle); border-radius: 6px; color: var(--text-secondary); cursor: pointer;">
                🔖 Save for Offline
            </button>
        </div>
    `;

    container.innerHTML += messageHTML;
    container.scrollTop = container.scrollHeight;
}

// Format content with basic markdown
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

// Send custom query
async function sendCustomQuery() {
    const input = document.getElementById('ai-input');
    const query = input.value.trim();

    if (!query || !currentChapter || isLoading) return;

    input.value = '';
    isLoading = true;
    showLoading();

    try {
        const combinedTopic = `${currentChapter.name}. Specific Question: ${query}`;

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
            appendAIMessage(data.content, data.provider);
        } else {
            appendAIMessage(`Error: ${data.error}`, 'error');
        }

    } catch (error) {
        appendAIMessage(`Error: ${error.message}`, 'error');
    } finally {
        isLoading = false;
    }
}

// MCQ Modal
let currentMCQs = [];
let currentMCQIndex = 0;
let mcqScore = 0;
let mcqAnswered = [];

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
                        ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="mcq-explanation" id="mcq-explanation" style="display: none;">
                <strong style="color: var(--accent-primary);">Explanation:</strong>
                <p style="margin-top: 8px;">${mcq.explanation}</p>
            </div>
        </div>
        
        <div class="mcq-navigation">
            <button class="mcq-nav-btn" onclick="prevMCQ()" ${currentMCQIndex === 0 ? 'disabled' : ''}>Previous</button>
            <button class="mcq-nav-btn" onclick="closeMCQModal()">Close</button>
            ${currentMCQIndex < currentMCQs.length - 1
            ? `<button class="mcq-next-btn" onclick="nextMCQ()" ${!mcqAnswered[currentMCQIndex] ? 'disabled' : ''}>Next Question</button>`
            : mcqAnswered.every(a => a)
                ? `<button class="mcq-next-btn" onclick="closeMCQModal()">Complete (${mcqScore}/${currentMCQs.length})</button>`
                : `<button class="mcq-next-btn" disabled>Answer to Continue</button>`
        }
        </div>
    `;

    // Highlight answered options
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

    // Update UI
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

    // Re-render to update navigation
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
    alert('Saved for offline reading!');
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
                <p>Click "Save for Offline" on any AI explanation to save it.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = saved.map(item => `
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
}

// History
function addToHistory(topic, subject, classLevel) {
    let history = JSON.parse(localStorage.getItem('study_history') || '[]');

    // Remove if already exists
    history = history.filter(h => h.topic !== topic || h.subject !== subject);

    // Add to beginning
    history.unshift({
        topic,
        subject,
        classLevel,
        visitedAt: new Date().toISOString()
    });

    // Keep last 20
    history = history.slice(0, 20);

    localStorage.setItem('study_history', JSON.stringify(history));
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('study_history') || '[]');
    const container = document.getElementById('history-list');

    if (history.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span>📜</span>
                <h3>No history yet</h3>
                <p>Start studying topics to build your history.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = history.map(item => `
        <div class="saved-item">
            <div>
                <h4>${item.topic}</h4>
                <p>${item.subject} • Class ${item.classLevel} • ${new Date(item.visitedAt).toLocaleString()}</p>
            </div>
        </div>
    `).join('');
}

// Close modals on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});
