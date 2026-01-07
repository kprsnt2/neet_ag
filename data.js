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
            { number: 1, name: 'Reproduction in Organisms', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo101.pdf', book: 'Biology Class 12' },
            { number: 2, name: 'Sexual Reproduction in Flowering Plants', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo102.pdf', book: 'Biology Class 12' },
            { number: 3, name: 'Human Reproduction', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo103.pdf', book: 'Biology Class 12' },
            { number: 4, name: 'Reproductive Health', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo104.pdf', book: 'Biology Class 12' },
            { number: 5, name: 'Principles of Inheritance and Variation', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo105.pdf', book: 'Biology Class 12' },
            { number: 6, name: 'Molecular Basis of Inheritance', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo106.pdf', book: 'Biology Class 12' },
            { number: 7, name: 'Evolution', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo107.pdf', book: 'Biology Class 12' },
            { number: 8, name: 'Human Health and Disease', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo108.pdf', book: 'Biology Class 12' },
            { number: 9, name: 'Strategies for Enhancement in Food Production', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo109.pdf', book: 'Biology Class 12' },
            { number: 10, name: 'Microbes in Human Welfare', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo110.pdf', book: 'Biology Class 12' },
            { number: 11, name: 'Biotechnology: Principles and Processes', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo111.pdf', book: 'Biology Class 12' },
            { number: 12, name: 'Biotechnology and its Applications', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo112.pdf', book: 'Biology Class 12' },
            { number: 13, name: 'Organisms and Populations', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo113.pdf', book: 'Biology Class 12' },
            { number: 14, name: 'Ecosystem', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo114.pdf', book: 'Biology Class 12' },
            { number: 15, name: 'Biodiversity and Conservation', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo115.pdf', book: 'Biology Class 12' },
            { number: 16, name: 'Environmental Issues', pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo116.pdf', book: 'Biology Class 12' },
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
