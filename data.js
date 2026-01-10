// NCERT Book Data - All chapters for Biology, Chemistry, Physics (Class 11 & 12)

const NCERT_DATA = {
    biology: {
        name: 'Biology',
        '11': [
            { number: 1, name: 'The Living World', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo101.pdf', book: 'Biology Class 11' },
            { number: 2, name: 'Biological Classification', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo102.pdf', book: 'Biology Class 11' },
            { number: 3, name: 'Plant Kingdom', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo103.pdf', book: 'Biology Class 11' },
            { number: 4, name: 'Animal Kingdom', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo104.pdf', book: 'Biology Class 11' },
            { number: 5, name: 'Morphology of Flowering Plants', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo105.pdf', book: 'Biology Class 11' },
            { number: 6, name: 'Anatomy of Flowering Plants', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo106.pdf', book: 'Biology Class 11' },
            { number: 7, name: 'Structural Organisation in Animals', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo107.pdf', book: 'Biology Class 11' },
            { number: 8, name: 'Cell: The Unit of Life', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo108.pdf', book: 'Biology Class 11' },
            { number: 9, name: 'Biomolecules', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo109.pdf', book: 'Biology Class 11' },
            { number: 10, name: 'Cell Cycle and Cell Division', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo110.pdf', book: 'Biology Class 11' },
            { number: 11, name: 'Photosynthesis in Higher Plants', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo111.pdf', book: 'Biology Class 11' },
            { number: 12, name: 'Respiration in Plants', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo112.pdf', book: 'Biology Class 11' },
            { number: 13, name: 'Plant Growth and Development', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo113.pdf', book: 'Biology Class 11' },
            { number: 14, name: 'Breathing and Exchange of Gases', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo114.pdf', book: 'Biology Class 11' },
            { number: 15, name: 'Body Fluids and Circulation', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo115.pdf', book: 'Biology Class 11' },
            { number: 16, name: 'Excretory Products and their Elimination', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo116.pdf', book: 'Biology Class 11' },
            { number: 17, name: 'Locomotion and Movement', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo117.pdf', book: 'Biology Class 11' },
            { number: 18, name: 'Neural Control and Coordination', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo118.pdf', book: 'Biology Class 11' },
            { number: 19, name: 'Chemical Coordination and Integration', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo119.pdf', book: 'Biology Class 11' },
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
            { number: 1, name: 'Some Basic Concepts of Chemistry', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech101.pdf', book: 'Chemistry Part I Class 11' },
            { number: 2, name: 'Structure of Atom', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech102.pdf', book: 'Chemistry Part I Class 11' },
            { number: 3, name: 'Classification of Elements and Periodicity', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech103.pdf', book: 'Chemistry Part I Class 11' },
            { number: 4, name: 'Chemical Bonding and Molecular Structure', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech104.pdf', book: 'Chemistry Part I Class 11' },
            { number: 5, name: 'Thermodynamics', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech105.pdf', book: 'Chemistry Part I Class 11' },
            { number: 6, name: 'Equilibrium', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech106.pdf', book: 'Chemistry Part I Class 11' },
            { number: 7, name: 'Redox Reactions', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech107.pdf', book: 'Chemistry Part I Class 11' },
            { number: 8, name: 'Organic Chemistry: Basic Principles', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech201.pdf', book: 'Chemistry Part II Class 11' },
            { number: 9, name: 'Hydrocarbons', pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech202.pdf', book: 'Chemistry Part II Class 11' },
        ],
        '12': [
            { number: 1, name: 'Solutions', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech101.pdf', book: 'Chemistry Part I Class 12' },
            { number: 2, name: 'Electrochemistry', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech102.pdf', book: 'Chemistry Part I Class 12' },
            { number: 3, name: 'Chemical Kinetics', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech103.pdf', book: 'Chemistry Part I Class 12' },
            { number: 4, name: 'd and f Block Elements', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech104.pdf', book: 'Chemistry Part I Class 12' },
            { number: 5, name: 'Coordination Compounds', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech105.pdf', book: 'Chemistry Part I Class 12' },
            { number: 6, name: 'Haloalkanes and Haloarenes', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech201.pdf', book: 'Chemistry Part II Class 12' },
            { number: 7, name: 'Alcohols, Phenols and Ethers', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech202.pdf', book: 'Chemistry Part II Class 12' },
            { number: 8, name: 'Aldehydes, Ketones and Carboxylic Acids', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech203.pdf', book: 'Chemistry Part II Class 12' },
            { number: 9, name: 'Amines', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech204.pdf', book: 'Chemistry Part II Class 12' },
            { number: 10, name: 'Biomolecules', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech205.pdf', book: 'Chemistry Part II Class 12' },
        ]
    },
    physics: {
        name: 'Physics',
        '11': [
            { number: 1, name: 'Units and Measurements', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph101.pdf', book: 'Physics Part I Class 11' },
            { number: 2, name: 'Motion in a Straight Line', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph102.pdf', book: 'Physics Part I Class 11' },
            { number: 3, name: 'Motion in a Plane', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph103.pdf', book: 'Physics Part I Class 11' },
            { number: 4, name: 'Laws of Motion', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph104.pdf', book: 'Physics Part I Class 11' },
            { number: 5, name: 'Work, Energy and Power', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph105.pdf', book: 'Physics Part I Class 11' },
            { number: 6, name: 'System of Particles and Rotational Motion', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph106.pdf', book: 'Physics Part I Class 11' },
            { number: 7, name: 'Gravitation', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph107.pdf', book: 'Physics Part I Class 11' },
            { number: 8, name: 'Mechanical Properties of Solids', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph201.pdf', book: 'Physics Part II Class 11' },
            { number: 9, name: 'Mechanical Properties of Fluids', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph202.pdf', book: 'Physics Part II Class 11' },
            { number: 10, name: 'Thermal Properties of Matter', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph203.pdf', book: 'Physics Part II Class 11' },
            { number: 11, name: 'Thermodynamics', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph204.pdf', book: 'Physics Part II Class 11' },
            { number: 12, name: 'Kinetic Theory', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph205.pdf', book: 'Physics Part II Class 11' },
            { number: 13, name: 'Oscillations', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph206.pdf', book: 'Physics Part II Class 11' },
            { number: 14, name: 'Waves', pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph207.pdf', book: 'Physics Part II Class 11' },
        ],
        '12': [
            { number: 1, name: 'Electric Charges and Fields', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph101.pdf', book: 'Physics Part I Class 12' },
            { number: 2, name: 'Electrostatic Potential and Capacitance', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph102.pdf', book: 'Physics Part I Class 12' },
            { number: 3, name: 'Current Electricity', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph103.pdf', book: 'Physics Part I Class 12' },
            { number: 4, name: 'Moving Charges and Magnetism', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph104.pdf', book: 'Physics Part I Class 12' },
            { number: 5, name: 'Magnetism and Matter', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph105.pdf', book: 'Physics Part I Class 12' },
            { number: 6, name: 'Electromagnetic Induction', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph106.pdf', book: 'Physics Part I Class 12' },
            { number: 7, name: 'Alternating Current', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph107.pdf', book: 'Physics Part I Class 12' },
            { number: 8, name: 'Electromagnetic Waves', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph108.pdf', book: 'Physics Part I Class 12' },
            { number: 9, name: 'Ray Optics and Optical Instruments', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph201.pdf', book: 'Physics Part II Class 12' },
            { number: 10, name: 'Wave Optics', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph202.pdf', book: 'Physics Part II Class 12' },
            { number: 11, name: 'Dual Nature of Radiation and Matter', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph203.pdf', book: 'Physics Part II Class 12' },
            { number: 12, name: 'Atoms', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph204.pdf', book: 'Physics Part II Class 12' },
            { number: 13, name: 'Nuclei', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph205.pdf', book: 'Physics Part II Class 12' },
            { number: 14, name: 'Semiconductor Electronics', pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph206.pdf', book: 'Physics Part II Class 12' },
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
