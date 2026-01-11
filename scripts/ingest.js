#!/usr/bin/env node

/**
 * NCERT Content Ingestion Script
 * 
 * This script generates sample NCERT content chunks and uploads them to Supabase
 * with embeddings for RAG functionality.
 * 
 * Usage: node ingest.js
 * 
 * Required environment variables:
 * - SUPABASE_URL
 * - SUPABASE_ANON_KEY  
 * - GEMINI_API_KEY
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !GEMINI_KEY) {
    console.error('Missing required environment variables');
    console.error('Required: SUPABASE_URL, SUPABASE_ANON_KEY, GEMINI_API_KEY');
    process.exit(1);
}

// Generate embedding using Gemini
async function generateEmbedding(text) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${GEMINI_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'models/text-embedding-004',
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

// Insert content into Supabase
async function insertContent(content) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/ncert_content`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify(content)
    });

    if (!response.ok) {
        throw new Error(`Supabase insert error: ${await response.text()}`);
    }
}

// Sample NCERT content for key topics
// In production, you would extract this from actual NCERT PDFs
const SAMPLE_CONTENT = [
    // Biology Class 12
    {
        subject: 'biology',
        class_level: '12',
        chapter_number: 3,
        chapter_name: 'Human Reproduction',
        subtopic: 'Menstrual Cycle',
        content: `The menstrual cycle is a monthly series of changes in the female reproductive system. It typically lasts 28 days (can range from 21-35 days) and consists of four phases:

1. **Menstrual Phase (Days 1-5)**: The uterine lining (endometrium) sheds, causing menstrual bleeding. Hormone levels (estrogen and progesterone) are low.

2. **Follicular Phase (Days 1-13)**: FSH from the pituitary stimulates ovarian follicles. The dominant follicle produces estrogen, which rebuilds the endometrium.

3. **Ovulation (Day 14)**: LH surge causes the mature follicle to release the ovum. This is the most fertile period.

4. **Luteal Phase (Days 15-28)**: The corpus luteum forms and produces progesterone, maintaining the endometrium for potential implantation.

Key hormones: FSH, LH (from pituitary), Estrogen, Progesterone (from ovaries).
NEET Important: Know the hormone levels during each phase and their sources.`
    },
    {
        subject: 'biology',
        class_level: '12',
        chapter_number: 5,
        chapter_name: 'Principles of Inheritance and Variation',
        subtopic: 'Mendel\'s Laws',
        content: `Gregor Mendel's experiments with pea plants established the fundamental laws of inheritance:

1. **Law of Dominance**: When two contrasting alleles are present, only one (dominant) expresses in the phenotype. Example: Tall (T) is dominant over dwarf (t).

2. **Law of Segregation**: Allele pairs separate during gamete formation, and each gamete receives one allele. This explains the 3:1 ratio in F2 generation.

3. **Law of Independent Assortment**: Genes for different traits assort independently during gamete formation (applies when genes are on different chromosomes).

Monohybrid Cross: Tt x Tt → TT:Tt:tt = 1:2:1 (genotypic), 3:1 (phenotypic)
Dihybrid Cross: 9:3:3:1 ratio in F2

NEET Important: Practice Punnett squares and understand incomplete dominance (1:2:1 phenotypic ratio) and codominance (both alleles express).`
    },
    {
        subject: 'biology',
        class_level: '12',
        chapter_number: 10,
        chapter_name: 'Microbes in Human Welfare',
        subtopic: 'Biogas Production',
        content: `Biogas is produced by anaerobic digestion of organic matter by methanogenic bacteria.

**Process:**
1. Organic waste (animal dung, plant waste) collected in digester
2. Slurry formed in mixing tank
3. Anaerobic digestion occurs in digester:
   - Hydrolysis: Complex organics → Simple molecules
   - Acidogenesis: → Organic acids
   - Methanogenesis: → Methane (CH4) + CO2

**Microorganisms involved:**
- Methanobacterium (main methane producer)
- Other anaerobic bacteria

**Biogas composition:** 50-70% CH4, 30-40% CO2, traces of H2S, H2

**Advantages:**
- Clean fuel (no smoke)
- Slurry used as fertilizer
- Reduces waste pollution

NEET Important: Know the bacteria (Methanobacterium) and the anaerobic conditions required.`
    },
    // Chemistry Class 12
    {
        subject: 'chemistry',
        class_level: '12',
        chapter_number: 2,
        chapter_name: 'Electrochemistry',
        subtopic: 'Nernst Equation',
        content: `The Nernst equation relates the electrode potential to the standard electrode potential and concentrations:

**Nernst Equation:**
E = E° - (RT/nF) × ln Q
or at 298K:
E = E° - (0.0591/n) × log Q

Where:
- E = Electrode potential
- E° = Standard electrode potential
- R = Gas constant (8.314 J/mol·K)
- T = Temperature (K)
- n = Number of electrons transferred
- F = Faraday constant (96500 C/mol)
- Q = Reaction quotient

**For a cell:**
E_cell = E°_cell - (0.0591/n) × log Q

**At equilibrium:** E_cell = 0, so E°_cell = (0.0591/n) × log K

**Applications:**
1. Calculate cell potential at non-standard conditions
2. Determine equilibrium constant from E°
3. Concentration cells

NEET Important: Practice numerical problems using the 0.0591/n form at 298K.`
    },
    // Physics Class 12
    {
        subject: 'physics',
        class_level: '12',
        chapter_number: 11,
        chapter_name: 'Dual Nature of Radiation and Matter',
        subtopic: 'Photoelectric Effect',
        content: `The photoelectric effect demonstrates the particle nature of light.

**Key Observations:**
1. Electrons emitted only if frequency ≥ threshold frequency (ν₀)
2. KE of photoelectrons depends on frequency, not intensity
3. Number of electrons depends on intensity
4. Emission is instantaneous (no time lag)

**Einstein's Photoelectric Equation:**
hν = hν₀ + ½mv²_max
or
hν = W + KE_max

Where:
- h = Planck's constant (6.63 × 10⁻³⁴ J·s)
- ν = Frequency of incident light
- ν₀ = Threshold frequency
- W = Work function = hν₀
- KE_max = Maximum kinetic energy

**Stopping Potential (V₀):**
eV₀ = KE_max = h(ν - ν₀)

**Graphs to remember:**
1. KE_max vs ν: Straight line, slope = h
2. Stopping potential vs ν: Straight line
3. Photocurrent vs intensity: Linear (above threshold)

NEET Important: Work function values, threshold frequency calculations, and stopping potential.`
    },
    // Biology Class 11
    {
        subject: 'biology',
        class_level: '11',
        chapter_number: 10,
        chapter_name: 'Cell Cycle and Cell Division',
        subtopic: 'Mitosis',
        content: `Mitosis is equational division that produces two identical daughter cells.

**Phases of Mitosis:**

1. **Prophase:**
   - Chromatin condenses into chromosomes
   - Nuclear membrane starts to break
   - Centrioles move to poles, form spindle fibers

2. **Metaphase:**
   - Chromosomes align at equatorial plate (metaphase plate)
   - Each chromosome attached to spindle by kinetochore
   - Best stage to count chromosomes

3. **Anaphase:**
   - Centromere splits
   - Sister chromatids separate, move to poles
   - Shortest phase

4. **Telophase:**
   - Chromosomes decondense
   - Nuclear membrane reforms
   - Nucleoli reappear

**Cytokinesis:**
- Plant cells: Cell plate formation (centrifugal)
- Animal cells: Cleavage furrow (centripetal)

**Significance:**
- Growth and repair
- Maintains chromosome number
- Genetic consistency

NEET Important: Know the sequence of events and identify stages from diagrams.`
    }
];

// Main ingestion function
async function ingestContent() {
    console.log('Starting NCERT content ingestion...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const item of SAMPLE_CONTENT) {
        try {
            console.log(`Processing: ${item.subject} Class ${item.class_level} - ${item.chapter_name} (${item.subtopic})`);

            // Generate embedding for the content
            const searchText = `${item.chapter_name} ${item.subtopic} ${item.content}`;
            const embedding = await generateEmbedding(searchText);

            // Insert into Supabase
            await insertContent({
                ...item,
                embedding
            });

            console.log('  ✓ Uploaded successfully\n');
            successCount++;

            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
            console.error(`  ✗ Error: ${error.message}\n`);
            errorCount++;
        }
    }

    console.log('\n--- Ingestion Complete ---');
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`\nTo add more content, extend the SAMPLE_CONTENT array`);
    console.log('or implement PDF extraction from NCERT books.');
}

ingestContent().catch(console.error);
