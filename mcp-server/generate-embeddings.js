#!/usr/bin/env node

/**
 * Generate Embeddings Script
 * 
 * Generates embeddings for NCERT content using Gemini's free API
 * and saves them to embeddings.json for local RAG.
 * 
 * Usage: 
 *   set GEMINI_API_KEY=your-key
 *   npm run generate-embeddings
 */

import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GEMINI_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_KEY) {
    console.error('❌ Missing GEMINI_API_KEY environment variable');
    console.error('   Set it with: $env:GEMINI_API_KEY="your-key" (PowerShell)');
    console.error('   or: set GEMINI_API_KEY=your-key (cmd)');
    process.exit(1);
}

/**
 * Generate embedding using Gemini API
 */
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

// NCERT Content for RAG
const NCERT_CONTENT = [
    // Biology Class 12
    {
        id: 'bio-12-3-menstrual-cycle',
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
        id: 'bio-12-5-mendels-laws',
        subject: 'biology',
        class_level: '12',
        chapter_number: 5,
        chapter_name: 'Principles of Inheritance and Variation',
        subtopic: "Mendel's Laws",
        content: `Gregor Mendel's experiments with pea plants established the fundamental laws of inheritance:

1. **Law of Dominance**: When two contrasting alleles are present, only one (dominant) expresses in the phenotype. Example: Tall (T) is dominant over dwarf (t).

2. **Law of Segregation**: Allele pairs separate during gamete formation, and each gamete receives one allele. This explains the 3:1 ratio in F2 generation.

3. **Law of Independent Assortment**: Genes for different traits assort independently during gamete formation (applies when genes are on different chromosomes).

Monohybrid Cross: Tt x Tt → TT:Tt:tt = 1:2:1 (genotypic), 3:1 (phenotypic)
Dihybrid Cross: 9:3:3:1 ratio in F2

NEET Important: Practice Punnett squares and understand incomplete dominance (1:2:1 phenotypic ratio) and codominance (both alleles express).`
    },
    {
        id: 'bio-12-10-biogas',
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
        id: 'chem-12-2-nernst',
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
    {
        id: 'chem-12-3-kinetics',
        subject: 'chemistry',
        class_level: '12',
        chapter_number: 3,
        chapter_name: 'Chemical Kinetics',
        subtopic: 'Rate Laws and Order',
        content: `Chemical kinetics studies the rate and mechanism of chemical reactions.

**Rate of Reaction:**
Rate = -d[R]/dt = d[P]/dt

**Rate Law:**
Rate = k[A]^m[B]^n
- k = rate constant
- m, n = orders with respect to A and B
- Overall order = m + n

**Order vs Molecularity:**
- Order: Experimental (can be 0, fractional, negative)
- Molecularity: Theoretical (always positive integer)

**Integrated Rate Equations:**
- Zero order: [A] = [A]₀ - kt, t½ = [A]₀/2k
- First order: ln[A] = ln[A]₀ - kt, t½ = 0.693/k
- Second order: 1/[A] = 1/[A]₀ + kt, t½ = 1/k[A]₀

**Arrhenius Equation:**
k = Ae^(-Ea/RT)
ln k = ln A - Ea/RT

NEET Important: First order half-life is independent of concentration. Know Arrhenius equation for temperature dependence.`
    },
    // Physics Class 12
    {
        id: 'phys-12-11-photoelectric',
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
        id: 'bio-11-10-mitosis',
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
    },
    {
        id: 'bio-11-11-photosynthesis',
        subject: 'biology',
        class_level: '11',
        chapter_number: 11,
        chapter_name: 'Photosynthesis in Higher Plants',
        subtopic: 'Light Reactions and Calvin Cycle',
        content: `Photosynthesis converts light energy to chemical energy in plants.

**Overall Equation:**
6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂

**Light Reactions (Thylakoid):**
1. Photolysis of water: 2H₂O → 4H⁺ + 4e⁻ + O₂
2. Cyclic photophosphorylation: Only ATP produced
3. Non-cyclic: ATP + NADPH produced

**Photosystems:**
- PS I: P700, reduces NADP⁺
- PS II: P680, splits water

**Calvin Cycle (Stroma):**
1. Carbon fixation: CO₂ + RuBP → 2 PGA (by RuBisCO)
2. Reduction: PGA → G3P (uses ATP, NADPH)
3. Regeneration: G3P → RuBP

**C3 vs C4 Plants:**
- C3: Calvin cycle only, photorespiration occurs
- C4: Kranz anatomy, PEP carboxylase, no photorespiration

**CAM Plants:**
- Open stomata at night (CO₂ fixation)
- Calvin cycle during day

NEET Important: Compare C3 and C4 pathways, know enzymes (RuBisCO, PEP carboxylase).`
    },
    // Physics Class 11
    {
        id: 'phys-11-4-laws-motion',
        subject: 'physics',
        class_level: '11',
        chapter_number: 4,
        chapter_name: 'Laws of Motion',
        subtopic: "Newton's Laws",
        content: `Newton's Laws of Motion form the foundation of classical mechanics.

**First Law (Inertia):**
A body remains at rest or in uniform motion unless acted upon by an external force.
F = 0 → a = 0

**Second Law (F = ma):**
The rate of change of momentum is proportional to the applied force.
F = dp/dt = ma (for constant mass)

**Third Law (Action-Reaction):**
For every action, there is an equal and opposite reaction.
F₁₂ = -F₂₁

**Important Concepts:**

**Momentum:** p = mv
**Impulse:** J = FΔt = Δp

**Free Body Diagrams:**
- Identify all forces on the object
- Weight (mg) always downward
- Normal force perpendicular to surface
- Friction opposite to motion/tendency

**Friction:**
- Static: f_s ≤ μ_s N (maximum = μ_s N)
- Kinetic: f_k = μ_k N (always less than static)

**Applications:**
- Pulley systems
- Inclined planes
- Circular motion

NEET Important: Draw FBDs correctly, apply F = ma along each axis.`
    },
    {
        id: 'phys-11-7-gravitation',
        subject: 'physics',
        class_level: '11',
        chapter_number: 7,
        chapter_name: 'Gravitation',
        subtopic: "Universal Gravitation and Kepler's Laws",
        content: `Gravitation describes the attractive force between masses.

**Newton's Law of Gravitation:**
F = Gm₁m₂/r²
- G = 6.67 × 10⁻¹¹ Nm²/kg²

**Gravitational Field:**
g = GM/r² (at distance r from center)
g' = g(1 - 2h/R) (at height h << R)
g' = g(1 - d/R) (at depth d)

**Gravitational Potential:**
V = -GM/r
U = -GMm/r (potential energy)

**Escape Velocity:**
v_e = √(2GM/R) = √(2gR) = 11.2 km/s for Earth

**Orbital Velocity:**
v_o = √(GM/r) = v_e/√2

**Kepler's Laws:**
1. **Law of Orbits:** Planets move in ellipses with Sun at one focus
2. **Law of Areas:** Equal areas swept in equal times (areal velocity constant)
3. **Law of Periods:** T² ∝ a³ (T² = 4π²a³/GM)

**Satellites:**
- Time period: T = 2π√(r³/GM)
- Geostationary: T = 24 hrs, h ≈ 36,000 km

NEET Important: Know escape and orbital velocities, use Kepler's third law.`
    },
    // Chemistry Class 11
    {
        id: 'chem-11-4-chemical-bonding',
        subject: 'chemistry',
        class_level: '11',
        chapter_number: 4,
        chapter_name: 'Chemical Bonding and Molecular Structure',
        subtopic: 'VSEPR and Hybridization',
        content: `Chemical bonding explains how atoms combine to form molecules.

**VSEPR Theory:**
Valence Shell Electron Pair Repulsion - predicts molecular geometry.

**Common Geometries:**
- 2 electron pairs: Linear (180°)
- 3 electron pairs: Trigonal planar (120°)
- 4 electron pairs: Tetrahedral (109.5°)
- 5 electron pairs: Trigonal bipyramidal
- 6 electron pairs: Octahedral (90°)

Lone pairs occupy more space than bond pairs.

**Hybridization:**
- sp: Linear (BeCl₂, CO₂)
- sp²: Trigonal planar (BF₃, C₂H₄)
- sp³: Tetrahedral (CH₄, NH₃, H₂O)
- sp³d: Trigonal bipyramidal (PCl₅)
- sp³d²: Octahedral (SF₆)

**Examples with Lone Pairs:**
- NH₃: sp³, pyramidal (1 LP)
- H₂O: sp³, bent (2 LP)
- PCl₃: sp³d, see-saw (1 LP)
- ICl₄⁻: sp³d², square planar (2 LP)

**Bond Order = (Bonding e⁻ - Antibonding e⁻)/2**

NEET Important: Predict shapes from formula, know hybridization examples.`
    },
    {
        id: 'chem-11-6-equilibrium',
        subject: 'chemistry',
        class_level: '11',
        chapter_number: 6,
        chapter_name: 'Equilibrium',
        subtopic: 'Chemical and Ionic Equilibrium',
        content: `Equilibrium is the state where forward and reverse reaction rates are equal.

**Law of Chemical Equilibrium:**
For aA + bB ⇌ cC + dD
Kc = [C]^c[D]^d / [A]^a[B]^b

**Kp and Kc Relation:**
Kp = Kc(RT)^Δn
Δn = (c + d) - (a + b)

**Le Chatelier's Principle:**
System shifts to oppose applied stress:
- Add reactant → Forward reaction
- Remove product → Forward reaction
- Increase pressure → Side with fewer moles
- Increase temperature → Endothermic direction

**Ionic Equilibrium:**

**pH and pOH:**
pH = -log[H⁺], pOH = -log[OH⁻]
pH + pOH = 14 (at 25°C)

**Buffer Solutions:**
- Acidic buffer: Weak acid + salt
  pH = pKa + log([salt]/[acid])
- Basic buffer: Weak base + salt
  pOH = pKb + log([salt]/[base])

**Solubility Product:**
For salt MₓAᵧ: Ksp = [M⁺]^x[A⁻]^y

NEET Important: Apply Le Chatelier's principle, calculate pH, use Henderson equation.`
    }
];

/**
 * Main function to generate embeddings
 */
async function generateEmbeddings() {
    console.log('🚀 Starting embedding generation...\n');
    console.log(`📚 Processing ${NCERT_CONTENT.length} documents\n`);

    const documents = [];
    let successCount = 0;
    let errorCount = 0;

    for (const item of NCERT_CONTENT) {
        try {
            process.stdout.write(`⏳ ${item.id}... `);

            // Create searchable text
            const searchText = `${item.chapter_name} ${item.subtopic} ${item.content}`;

            // Generate embedding
            const embedding = await generateEmbedding(searchText);

            documents.push({
                ...item,
                embedding
            });

            console.log('✅');
            successCount++;

            // Rate limiting - Gemini has limits
            await new Promise(resolve => setTimeout(resolve, 200));

        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
            errorCount++;
        }
    }

    // Save to file
    const output = {
        model: 'text-embedding-004',
        dimension: documents[0]?.embedding?.length || 768,
        generated_at: new Date().toISOString(),
        documents
    };

    const outputPath = join(__dirname, 'embeddings.json');
    writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log('\n--- Generation Complete ---');
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📊 Embedding dimension: ${output.dimension}`);
}

generateEmbeddings().catch(console.error);
