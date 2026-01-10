// NCERT Book Data - All chapters for Biology, Chemistry, Physics (Class 11 & 12)

const NCERT_DATA = {
    biology: {
        name: 'Biology',
        '11': [
            {
                number: 1, name: 'The Living World',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo101.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Diversity of Living Organisms', priority: 'medium' },
                    { id: 2, name: 'Taxonomic Categories', priority: 'high' },
                    { id: 3, name: 'Taxonomical Aids', priority: 'medium' }
                ]
            },
            {
                number: 2, name: 'Biological Classification',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo102.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Kingdom Monera', priority: 'high' },
                    { id: 2, name: 'Kingdom Protista', priority: 'high' },
                    { id: 3, name: 'Kingdom Fungi', priority: 'high' },
                    { id: 4, name: 'Kingdom Plantae', priority: 'medium' },
                    { id: 5, name: 'Kingdom Animalia', priority: 'medium' },
                    { id: 6, name: 'Viruses & Viroids', priority: 'high' }
                ]
            },
            {
                number: 3, name: 'Plant Kingdom',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo103.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Algae', priority: 'high' },
                    { id: 2, name: 'Bryophytes', priority: 'high' },
                    { id: 3, name: 'Pteridophytes', priority: 'high' },
                    { id: 4, name: 'Gymnosperms', priority: 'medium' },
                    { id: 5, name: 'Angiosperms', priority: 'high' },
                    { id: 6, name: 'Life Cycles & Alternation of Generations', priority: 'high' }
                ]
            },
            {
                number: 4, name: 'Animal Kingdom',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo104.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Basis of Classification', priority: 'high' },
                    { id: 2, name: 'Phylum Porifera to Ctenophora', priority: 'high' },
                    { id: 3, name: 'Phylum Platyhelminthes to Annelida', priority: 'high' },
                    { id: 4, name: 'Phylum Arthropoda & Mollusca', priority: 'high' },
                    { id: 5, name: 'Phylum Echinodermata & Hemichordata', priority: 'medium' },
                    { id: 6, name: 'Phylum Chordata', priority: 'high' }
                ]
            },
            {
                number: 5, name: 'Morphology of Flowering Plants',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo105.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Root System', priority: 'high' },
                    { id: 2, name: 'Stem', priority: 'high' },
                    { id: 3, name: 'Leaf', priority: 'high' },
                    { id: 4, name: 'Inflorescence', priority: 'medium' },
                    { id: 5, name: 'Flower Structure', priority: 'high' },
                    { id: 6, name: 'Fruit & Seed', priority: 'high' },
                    { id: 7, name: 'Floral Formula & Diagrams', priority: 'high' }
                ]
            },
            {
                number: 6, name: 'Anatomy of Flowering Plants',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo106.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Plant Tissues', priority: 'high' },
                    { id: 2, name: 'Anatomy of Dicot & Monocot Roots', priority: 'high' },
                    { id: 3, name: 'Anatomy of Dicot & Monocot Stems', priority: 'high' },
                    { id: 4, name: 'Anatomy of Leaves', priority: 'medium' },
                    { id: 5, name: 'Secondary Growth', priority: 'high' }
                ]
            },
            {
                number: 7, name: 'Structural Organisation in Animals',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo107.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Epithelial Tissue', priority: 'high' },
                    { id: 2, name: 'Connective Tissue', priority: 'high' },
                    { id: 3, name: 'Muscular Tissue', priority: 'high' },
                    { id: 4, name: 'Neural Tissue', priority: 'medium' },
                    { id: 5, name: 'Cockroach Anatomy', priority: 'high' }
                ]
            },
            {
                number: 8, name: 'Cell: The Unit of Life',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo108.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Cell Theory', priority: 'high' },
                    { id: 2, name: 'Prokaryotic vs Eukaryotic Cells', priority: 'high' },
                    { id: 3, name: 'Cell Membrane & Cell Wall', priority: 'high' },
                    { id: 4, name: 'Endomembrane System', priority: 'high' },
                    { id: 5, name: 'Mitochondria & Plastids', priority: 'high' },
                    { id: 6, name: 'Ribosomes & Cytoskeleton', priority: 'medium' },
                    { id: 7, name: 'Nucleus', priority: 'high' }
                ]
            },
            {
                number: 9, name: 'Biomolecules',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo109.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Carbohydrates', priority: 'high' },
                    { id: 2, name: 'Proteins', priority: 'high' },
                    { id: 3, name: 'Lipids', priority: 'high' },
                    { id: 4, name: 'Nucleic Acids', priority: 'high' },
                    { id: 5, name: 'Enzymes', priority: 'high' }
                ]
            },
            {
                number: 10, name: 'Cell Cycle and Cell Division',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo110.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Cell Cycle Phases', priority: 'high' },
                    { id: 2, name: 'Mitosis', priority: 'high' },
                    { id: 3, name: 'Meiosis I', priority: 'high' },
                    { id: 4, name: 'Meiosis II', priority: 'high' },
                    { id: 5, name: 'Significance of Meiosis', priority: 'medium' }
                ]
            },
            {
                number: 11, name: 'Photosynthesis in Higher Plants',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo111.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Photosynthetic Pigments', priority: 'high' },
                    { id: 2, name: 'Light Reactions', priority: 'high' },
                    { id: 3, name: 'Calvin Cycle', priority: 'high' },
                    { id: 4, name: 'C3 vs C4 Pathway', priority: 'high' },
                    { id: 5, name: 'Photorespiration', priority: 'high' },
                    { id: 6, name: 'Factors Affecting Photosynthesis', priority: 'medium' }
                ]
            },
            {
                number: 12, name: 'Respiration in Plants',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo112.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Glycolysis', priority: 'high' },
                    { id: 2, name: 'Krebs Cycle', priority: 'high' },
                    { id: 3, name: 'Electron Transport Chain', priority: 'high' },
                    { id: 4, name: 'Fermentation', priority: 'high' },
                    { id: 5, name: 'Respiratory Quotient', priority: 'medium' }
                ]
            },
            {
                number: 13, name: 'Plant Growth and Development',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo113.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Phases of Growth', priority: 'medium' },
                    { id: 2, name: 'Plant Hormones', priority: 'high' },
                    { id: 3, name: 'Auxins', priority: 'high' },
                    { id: 4, name: 'Gibberellins & Cytokinins', priority: 'high' },
                    { id: 5, name: 'Ethylene & ABA', priority: 'high' },
                    { id: 6, name: 'Photoperiodism & Vernalization', priority: 'high' }
                ]
            },
            {
                number: 14, name: 'Breathing and Exchange of Gases',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo114.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Respiratory Organs', priority: 'high' },
                    { id: 2, name: 'Mechanism of Breathing', priority: 'high' },
                    { id: 3, name: 'Exchange of Gases', priority: 'high' },
                    { id: 4, name: 'Transport of Gases', priority: 'high' },
                    { id: 5, name: 'Respiratory Disorders', priority: 'medium' }
                ]
            },
            {
                number: 15, name: 'Body Fluids and Circulation',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo115.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Blood Composition', priority: 'high' },
                    { id: 2, name: 'Blood Groups', priority: 'high' },
                    { id: 3, name: 'Heart Structure', priority: 'high' },
                    { id: 4, name: 'Cardiac Cycle', priority: 'high' },
                    { id: 5, name: 'ECG', priority: 'high' },
                    { id: 6, name: 'Double Circulation', priority: 'high' },
                    { id: 7, name: 'Disorders of Circulatory System', priority: 'medium' }
                ]
            },
            {
                number: 16, name: 'Excretory Products and their Elimination',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo116.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Human Excretory System', priority: 'high' },
                    { id: 2, name: 'Nephron Structure', priority: 'high' },
                    { id: 3, name: 'Urine Formation', priority: 'high' },
                    { id: 4, name: 'Regulation of Kidney Function', priority: 'high' },
                    { id: 5, name: 'Dialysis & Kidney Transplant', priority: 'medium' }
                ]
            },
            {
                number: 17, name: 'Locomotion and Movement',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo117.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Types of Movement', priority: 'medium' },
                    { id: 2, name: 'Skeletal System', priority: 'high' },
                    { id: 3, name: 'Joints', priority: 'high' },
                    { id: 4, name: 'Muscle Structure', priority: 'high' },
                    { id: 5, name: 'Mechanism of Muscle Contraction', priority: 'high' },
                    { id: 6, name: 'Disorders of Muscular & Skeletal System', priority: 'medium' }
                ]
            },
            {
                number: 18, name: 'Neural Control and Coordination',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo118.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Neuron Structure', priority: 'high' },
                    { id: 2, name: 'Nerve Impulse Generation', priority: 'high' },
                    { id: 3, name: 'Synaptic Transmission', priority: 'high' },
                    { id: 4, name: 'Central Nervous System', priority: 'high' },
                    { id: 5, name: 'Reflex Action', priority: 'high' },
                    { id: 6, name: 'Sensory Organs', priority: 'high' }
                ]
            },
            {
                number: 19, name: 'Chemical Coordination and Integration',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo119.pdf', book: 'Biology Class 11',
                subtopics: [
                    { id: 1, name: 'Endocrine Glands', priority: 'high' },
                    { id: 2, name: 'Hypothalamus & Pituitary', priority: 'high' },
                    { id: 3, name: 'Thyroid & Parathyroid', priority: 'high' },
                    { id: 4, name: 'Adrenal Glands', priority: 'high' },
                    { id: 5, name: 'Pancreas', priority: 'high' },
                    { id: 6, name: 'Gonads', priority: 'medium' },
                    { id: 7, name: 'Hormones & Their Actions', priority: 'high' }
                ]
            },
        ],
        '12': [
            {
                number: 1,
                name: 'Reproduction in Organisms',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo101.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Asexual Reproduction', priority: 'medium' },
                    { id: 2, name: 'Sexual Reproduction', priority: 'high' },
                    { id: 3, name: 'Pre-fertilisation Events', priority: 'high' },
                    { id: 4, name: 'Fertilisation', priority: 'high' },
                    { id: 5, name: 'Post-fertilisation Events', priority: 'medium' }
                ]
            },
            {
                number: 2,
                name: 'Sexual Reproduction in Flowering Plants',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo102.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Flower Structure', priority: 'medium' },
                    { id: 2, name: 'Stamen & Microsporogenesis', priority: 'high' },
                    { id: 3, name: 'Pistil & Megasporogenesis', priority: 'high' },
                    { id: 4, name: 'Pollination', priority: 'high' },
                    { id: 5, name: 'Double Fertilisation', priority: 'high' },
                    { id: 6, name: 'Embryo Development', priority: 'high' },
                    { id: 7, name: 'Seed & Fruit Formation', priority: 'medium' },
                    { id: 8, name: 'Apomixis & Polyembryony', priority: 'medium' }
                ]
            },
            {
                number: 3,
                name: 'Human Reproduction',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo103.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Male Reproductive System', priority: 'high' },
                    { id: 2, name: 'Female Reproductive System', priority: 'high' },
                    { id: 3, name: 'Spermatogenesis', priority: 'high' },
                    { id: 4, name: 'Oogenesis', priority: 'high' },
                    { id: 5, name: 'Menstrual Cycle', priority: 'high' },
                    { id: 6, name: 'Fertilisation & Implantation', priority: 'high' },
                    { id: 7, name: 'Pregnancy & Embryonic Development', priority: 'high' },
                    { id: 8, name: 'Parturition & Lactation', priority: 'medium' }
                ]
            },
            {
                number: 4,
                name: 'Reproductive Health',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo104.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Reproductive Health Problems', priority: 'medium' },
                    { id: 2, name: 'Population Control', priority: 'medium' },
                    { id: 3, name: 'Contraception Methods', priority: 'high' },
                    { id: 4, name: 'STIs & Prevention', priority: 'high' },
                    { id: 5, name: 'Infertility & ART', priority: 'high' }
                ]
            },
            {
                number: 5,
                name: 'Principles of Inheritance and Variation',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo105.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Mendel\'s Laws', priority: 'high' },
                    { id: 2, name: 'Monohybrid & Dihybrid Cross', priority: 'high' },
                    { id: 3, name: 'Incomplete Dominance & Codominance', priority: 'high' },
                    { id: 4, name: 'Multiple Alleles & Blood Groups', priority: 'high' },
                    { id: 5, name: 'Pleiotropy', priority: 'medium' },
                    { id: 6, name: 'Linkage & Recombination', priority: 'high' },
                    { id: 7, name: 'Sex Determination', priority: 'high' },
                    { id: 8, name: 'Sex-linked Inheritance', priority: 'high' },
                    { id: 9, name: 'Chromosomal Disorders', priority: 'high' },
                    { id: 10, name: 'Pedigree Analysis', priority: 'high' }
                ]
            },
            {
                number: 6,
                name: 'Molecular Basis of Inheritance',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo106.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'DNA Structure', priority: 'high' },
                    { id: 2, name: 'DNA Replication', priority: 'high' },
                    { id: 3, name: 'Transcription', priority: 'high' },
                    { id: 4, name: 'Genetic Code', priority: 'high' },
                    { id: 5, name: 'Translation', priority: 'high' },
                    { id: 6, name: 'Lac Operon', priority: 'high' },
                    { id: 7, name: 'Human Genome Project', priority: 'medium' },
                    { id: 8, name: 'DNA Fingerprinting', priority: 'high' }
                ]
            },
            {
                number: 7,
                name: 'Evolution',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo107.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Origin of Life', priority: 'medium' },
                    { id: 2, name: 'Evidences of Evolution', priority: 'high' },
                    { id: 3, name: 'Darwinism & Natural Selection', priority: 'high' },
                    { id: 4, name: 'Hardy-Weinberg Principle', priority: 'high' },
                    { id: 5, name: 'Speciation', priority: 'high' },
                    { id: 6, name: 'Human Evolution', priority: 'medium' }
                ]
            },
            {
                number: 8,
                name: 'Human Health and Disease',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo108.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Common Diseases', priority: 'high' },
                    { id: 2, name: 'Immunity Types', priority: 'high' },
                    { id: 3, name: 'AIDS', priority: 'high' },
                    { id: 4, name: 'Cancer', priority: 'high' },
                    { id: 5, name: 'Drugs & Alcohol Abuse', priority: 'medium' }
                ]
            },
            {
                number: 9,
                name: 'Strategies for Enhancement in Food Production',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo109.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Animal Husbandry', priority: 'medium' },
                    { id: 2, name: 'Plant Breeding', priority: 'high' },
                    { id: 3, name: 'Single Cell Protein', priority: 'low' },
                    { id: 4, name: 'Tissue Culture', priority: 'high' }
                ]
            },
            {
                number: 10,
                name: 'Microbes in Human Welfare',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo110.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Microbes in Household Products', priority: 'medium' },
                    { id: 2, name: 'Industrial Products', priority: 'high' },
                    { id: 3, name: 'Sewage Treatment', priority: 'high' },
                    { id: 4, name: 'Biogas Production', priority: 'medium' },
                    { id: 5, name: 'Biocontrol Agents', priority: 'medium' },
                    { id: 6, name: 'Biofertilizers', priority: 'medium' }
                ]
            },
            {
                number: 11,
                name: 'Biotechnology: Principles and Processes',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo111.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Genetic Engineering Principles', priority: 'high' },
                    { id: 2, name: 'Restriction Enzymes', priority: 'high' },
                    { id: 3, name: 'Cloning Vectors', priority: 'high' },
                    { id: 4, name: 'rDNA Technology Steps', priority: 'high' },
                    { id: 5, name: 'PCR', priority: 'high' },
                    { id: 6, name: 'Gel Electrophoresis', priority: 'high' }
                ]
            },
            {
                number: 12,
                name: 'Biotechnology and its Applications',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo112.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Bt Crops', priority: 'high' },
                    { id: 2, name: 'RNA Interference', priority: 'medium' },
                    { id: 3, name: 'Gene Therapy', priority: 'high' },
                    { id: 4, name: 'Transgenic Animals', priority: 'medium' },
                    { id: 5, name: 'Ethical Issues', priority: 'low' }
                ]
            },
            {
                number: 13,
                name: 'Organisms and Populations',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo113.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Organism & Environment', priority: 'medium' },
                    { id: 2, name: 'Adaptations', priority: 'high' },
                    { id: 3, name: 'Population Attributes', priority: 'high' },
                    { id: 4, name: 'Population Growth', priority: 'high' },
                    { id: 5, name: 'Population Interactions', priority: 'high' }
                ]
            },
            {
                number: 14,
                name: 'Ecosystem',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo114.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Ecosystem Structure', priority: 'high' },
                    { id: 2, name: 'Productivity', priority: 'high' },
                    { id: 3, name: 'Energy Flow', priority: 'high' },
                    { id: 4, name: 'Food Chains & Webs', priority: 'high' },
                    { id: 5, name: 'Ecological Pyramids', priority: 'high' },
                    { id: 6, name: 'Nutrient Cycling', priority: 'high' },
                    { id: 7, name: 'Ecological Succession', priority: 'high' }
                ]
            },
            {
                number: 15,
                name: 'Biodiversity and Conservation',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo115.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Biodiversity Types', priority: 'high' },
                    { id: 2, name: 'Biodiversity Patterns', priority: 'medium' },
                    { id: 3, name: 'Importance of Biodiversity', priority: 'medium' },
                    { id: 4, name: 'Loss of Biodiversity', priority: 'high' },
                    { id: 5, name: 'Biodiversity Conservation', priority: 'high' }
                ]
            },
            {
                number: 16,
                name: 'Environmental Issues',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo116.pdf',
                book: 'Biology Class 12',
                subtopics: [
                    { id: 1, name: 'Air Pollution', priority: 'high' },
                    { id: 2, name: 'Water Pollution', priority: 'high' },
                    { id: 3, name: 'Solid Waste Management', priority: 'medium' },
                    { id: 4, name: 'Ozone Depletion', priority: 'high' },
                    { id: 5, name: 'Greenhouse Effect', priority: 'high' },
                    { id: 6, name: 'Deforestation', priority: 'medium' }
                ]
            },
        ]
    },
    chemistry: {
        name: 'Chemistry',
        '11': [
            {
                number: 1, name: 'Some Basic Concepts of Chemistry',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech101.pdf', book: 'Chemistry Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Mole Concept', priority: 'high' },
                    { id: 2, name: 'Atomic & Molecular Mass', priority: 'high' },
                    { id: 3, name: 'Stoichiometry', priority: 'high' },
                    { id: 4, name: 'Concentration Terms', priority: 'high' },
                    { id: 5, name: 'Empirical & Molecular Formula', priority: 'medium' }
                ]
            },
            {
                number: 2, name: 'Structure of Atom',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech102.pdf', book: 'Chemistry Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Atomic Models', priority: 'high' },
                    { id: 2, name: 'Quantum Numbers', priority: 'high' },
                    { id: 3, name: 'Shapes of Orbitals', priority: 'high' },
                    { id: 4, name: 'Electronic Configuration', priority: 'high' },
                    { id: 5, name: 'Aufbau, Pauli & Hund\'s Rules', priority: 'high' }
                ]
            },
            {
                number: 3, name: 'Classification of Elements and Periodicity',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech103.pdf', book: 'Chemistry Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Periodic Table Development', priority: 'medium' },
                    { id: 2, name: 'Periodic Properties', priority: 'high' },
                    { id: 3, name: 'Ionization Energy', priority: 'high' },
                    { id: 4, name: 'Electron Affinity', priority: 'high' },
                    { id: 5, name: 'Electronegativity', priority: 'high' }
                ]
            },
            {
                number: 4, name: 'Chemical Bonding and Molecular Structure',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech104.pdf', book: 'Chemistry Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Ionic Bond', priority: 'high' },
                    { id: 2, name: 'Covalent Bond', priority: 'high' },
                    { id: 3, name: 'VSEPR Theory', priority: 'high' },
                    { id: 4, name: 'Hybridization', priority: 'high' },
                    { id: 5, name: 'Molecular Orbital Theory', priority: 'high' },
                    { id: 6, name: 'Hydrogen Bonding', priority: 'medium' }
                ]
            },
            {
                number: 5, name: 'Thermodynamics',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech105.pdf', book: 'Chemistry Part I Class 11',
                subtopics: [
                    { id: 1, name: 'System & Surroundings', priority: 'medium' },
                    { id: 2, name: 'First Law', priority: 'high' },
                    { id: 3, name: 'Enthalpy', priority: 'high' },
                    { id: 4, name: 'Hess\'s Law', priority: 'high' },
                    { id: 5, name: 'Entropy & Gibbs Energy', priority: 'high' }
                ]
            },
            {
                number: 6, name: 'Equilibrium',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech106.pdf', book: 'Chemistry Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Law of Chemical Equilibrium', priority: 'high' },
                    { id: 2, name: 'Le Chatelier\'s Principle', priority: 'high' },
                    { id: 3, name: 'Ionic Equilibrium', priority: 'high' },
                    { id: 4, name: 'pH & Buffer Solutions', priority: 'high' },
                    { id: 5, name: 'Solubility Product', priority: 'high' }
                ]
            },
            {
                number: 7, name: 'Redox Reactions',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech107.pdf', book: 'Chemistry Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Oxidation & Reduction', priority: 'high' },
                    { id: 2, name: 'Oxidation Numbers', priority: 'high' },
                    { id: 3, name: 'Balancing Redox Reactions', priority: 'high' },
                    { id: 4, name: 'Electrochemical Cells', priority: 'medium' }
                ]
            },
            {
                number: 8, name: 'Organic Chemistry: Basic Principles',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech201.pdf', book: 'Chemistry Part II Class 11',
                subtopics: [
                    { id: 1, name: 'IUPAC Nomenclature', priority: 'high' },
                    { id: 2, name: 'Isomerism', priority: 'high' },
                    { id: 3, name: 'Inductive Effect', priority: 'high' },
                    { id: 4, name: 'Resonance', priority: 'high' },
                    { id: 5, name: 'Reaction Mechanisms', priority: 'high' }
                ]
            },
            {
                number: 9, name: 'Hydrocarbons',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech202.pdf', book: 'Chemistry Part II Class 11',
                subtopics: [
                    { id: 1, name: 'Alkanes', priority: 'high' },
                    { id: 2, name: 'Alkenes', priority: 'high' },
                    { id: 3, name: 'Alkynes', priority: 'high' },
                    { id: 4, name: 'Aromatic Hydrocarbons', priority: 'high' },
                    { id: 5, name: 'Reactions of Hydrocarbons', priority: 'high' }
                ]
            },
        ],
        '12': [
            {
                number: 1, name: 'Solutions',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech101.pdf', book: 'Chemistry Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Concentration Units', priority: 'high' },
                    { id: 2, name: 'Raoult\'s Law', priority: 'high' },
                    { id: 3, name: 'Colligative Properties', priority: 'high' },
                    { id: 4, name: 'Osmotic Pressure', priority: 'high' },
                    { id: 5, name: 'Abnormal Molar Mass', priority: 'medium' }
                ]
            },
            {
                number: 2, name: 'Electrochemistry',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech102.pdf', book: 'Chemistry Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Electrolytic Conductance', priority: 'high' },
                    { id: 2, name: 'Kohlrausch\'s Law', priority: 'high' },
                    { id: 3, name: 'Electrochemical Cells', priority: 'high' },
                    { id: 4, name: 'Nernst Equation', priority: 'high' },
                    { id: 5, name: 'Batteries & Fuel Cells', priority: 'medium' },
                    { id: 6, name: 'Electrolysis & Faraday\'s Laws', priority: 'high' }
                ]
            },
            {
                number: 3, name: 'Chemical Kinetics',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech103.pdf', book: 'Chemistry Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Rate of Reaction', priority: 'high' },
                    { id: 2, name: 'Order & Molecularity', priority: 'high' },
                    { id: 3, name: 'Rate Laws & Integrated Rate Equations', priority: 'high' },
                    { id: 4, name: 'Half-Life', priority: 'high' },
                    { id: 5, name: 'Arrhenius Equation', priority: 'high' }
                ]
            },
            {
                number: 4, name: 'd and f Block Elements',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech104.pdf', book: 'Chemistry Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Transition Elements Properties', priority: 'high' },
                    { id: 2, name: 'Oxidation States', priority: 'high' },
                    { id: 3, name: 'Colour & Magnetism', priority: 'high' },
                    { id: 4, name: 'Lanthanides', priority: 'medium' },
                    { id: 5, name: 'Actinides', priority: 'low' }
                ]
            },
            {
                number: 5, name: 'Coordination Compounds',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech105.pdf', book: 'Chemistry Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Terminology & Nomenclature', priority: 'high' },
                    { id: 2, name: 'Isomerism', priority: 'high' },
                    { id: 3, name: 'Valence Bond Theory', priority: 'high' },
                    { id: 4, name: 'Crystal Field Theory', priority: 'high' },
                    { id: 5, name: 'Applications', priority: 'medium' }
                ]
            },
            {
                number: 6, name: 'Haloalkanes and Haloarenes',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech201.pdf', book: 'Chemistry Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Nomenclature & Classification', priority: 'high' },
                    { id: 2, name: 'SN1 & SN2 Reactions', priority: 'high' },
                    { id: 3, name: 'Elimination Reactions', priority: 'high' },
                    { id: 4, name: 'Reactions of Haloarenes', priority: 'high' }
                ]
            },
            {
                number: 7, name: 'Alcohols, Phenols and Ethers',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech202.pdf', book: 'Chemistry Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Alcohols Preparation & Properties', priority: 'high' },
                    { id: 2, name: 'Phenols', priority: 'high' },
                    { id: 3, name: 'Ethers', priority: 'medium' },
                    { id: 4, name: 'Reactions & Mechanisms', priority: 'high' }
                ]
            },
            {
                number: 8, name: 'Aldehydes, Ketones and Carboxylic Acids',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech203.pdf', book: 'Chemistry Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Aldehydes & Ketones Preparation', priority: 'high' },
                    { id: 2, name: 'Nucleophilic Addition', priority: 'high' },
                    { id: 3, name: 'Aldol Condensation', priority: 'high' },
                    { id: 4, name: 'Cannizzaro Reaction', priority: 'high' },
                    { id: 5, name: 'Carboxylic Acids', priority: 'high' }
                ]
            },
            {
                number: 9, name: 'Amines',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech204.pdf', book: 'Chemistry Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Classification & Nomenclature', priority: 'high' },
                    { id: 2, name: 'Preparation Methods', priority: 'high' },
                    { id: 3, name: 'Basicity of Amines', priority: 'high' },
                    { id: 4, name: 'Diazonium Salts', priority: 'high' }
                ]
            },
            {
                number: 10, name: 'Biomolecules',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech205.pdf', book: 'Chemistry Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Carbohydrates', priority: 'high' },
                    { id: 2, name: 'Proteins & Amino Acids', priority: 'high' },
                    { id: 3, name: 'Nucleic Acids', priority: 'high' },
                    { id: 4, name: 'Vitamins', priority: 'medium' }
                ]
            },
        ]
    },
    physics: {
        name: 'Physics',
        '11': [
            {
                number: 1, name: 'Units and Measurements',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph101.pdf', book: 'Physics Part I Class 11',
                subtopics: [
                    { id: 1, name: 'SI Units', priority: 'high' },
                    { id: 2, name: 'Dimensional Analysis', priority: 'high' },
                    { id: 3, name: 'Significant Figures', priority: 'medium' },
                    { id: 4, name: 'Errors in Measurement', priority: 'medium' }
                ]
            },
            {
                number: 2, name: 'Motion in a Straight Line',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph102.pdf', book: 'Physics Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Distance & Displacement', priority: 'high' },
                    { id: 2, name: 'Speed & Velocity', priority: 'high' },
                    { id: 3, name: 'Equations of Motion', priority: 'high' },
                    { id: 4, name: 'Free Fall', priority: 'high' },
                    { id: 5, name: 'Graphical Analysis', priority: 'high' }
                ]
            },
            {
                number: 3, name: 'Motion in a Plane',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph103.pdf', book: 'Physics Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Vectors', priority: 'high' },
                    { id: 2, name: 'Projectile Motion', priority: 'high' },
                    { id: 3, name: 'Circular Motion', priority: 'high' },
                    { id: 4, name: 'Relative Velocity', priority: 'medium' }
                ]
            },
            {
                number: 4, name: 'Laws of Motion',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph104.pdf', book: 'Physics Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Newton\'s Laws', priority: 'high' },
                    { id: 2, name: 'Momentum & Impulse', priority: 'high' },
                    { id: 3, name: 'Friction', priority: 'high' },
                    { id: 4, name: 'Circular Motion Dynamics', priority: 'high' },
                    { id: 5, name: 'Free Body Diagrams', priority: 'high' }
                ]
            },
            {
                number: 5, name: 'Work, Energy and Power',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph105.pdf', book: 'Physics Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Work Done', priority: 'high' },
                    { id: 2, name: 'Kinetic & Potential Energy', priority: 'high' },
                    { id: 3, name: 'Work-Energy Theorem', priority: 'high' },
                    { id: 4, name: 'Conservation of Energy', priority: 'high' },
                    { id: 5, name: 'Power', priority: 'high' },
                    { id: 6, name: 'Collisions', priority: 'high' }
                ]
            },
            {
                number: 6, name: 'System of Particles and Rotational Motion',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph106.pdf', book: 'Physics Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Center of Mass', priority: 'high' },
                    { id: 2, name: 'Moment of Inertia', priority: 'high' },
                    { id: 3, name: 'Torque', priority: 'high' },
                    { id: 4, name: 'Angular Momentum', priority: 'high' },
                    { id: 5, name: 'Rolling Motion', priority: 'high' }
                ]
            },
            {
                number: 7, name: 'Gravitation',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph107.pdf', book: 'Physics Part I Class 11',
                subtopics: [
                    { id: 1, name: 'Newton\'s Law of Gravitation', priority: 'high' },
                    { id: 2, name: 'Gravitational Field & Potential', priority: 'high' },
                    { id: 3, name: 'Kepler\'s Laws', priority: 'high' },
                    { id: 4, name: 'Escape & Orbital Velocity', priority: 'high' },
                    { id: 5, name: 'Satellites', priority: 'high' }
                ]
            },
            {
                number: 8, name: 'Mechanical Properties of Solids',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph201.pdf', book: 'Physics Part II Class 11',
                subtopics: [
                    { id: 1, name: 'Stress & Strain', priority: 'high' },
                    { id: 2, name: 'Hooke\'s Law', priority: 'high' },
                    { id: 3, name: 'Young\'s Modulus', priority: 'high' },
                    { id: 4, name: 'Bulk & Shear Modulus', priority: 'medium' }
                ]
            },
            {
                number: 9, name: 'Mechanical Properties of Fluids',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph202.pdf', book: 'Physics Part II Class 11',
                subtopics: [
                    { id: 1, name: 'Pressure', priority: 'high' },
                    { id: 2, name: 'Pascal\'s Law', priority: 'high' },
                    { id: 3, name: 'Bernoulli\'s Principle', priority: 'high' },
                    { id: 4, name: 'Viscosity', priority: 'medium' },
                    { id: 5, name: 'Surface Tension', priority: 'high' }
                ]
            },
            {
                number: 10, name: 'Thermal Properties of Matter',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph203.pdf', book: 'Physics Part II Class 11',
                subtopics: [
                    { id: 1, name: 'Temperature Scales', priority: 'medium' },
                    { id: 2, name: 'Thermal Expansion', priority: 'high' },
                    { id: 3, name: 'Specific Heat', priority: 'high' },
                    { id: 4, name: 'Calorimetry', priority: 'high' },
                    { id: 5, name: 'Heat Transfer', priority: 'high' }
                ]
            },
            {
                number: 11, name: 'Thermodynamics',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph204.pdf', book: 'Physics Part II Class 11',
                subtopics: [
                    { id: 1, name: 'Thermodynamic Processes', priority: 'high' },
                    { id: 2, name: 'First Law', priority: 'high' },
                    { id: 3, name: 'Second Law', priority: 'high' },
                    { id: 4, name: 'Heat Engines', priority: 'high' },
                    { id: 5, name: 'Carnot Cycle', priority: 'high' }
                ]
            },
            {
                number: 12, name: 'Kinetic Theory',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph205.pdf', book: 'Physics Part II Class 11',
                subtopics: [
                    { id: 1, name: 'Ideal Gas Laws', priority: 'high' },
                    { id: 2, name: 'KE of Gas Molecules', priority: 'high' },
                    { id: 3, name: 'RMS Velocity', priority: 'high' },
                    { id: 4, name: 'Degrees of Freedom', priority: 'medium' }
                ]
            },
            {
                number: 13, name: 'Oscillations',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph206.pdf', book: 'Physics Part II Class 11',
                subtopics: [
                    { id: 1, name: 'Simple Harmonic Motion', priority: 'high' },
                    { id: 2, name: 'Energy in SHM', priority: 'high' },
                    { id: 3, name: 'Simple Pendulum', priority: 'high' },
                    { id: 4, name: 'Spring Oscillations', priority: 'high' },
                    { id: 5, name: 'Damped & Forced Oscillations', priority: 'medium' }
                ]
            },
            {
                number: 14, name: 'Waves',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph207.pdf', book: 'Physics Part II Class 11',
                subtopics: [
                    { id: 1, name: 'Wave Motion', priority: 'high' },
                    { id: 2, name: 'Wave Velocity', priority: 'high' },
                    { id: 3, name: 'Superposition', priority: 'high' },
                    { id: 4, name: 'Standing Waves', priority: 'high' },
                    { id: 5, name: 'Beats', priority: 'high' },
                    { id: 6, name: 'Doppler Effect', priority: 'high' }
                ]
            },
        ],
        '12': [
            {
                number: 1, name: 'Electric Charges and Fields',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph101.pdf', book: 'Physics Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Electric Charge', priority: 'high' },
                    { id: 2, name: 'Coulomb\'s Law', priority: 'high' },
                    { id: 3, name: 'Electric Field', priority: 'high' },
                    { id: 4, name: 'Electric Dipole', priority: 'high' },
                    { id: 5, name: 'Gauss\'s Law', priority: 'high' }
                ]
            },
            {
                number: 2, name: 'Electrostatic Potential and Capacitance',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph102.pdf', book: 'Physics Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Electric Potential', priority: 'high' },
                    { id: 2, name: 'Potential Energy', priority: 'high' },
                    { id: 3, name: 'Capacitors', priority: 'high' },
                    { id: 4, name: 'Dielectrics', priority: 'high' },
                    { id: 5, name: 'Energy in Capacitors', priority: 'high' }
                ]
            },
            {
                number: 3, name: 'Current Electricity',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph103.pdf', book: 'Physics Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Ohm\'s Law', priority: 'high' },
                    { id: 2, name: 'Resistance & Resistivity', priority: 'high' },
                    { id: 3, name: 'Kirchhoff\'s Laws', priority: 'high' },
                    { id: 4, name: 'Wheatstone Bridge', priority: 'high' },
                    { id: 5, name: 'Potentiometer', priority: 'high' }
                ]
            },
            {
                number: 4, name: 'Moving Charges and Magnetism',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph104.pdf', book: 'Physics Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Lorentz Force', priority: 'high' },
                    { id: 2, name: 'Biot-Savart Law', priority: 'high' },
                    { id: 3, name: 'Ampere\'s Law', priority: 'high' },
                    { id: 4, name: 'Solenoid & Toroid', priority: 'high' },
                    { id: 5, name: 'Cyclotron', priority: 'medium' }
                ]
            },
            {
                number: 5, name: 'Magnetism and Matter',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph105.pdf', book: 'Physics Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Magnetic Dipole', priority: 'high' },
                    { id: 2, name: 'Earth\'s Magnetism', priority: 'medium' },
                    { id: 3, name: 'Magnetic Materials', priority: 'high' },
                    { id: 4, name: 'Hysteresis', priority: 'medium' }
                ]
            },
            {
                number: 6, name: 'Electromagnetic Induction',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph106.pdf', book: 'Physics Part I Class 12',
                subtopics: [
                    { id: 1, name: 'Faraday\'s Law', priority: 'high' },
                    { id: 2, name: 'Lenz\'s Law', priority: 'high' },
                    { id: 3, name: 'Motional EMF', priority: 'high' },
                    { id: 4, name: 'Self Inductance', priority: 'high' },
                    { id: 5, name: 'Mutual Inductance', priority: 'high' }
                ]
            },
            {
                number: 7, name: 'Alternating Current',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph107.pdf', book: 'Physics Part I Class 12',
                subtopics: [
                    { id: 1, name: 'AC Voltage & Current', priority: 'high' },
                    { id: 2, name: 'AC Circuits (R, L, C)', priority: 'high' },
                    { id: 3, name: 'LCR Circuit & Resonance', priority: 'high' },
                    { id: 4, name: 'Power in AC', priority: 'high' },
                    { id: 5, name: 'Transformers', priority: 'high' }
                ]
            },
            {
                number: 8, name: 'Electromagnetic Waves',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph108.pdf', book: 'Physics Part I Class 12',
                subtopics: [
                    { id: 1, name: 'EM Wave Properties', priority: 'high' },
                    { id: 2, name: 'EM Spectrum', priority: 'high' },
                    { id: 3, name: 'Applications', priority: 'medium' }
                ]
            },
            {
                number: 9, name: 'Ray Optics and Optical Instruments',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph201.pdf', book: 'Physics Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Reflection & Mirrors', priority: 'high' },
                    { id: 2, name: 'Refraction & Lenses', priority: 'high' },
                    { id: 3, name: 'Total Internal Reflection', priority: 'high' },
                    { id: 4, name: 'Prism', priority: 'high' },
                    { id: 5, name: 'Optical Instruments', priority: 'high' }
                ]
            },
            {
                number: 10, name: 'Wave Optics',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph202.pdf', book: 'Physics Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Huygens Principle', priority: 'high' },
                    { id: 2, name: 'Interference', priority: 'high' },
                    { id: 3, name: 'Young\'s Double Slit', priority: 'high' },
                    { id: 4, name: 'Diffraction', priority: 'high' },
                    { id: 5, name: 'Polarization', priority: 'high' }
                ]
            },
            {
                number: 11, name: 'Dual Nature of Radiation and Matter',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph203.pdf', book: 'Physics Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Photoelectric Effect', priority: 'high' },
                    { id: 2, name: 'Photon Properties', priority: 'high' },
                    { id: 3, name: 'de Broglie Wavelength', priority: 'high' },
                    { id: 4, name: 'Davisson-Germer Experiment', priority: 'medium' }
                ]
            },
            {
                number: 12, name: 'Atoms',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph204.pdf', book: 'Physics Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Rutherford Model', priority: 'high' },
                    { id: 2, name: 'Bohr Model', priority: 'high' },
                    { id: 3, name: 'Hydrogen Spectrum', priority: 'high' },
                    { id: 4, name: 'Energy Levels', priority: 'high' }
                ]
            },
            {
                number: 13, name: 'Nuclei',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph205.pdf', book: 'Physics Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Nuclear Size & Density', priority: 'high' },
                    { id: 2, name: 'Binding Energy', priority: 'high' },
                    { id: 3, name: 'Radioactivity', priority: 'high' },
                    { id: 4, name: 'Nuclear Fission', priority: 'high' },
                    { id: 5, name: 'Nuclear Fusion', priority: 'high' }
                ]
            },
            {
                number: 14, name: 'Semiconductor Electronics',
                pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph206.pdf', book: 'Physics Part II Class 12',
                subtopics: [
                    { id: 1, name: 'Semiconductors', priority: 'high' },
                    { id: 2, name: 'p-n Junction', priority: 'high' },
                    { id: 3, name: 'Diode Applications', priority: 'high' },
                    { id: 4, name: 'Transistors', priority: 'high' },
                    { id: 5, name: 'Logic Gates', priority: 'high' }
                ]
            },
        ]
    }
};

