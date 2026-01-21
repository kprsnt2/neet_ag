/**
 * Local Vector Store for RAG
 * 
 * A lightweight, in-memory vector store for semantic search.
 * Uses cosine similarity for finding relevant content.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Calculate cosine similarity between two vectors
 * @param {number[]} a - First vector
 * @param {number[]} b - Second vector
 * @returns {number} Similarity score between -1 and 1
 */
function cosineSimilarity(a, b) {
    if (a.length !== b.length) {
        throw new Error('Vectors must have same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) {
        return 0;
    }

    return dotProduct / (normA * normB);
}

/**
 * Local Vector Store class for managing embeddings and semantic search
 */
class LocalVectorStore {
    constructor() {
        this.documents = [];
        this.model = null;
        this.dimension = null;
        this.loaded = false;
    }

    /**
     * Load embeddings from a JSON file
     * @param {string} filePath - Path to embeddings JSON file
     * @returns {boolean} Success status
     */
    loadFromFile(filePath = join(__dirname, 'embeddings.json')) {
        try {
            if (!existsSync(filePath)) {
                console.error(`Embeddings file not found: ${filePath}`);
                return false;
            }

            const data = JSON.parse(readFileSync(filePath, 'utf-8'));
            this.model = data.model;
            this.dimension = data.dimension;
            this.documents = data.documents || [];
            this.loaded = true;

            console.error(`Loaded ${this.documents.length} documents from vector store`);
            return true;
        } catch (error) {
            console.error('Error loading vector store:', error.message);
            return false;
        }
    }

    /**
     * Add a document to the vector store
     * @param {Object} doc - Document with id, content, embedding, and metadata
     */
    addDocument(doc) {
        this.documents.push(doc);
    }

    /**
     * Search for similar documents using cosine similarity
     * @param {number[]} queryEmbedding - Query embedding vector
     * @param {Object} options - Search options
     * @param {number} options.topK - Number of results to return (default: 5)
     * @param {string} options.subject - Filter by subject
     * @param {string} options.classLevel - Filter by class level
     * @param {number} options.threshold - Minimum similarity threshold (default: 0.3)
     * @returns {Array} Matching documents with similarity scores
     */
    search(queryEmbedding, options = {}) {
        const {
            topK = 5,
            subject = null,
            classLevel = null,
            threshold = 0.3
        } = options;

        if (!this.loaded || this.documents.length === 0) {
            console.error('Vector store not loaded or empty');
            return [];
        }

        // Filter and score documents
        const results = this.documents
            .filter(doc => {
                if (subject && doc.subject !== subject) return false;
                if (classLevel && doc.class_level !== classLevel) return false;
                return true;
            })
            .map(doc => ({
                ...doc,
                similarity: cosineSimilarity(queryEmbedding, doc.embedding)
            }))
            .filter(doc => doc.similarity >= threshold)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, topK);

        // Remove embedding from results to reduce payload size
        return results.map(({ embedding, ...rest }) => rest);
    }

    /**
     * Get all unique subjects in the store
     * @returns {string[]} List of subjects
     */
    getSubjects() {
        return [...new Set(this.documents.map(d => d.subject))];
    }

    /**
     * Get document count
     * @returns {number} Number of documents
     */
    getCount() {
        return this.documents.length;
    }

    /**
     * Check if store is loaded
     * @returns {boolean} Loaded status
     */
    isLoaded() {
        return this.loaded;
    }
}

// Export singleton instance
const vectorStore = new LocalVectorStore();

export { vectorStore, LocalVectorStore, cosineSimilarity };