// Chapter count per class
const CHAPTER_COUNTS = {
    biology: { '11': 19, '12': 16 },
    chemistry: { '11': 9, '12': 10 },
    physics: { '11': 14, '12': 14 }
};

// Topic keywords for search
const TOPIC_KEYWORDS = {
    biology: {
        'The Living World': ['taxonomy', 'biodiversity', 'nomenclature', 'binomial', 'classification'],
        'Biological Classification': ['kingdom', 'monera', 'protista', 'fungi', 'plantae', 'animalia', 'virus', 'bacteria'],
        'Plant Kingdom': ['algae', 'bryophytes', 'pteridophytes', 'gymnosperms', 'angiosperms', 'alternation of generations'],
        'Animal Kingdom': ['porifera', 'cnidaria', 'platyhelminthes', 'annelida', 'arthropoda', 'mollusca', 'echinodermata', 'chordata'],
        'Morphology of Flowering Plants': ['root', 'stem', 'leaf', 'inflorescence', 'flower', 'fruit', 'seed'],
        'Anatomy of Flowering Plants': ['tissue system', 'meristem', 'xylem', 'phloem', 'vascular bundle'],
        'Structural Organisation in Animals': ['epithelial', 'connective', 'muscular', 'neural tissue', 'cockroach', 'frog'],
        'Cell: The Unit of Life': ['cell theory', 'prokaryotic', 'eukaryotic', 'nucleus', 'mitochondria', 'chloroplast', 'endoplasmic reticulum', 'golgi'],
        'Biomolecules': ['carbohydrates', 'proteins', 'lipids', 'nucleic acids', 'enzymes', 'amino acids'],
        'Cell Cycle and Cell Division': ['mitosis', 'meiosis', 'interphase', 'prophase', 'metaphase', 'anaphase', 'telophase', 'cytokinesis'],
        'Photosynthesis in Higher Plants': ['chlorophyll', 'light reaction', 'dark reaction', 'calvin cycle', 'c3 c4 plants', 'photorespiration'],
        'Respiration in Plants': ['glycolysis', 'krebs cycle', 'electron transport', 'fermentation', 'aerobic', 'anaerobic'],
        'Plant Growth and Development': ['auxin', 'gibberellin', 'cytokinin', 'ethylene', 'abscisic acid', 'photoperiodism', 'vernalization'],
        'Breathing and Exchange of Gases': ['respiration', 'lungs', 'alveoli', 'trachea', 'bronchi', 'diaphragm', 'oxygen', 'carbon dioxide'],
        'Body Fluids and Circulation': ['blood', 'plasma', 'rbc', 'wbc', 'platelets', 'heart', 'cardiac cycle', 'ecg', 'blood pressure'],
        'Excretory Products and their Elimination': ['kidney', 'nephron', 'urine formation', 'osmoregulation', 'dialysis'],
        'Locomotion and Movement': ['muscle', 'skeleton', 'joints', 'actin', 'myosin', 'sarcomere'],
        'Neural Control and Coordination': ['neuron', 'synapse', 'reflex arc', 'brain', 'spinal cord', 'sensory organs'],
        'Chemical Coordination and Integration': ['hormones', 'pituitary', 'thyroid', 'adrenal', 'pancreas', 'gonads'],
        'Reproduction in Organisms': ['asexual', 'sexual', 'binary fission', 'budding', 'fragmentation', 'vegetative propagation'],
        'Sexual Reproduction in Flowering Plants': ['pollination', 'fertilization', 'embryo', 'endosperm', 'seed development', 'double fertilization'],
        'Human Reproduction': ['male reproductive system', 'female reproductive system', 'gametogenesis', 'menstrual cycle', 'fertilization', 'pregnancy'],
        'Reproductive Health': ['contraception', 'stis', 'infertility', 'ivf', 'family planning'],
        'Principles of Inheritance and Variation': ['mendel', 'genetics', 'monohybrid', 'dihybrid', 'dominance', 'codominance', 'linkage', 'sex determination'],
        'Molecular Basis of Inheritance': ['dna', 'rna', 'replication', 'transcription', 'translation', 'genetic code', 'mutation'],
        'Evolution': ['darwin', 'natural selection', 'lamarck', 'origin of life', 'hardy weinberg', 'speciation', 'adaptive radiation'],
        'Human Health and Disease': ['pathogens', 'immunity', 'vaccination', 'aids', 'cancer', 'drugs', 'alcohol'],
        'Strategies for Enhancement in Food Production': ['animal husbandry', 'plant breeding', 'single cell protein', 'tissue culture'],
        'Microbes in Human Welfare': ['fermentation', 'antibiotics', 'biogas', 'sewage treatment', 'biocontrol'],
        'Biotechnology: Principles and Processes': ['recombinant dna', 'pcr', 'gel electrophoresis', 'cloning', 'vectors', 'restriction enzymes'],
        'Biotechnology and its Applications': ['gmo', 'bt cotton', 'gene therapy', 'transgenic animals', 'ethical issues'],
        'Organisms and Populations': ['ecology', 'population', 'natality', 'mortality', 'age pyramid', 'population growth'],
        'Ecosystem': ['food chain', 'food web', 'ecological pyramids', 'energy flow', 'nutrient cycling', 'ecological succession'],
        'Biodiversity and Conservation': ['species', 'ecosystem diversity', 'hotspots', 'endangered species', 'conservation', 'wildlife protection'],
        'Environmental Issues': ['pollution', 'global warming', 'ozone depletion', 'deforestation', 'solid waste management']
    },
    chemistry: {
        'Some Basic Concepts of Chemistry': ['mole', 'avogadro', 'atomic mass', 'molecular mass', 'stoichiometry', 'empirical formula'],
        'Structure of Atom': ['bohr model', 'quantum numbers', 'orbitals', 'electronic configuration', 'aufbau', 'pauli', 'hund'],
        'Classification of Elements and Periodicity': ['periodic table', 'periods', 'groups', 'ionization energy', 'electron affinity', 'electronegativity'],
        'Chemical Bonding and Molecular Structure': ['ionic bond', 'covalent bond', 'vsepr', 'hybridization', 'molecular orbital theory'],
        'Thermodynamics': ['enthalpy', 'entropy', 'gibbs energy', 'hess law', 'first law', 'second law'],
        'Equilibrium': ['le chatelier', 'equilibrium constant', 'ionic equilibrium', 'ph', 'buffer', 'solubility'],
        'Redox Reactions': ['oxidation', 'reduction', 'oxidation number', 'balancing redox', 'electrochemical cell'],
        'Organic Chemistry: Basic Principles': ['isomerism', 'nomenclature', 'homolytic', 'heterolytic', 'inductive effect', 'resonance'],
        'Hydrocarbons': ['alkanes', 'alkenes', 'alkynes', 'aromatic', 'benzene', 'combustion', 'addition reaction'],
        'Solutions': ['molarity', 'molality', 'raoults law', 'colligative properties', 'osmotic pressure', 'vant hoff'],
        'Electrochemistry': ['electrolysis', 'nernst equation', 'galvanic cell', 'conductance', 'kohlrausch law', 'faraday'],
        'Chemical Kinetics': ['rate of reaction', 'rate law', 'order of reaction', 'arrhenius equation', 'activation energy', 'catalyst'],
        'd and f Block Elements': ['transition elements', 'lanthanides', 'actinides', 'colour', 'magnetic properties', 'catalytic activity'],
        'Coordination Compounds': ['ligands', 'coordination number', 'isomerism', 'crystal field theory', 'chelation'],
        'Haloalkanes and Haloarenes': ['sn1', 'sn2', 'elimination', 'nucleophilic substitution', 'grignard reagent'],
        'Alcohols, Phenols and Ethers': ['preparation', 'properties', 'reactions', 'dehydration', 'esterification'],
        'Aldehydes, Ketones and Carboxylic Acids': ['nucleophilic addition', 'aldol condensation', 'cannizzaro', 'oxidation', 'reduction'],
        'Amines': ['basicity', 'preparation', 'reactions', 'diazonium salts', 'coupling reaction'],
        'Biomolecules': ['carbohydrates', 'proteins', 'nucleic acids', 'vitamins', 'enzymes', 'hormones']
    },
    physics: {
        'Units and Measurements': ['si units', 'dimensional analysis', 'significant figures', 'errors', 'accuracy', 'precision'],
        'Motion in a Straight Line': ['velocity', 'acceleration', 'equations of motion', 'free fall', 'relative motion'],
        'Motion in a Plane': ['projectile motion', 'circular motion', 'vectors', 'centripetal acceleration'],
        'Laws of Motion': ['newton laws', 'inertia', 'momentum', 'impulse', 'friction', 'circular motion'],
        'Work, Energy and Power': ['kinetic energy', 'potential energy', 'work-energy theorem', 'conservation of energy', 'power'],
        'System of Particles and Rotational Motion': ['center of mass', 'moment of inertia', 'torque', 'angular momentum', 'rotational kinetic energy'],
        'Gravitation': ['keplers laws', 'gravitational constant', 'escape velocity', 'orbital velocity', 'satellites'],
        'Mechanical Properties of Solids': ['stress', 'strain', 'youngs modulus', 'bulk modulus', 'shear modulus', 'poisson ratio'],
        'Mechanical Properties of Fluids': ['pressure', 'pascals law', 'archimedes principle', 'bernoulli', 'viscosity', 'surface tension'],
        'Thermal Properties of Matter': ['heat', 'temperature', 'specific heat', 'thermal expansion', 'calorimetry', 'conduction', 'convection', 'radiation'],
        'Thermodynamics': ['first law', 'second law', 'heat engine', 'carnot cycle', 'entropy', 'isothermal', 'adiabatic'],
        'Kinetic Theory': ['ideal gas', 'kinetic energy', 'rms velocity', 'mean free path', 'degrees of freedom'],
        'Oscillations': ['shm', 'simple harmonic motion', 'pendulum', 'spring', 'damped oscillation', 'resonance'],
        'Waves': ['transverse', 'longitudinal', 'wave equation', 'superposition', 'standing waves', 'beats', 'doppler effect'],
        'Electric Charges and Fields': ['coulombs law', 'electric field', 'electric flux', 'gauss law', 'dipole'],
        'Electrostatic Potential and Capacitance': ['potential', 'potential energy', 'capacitor', 'dielectric', 'energy stored'],
        'Current Electricity': ['ohms law', 'resistance', 'kirchhoffs laws', 'wheatstone bridge', 'potentiometer', 'drift velocity'],
        'Moving Charges and Magnetism': ['lorentz force', 'biot savart', 'amperes law', 'solenoid', 'cyclotron'],
        'Magnetism and Matter': ['magnetic dipole', 'magnetic materials', 'diamagnetic', 'paramagnetic', 'ferromagnetic', 'hysteresis'],
        'Electromagnetic Induction': ['faradays law', 'lenzs law', 'self inductance', 'mutual inductance', 'eddy currents'],
        'Alternating Current': ['ac circuits', 'impedance', 'resonance', 'transformer', 'power factor', 'lcr circuit'],
        'Electromagnetic Waves': ['maxwell equations', 'electromagnetic spectrum', 'radio waves', 'microwaves', 'infrared', 'ultraviolet', 'x-rays', 'gamma rays'],
        'Ray Optics and Optical Instruments': ['reflection', 'refraction', 'total internal reflection', 'prism', 'lens', 'microscope', 'telescope'],
        'Wave Optics': ['interference', 'diffraction', 'young double slit', 'polarization', 'huygens principle'],
        'Dual Nature of Radiation and Matter': ['photoelectric effect', 'photon', 'de broglie', 'wave-particle duality', 'davisson germer'],
        'Atoms': ['bohr model', 'hydrogen spectrum', 'energy levels', 'spectral series'],
        'Nuclei': ['nuclear force', 'binding energy', 'radioactivity', 'alpha beta gamma', 'nuclear fission', 'nuclear fusion'],
        'Semiconductor Electronics': ['pn junction', 'diode', 'transistor', 'logic gates', 'rectifier', 'amplifier']
    }
};
