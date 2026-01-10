// Formulas and Reactions Quick Reference for NEET

const FORMULAS = {
    physics: [
        // Mechanics
        {
            name: "Equations of Motion",
            formula: "v = u + at, s = ut + ½at², v² = u² + 2as",
            description: "Basic kinematic equations for uniformly accelerated motion",
            chapter: "Motion in a Straight Line",
            icon: "🚗"
        },
        {
            name: "Newton's Second Law",
            formula: "F = ma",
            description: "Force equals mass times acceleration",
            chapter: "Laws of Motion",
            icon: "⚡"
        },
        {
            name: "Momentum",
            formula: "p = mv",
            description: "Linear momentum is product of mass and velocity",
            chapter: "Laws of Motion",
            icon: "🎯"
        },
        {
            name: "Work Done",
            formula: "W = F·s·cos(θ)",
            description: "Work done by a force at angle θ to displacement",
            chapter: "Work, Energy and Power",
            icon: "💪"
        },
        {
            name: "Kinetic Energy",
            formula: "KE = ½mv²",
            description: "Energy due to motion",
            chapter: "Work, Energy and Power",
            icon: "🔋"
        },
        {
            name: "Potential Energy (Gravitational)",
            formula: "PE = mgh",
            description: "Energy due to height in gravitational field",
            chapter: "Work, Energy and Power",
            icon: "⬆️"
        },
        {
            name: "Power",
            formula: "P = W/t = F·v",
            description: "Rate of doing work",
            chapter: "Work, Energy and Power",
            icon: "⚡"
        },
        {
            name: "Centripetal Force",
            formula: "F = mv²/r = mω²r",
            description: "Force required for circular motion",
            chapter: "Motion in a Plane",
            icon: "🔄"
        },
        {
            name: "Universal Gravitation",
            formula: "F = Gm₁m₂/r²",
            description: "Gravitational force between two masses",
            chapter: "Gravitation",
            icon: "🌍"
        },
        {
            name: "Escape Velocity",
            formula: "vₑ = √(2gR) = √(2GM/R)",
            description: "Minimum velocity to escape Earth's gravity",
            chapter: "Gravitation",
            icon: "🚀"
        },
        {
            name: "Orbital Velocity",
            formula: "v₀ = √(gR) = √(GM/R)",
            description: "Velocity for circular orbit near Earth's surface",
            chapter: "Gravitation",
            icon: "🛰️"
        },
        {
            name: "Time Period of Satellite",
            formula: "T = 2π√(r³/GM)",
            description: "Time for one complete orbit",
            chapter: "Gravitation",
            icon: "⏱️"
        },
        // Waves & Oscillations
        {
            name: "Simple Harmonic Motion",
            formula: "x = A·sin(ωt + φ), ω = 2πf = 2π/T",
            description: "Displacement in SHM",
            chapter: "Oscillations",
            icon: "〰️"
        },
        {
            name: "Time Period of Pendulum",
            formula: "T = 2π√(L/g)",
            description: "Time period of simple pendulum",
            chapter: "Oscillations",
            icon: "🕐"
        },
        {
            name: "Time Period of Spring",
            formula: "T = 2π√(m/k)",
            description: "Time period of mass-spring system",
            chapter: "Oscillations",
            icon: "🔧"
        },
        {
            name: "Wave Velocity",
            formula: "v = fλ = ω/k",
            description: "Velocity relation with frequency and wavelength",
            chapter: "Waves",
            icon: "🌊"
        },
        // Electrostatics
        {
            name: "Coulomb's Law",
            formula: "F = kq₁q₂/r² = q₁q₂/4πε₀r²",
            description: "Force between two point charges",
            chapter: "Electric Charges and Fields",
            icon: "⚡"
        },
        {
            name: "Electric Field",
            formula: "E = F/q = kQ/r²",
            description: "Electric field due to point charge",
            chapter: "Electric Charges and Fields",
            icon: "➡️"
        },
        {
            name: "Electric Potential",
            formula: "V = kQ/r = W/q",
            description: "Electric potential due to point charge",
            chapter: "Electrostatic Potential and Capacitance",
            icon: "🔌"
        },
        {
            name: "Capacitance",
            formula: "C = Q/V, C = ε₀A/d (parallel plate)",
            description: "Capacitance and parallel plate capacitor formula",
            chapter: "Electrostatic Potential and Capacitance",
            icon: "🔋"
        },
        {
            name: "Energy in Capacitor",
            formula: "U = ½CV² = ½QV = Q²/2C",
            description: "Energy stored in capacitor",
            chapter: "Electrostatic Potential and Capacitance",
            icon: "⚡"
        },
        // Current Electricity
        {
            name: "Ohm's Law",
            formula: "V = IR",
            description: "Voltage equals current times resistance",
            chapter: "Current Electricity",
            icon: "🔌"
        },
        {
            name: "Electrical Power",
            formula: "P = VI = I²R = V²/R",
            description: "Power dissipated in a resistor",
            chapter: "Current Electricity",
            icon: "💡"
        },
        {
            name: "Resistors in Series",
            formula: "R = R₁ + R₂ + R₃ + ...",
            description: "Equivalent resistance in series",
            chapter: "Current Electricity",
            icon: "➡️"
        },
        {
            name: "Resistors in Parallel",
            formula: "1/R = 1/R₁ + 1/R₂ + 1/R₃ + ...",
            description: "Equivalent resistance in parallel",
            chapter: "Current Electricity",
            icon: "⬆️"
        },
        // Magnetism
        {
            name: "Magnetic Force on Current",
            formula: "F = BIL·sin(θ)",
            description: "Force on current-carrying conductor",
            chapter: "Moving Charges and Magnetism",
            icon: "🧲"
        },
        {
            name: "Lorentz Force",
            formula: "F = q(v × B) = qvB·sin(θ)",
            description: "Force on moving charge in magnetic field",
            chapter: "Moving Charges and Magnetism",
            icon: "⚡"
        },
        {
            name: "Faraday's Law",
            formula: "ε = -dΦ/dt = -N·dΦ/dt",
            description: "Induced EMF due to changing magnetic flux",
            chapter: "Electromagnetic Induction",
            icon: "🔄"
        },
        // Optics
        {
            name: "Mirror Formula",
            formula: "1/f = 1/v + 1/u",
            description: "Relation between focal length, image and object distance",
            chapter: "Ray Optics and Optical Instruments",
            icon: "🔍"
        },
        {
            name: "Lens Formula",
            formula: "1/f = 1/v - 1/u",
            description: "Thin lens formula",
            chapter: "Ray Optics and Optical Instruments",
            icon: "🔬"
        },
        {
            name: "Magnification",
            formula: "m = -v/u = h'/h",
            description: "Linear magnification",
            chapter: "Ray Optics and Optical Instruments",
            icon: "🔎"
        },
        {
            name: "Snell's Law",
            formula: "n₁·sin(i) = n₂·sin(r)",
            description: "Law of refraction",
            chapter: "Ray Optics and Optical Instruments",
            icon: "↗️"
        },
        {
            name: "Lens Power",
            formula: "P = 1/f (in meters)",
            description: "Power of lens in diopters",
            chapter: "Ray Optics and Optical Instruments",
            icon: "👓"
        },
        // Modern Physics
        {
            name: "Photoelectric Equation",
            formula: "hν = φ + ½mv²max = φ + eV₀",
            description: "Einstein's photoelectric equation",
            chapter: "Dual Nature of Radiation and Matter",
            icon: "☀️"
        },
        {
            name: "de Broglie Wavelength",
            formula: "λ = h/p = h/mv",
            description: "Wavelength associated with matter",
            chapter: "Dual Nature of Radiation and Matter",
            icon: "🌊"
        },
        {
            name: "Bohr's Radius",
            formula: "rₙ = n²a₀ = n² × 0.529 Å",
            description: "Radius of nth orbit in hydrogen atom",
            chapter: "Atoms",
            icon: "⚛️"
        },
        {
            name: "Energy of Electron (H-atom)",
            formula: "Eₙ = -13.6/n² eV",
            description: "Energy of electron in nth orbit",
            chapter: "Atoms",
            icon: "⚡"
        },
        {
            name: "Radioactive Decay",
            formula: "N = N₀e^(-λt), T₁/₂ = 0.693/λ",
            description: "Decay law and half-life",
            chapter: "Nuclei",
            icon: "☢️"
        },
        {
            name: "Mass-Energy Equivalence",
            formula: "E = mc²",
            description: "Einstein's mass-energy relation",
            chapter: "Nuclei",
            icon: "💥"
        }
    ],
    chemistry: [
        // Physical Chemistry
        {
            name: "Mole Concept",
            formula: "n = m/M = N/Nₐ = V/22.4 (at STP)",
            description: "Number of moles calculation",
            chapter: "Some Basic Concepts of Chemistry",
            icon: "⚗️"
        },
        {
            name: "Molarity",
            formula: "M = n/V (mol/L)",
            description: "Moles of solute per liter of solution",
            chapter: "Solutions",
            icon: "🧪"
        },
        {
            name: "Molality",
            formula: "m = n/W (mol/kg)",
            description: "Moles of solute per kg of solvent",
            chapter: "Solutions",
            icon: "⚖️"
        },
        {
            name: "Raoult's Law",
            formula: "p = p₀·x (for ideal solution)",
            description: "Vapor pressure of solution",
            chapter: "Solutions",
            icon: "💨"
        },
        {
            name: "Boiling Point Elevation",
            formula: "ΔTb = Kb·m·i",
            description: "Rise in boiling point of solution",
            chapter: "Solutions",
            icon: "🌡️"
        },
        {
            name: "Freezing Point Depression",
            formula: "ΔTf = Kf·m·i",
            description: "Depression in freezing point",
            chapter: "Solutions",
            icon: "❄️"
        },
        {
            name: "Osmotic Pressure",
            formula: "π = iCRT = inRT/V",
            description: "Osmotic pressure of solution",
            chapter: "Solutions",
            icon: "🔄"
        },
        {
            name: "Ideal Gas Law",
            formula: "PV = nRT",
            description: "Equation of state for ideal gas",
            chapter: "States of Matter",
            icon: "💨"
        },
        {
            name: "First Law of Thermodynamics",
            formula: "ΔU = q + w (or q - w)",
            description: "Energy conservation in thermodynamics",
            chapter: "Thermodynamics",
            icon: "🔥"
        },
        {
            name: "Enthalpy",
            formula: "ΔH = ΔU + PΔV = qp",
            description: "Heat at constant pressure",
            chapter: "Thermodynamics",
            icon: "♨️"
        },
        {
            name: "Gibbs Free Energy",
            formula: "ΔG = ΔH - TΔS",
            description: "Spontaneity criterion",
            chapter: "Thermodynamics",
            icon: "⚡"
        },
        {
            name: "Equilibrium Constant",
            formula: "Kc = [products]^p/[reactants]^r",
            description: "Law of mass action",
            chapter: "Equilibrium",
            icon: "⚖️"
        },
        {
            name: "Henderson-Hasselbalch",
            formula: "pH = pKa + log([salt]/[acid])",
            description: "Buffer pH calculation",
            chapter: "Equilibrium",
            icon: "🧪"
        },
        {
            name: "pH Calculation",
            formula: "pH = -log[H⁺], pOH = -log[OH⁻]",
            description: "Acidity/basicity measurement",
            chapter: "Equilibrium",
            icon: "📊"
        },
        {
            name: "Rate Law (First Order)",
            formula: "k = (2.303/t)·log(a/(a-x))",
            description: "First order rate constant",
            chapter: "Chemical Kinetics",
            icon: "⏱️"
        },
        {
            name: "Half-Life (First Order)",
            formula: "t₁/₂ = 0.693/k",
            description: "Half-life of first order reaction",
            chapter: "Chemical Kinetics",
            icon: "⏱️"
        },
        {
            name: "Arrhenius Equation",
            formula: "k = Ae^(-Ea/RT)",
            description: "Temperature dependence of rate constant",
            chapter: "Chemical Kinetics",
            icon: "🌡️"
        },
        {
            name: "Nernst Equation",
            formula: "E = E° - (0.059/n)·log(Q) at 25°C",
            description: "EMF of electrochemical cell",
            chapter: "Electrochemistry",
            icon: "🔋"
        },
        {
            name: "Faraday's Law",
            formula: "m = ZIt = (MIt)/(nF)",
            description: "Mass deposited in electrolysis",
            chapter: "Electrochemistry",
            icon: "⚡"
        },
        // Inorganic Chemistry
        {
            name: "Coordination Number",
            formula: "CN = Number of ligand atoms bonded to central metal",
            description: "Ligand count around metal ion",
            chapter: "Coordination Compounds",
            icon: "🔗"
        },
        // Organic Chemistry
        {
            name: "Degree of Unsaturation",
            formula: "DBE = (2C + 2 + N - H - X)/2",
            description: "Double bond equivalents",
            chapter: "Organic Chemistry: Basic Principles",
            icon: "🔬"
        }
    ],
    biology: [
        {
            name: "Hardy-Weinberg Equation",
            formula: "p² + 2pq + q² = 1, p + q = 1",
            description: "Allele frequencies in population at equilibrium",
            chapter: "Evolution",
            icon: "🧬"
        },
        {
            name: "Net Primary Productivity",
            formula: "NPP = GPP - R",
            description: "Energy available for consumers",
            chapter: "Ecosystem",
            icon: "🌿"
        },
        {
            name: "Gross Primary Productivity",
            formula: "GPP = NPP + R",
            description: "Total photosynthesis in ecosystem",
            chapter: "Ecosystem",
            icon: "☀️"
        },
        {
            name: "10% Law of Energy Transfer",
            formula: "Energy at level n = (0.1)ⁿ × Producer energy",
            description: "Only 10% energy transfers to next trophic level",
            chapter: "Ecosystem",
            icon: "🔋"
        },
        {
            name: "Heart Rate",
            formula: "CO = SV × HR (Cardiac Output)",
            description: "Cardiac output = Stroke volume × Heart rate",
            chapter: "Body Fluids and Circulation",
            icon: "❤️"
        },
        {
            name: "Respiratory Quotient",
            formula: "RQ = CO₂ evolved / O₂ consumed",
            description: "RQ varies: Carbohydrates = 1, Fats = 0.7, Proteins = 0.8",
            chapter: "Respiration in Plants",
            icon: "🫁"
        },
        {
            name: "GFR (Glomerular Filtration Rate)",
            formula: "GFR ≈ 125 mL/min or 180 L/day",
            description: "Blood filtered by kidneys per unit time",
            chapter: "Excretory Products and their Elimination",
            icon: "🔬"
        },
        {
            name: "Photosynthesis Equation",
            formula: "6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O",
            description: "Overall equation for photosynthesis",
            chapter: "Photosynthesis in Higher Plants",
            icon: "🌱"
        },
        {
            name: "Cellular Respiration",
            formula: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38ATP",
            description: "Complete oxidation of glucose (theoretical)",
            chapter: "Respiration in Plants",
            icon: "⚡"
        },
        {
            name: "Mendelian Ratios",
            formula: "Monohybrid: 3:1, Dihybrid: 9:3:3:1",
            description: "Phenotypic ratios in F2 generation",
            chapter: "Principles of Inheritance and Variation",
            icon: "🧬"
        },
        {
            name: "DNA Replication",
            formula: "5' → 3' (leading), 3' → 5' (lagging, Okazaki)",
            description: "Direction of DNA synthesis",
            chapter: "Molecular Basis of Inheritance",
            icon: "🔄"
        },
        {
            name: "Genetic Code",
            formula: "64 codons, 61 sense + 3 stop (UAA, UAG, UGA)",
            description: "Triplet code for amino acids",
            chapter: "Molecular Basis of Inheritance",
            icon: "📝"
        },
        {
            name: "Population Growth",
            formula: "dN/dt = rN (exponential), dN/dt = rN(K-N)/K (logistic)",
            description: "Exponential and logistic growth equations",
            chapter: "Organisms and Populations",
            icon: "📈"
        },
        {
            name: "Carrying Capacity",
            formula: "K = Maximum population environment can support",
            description: "Upper limit of population growth",
            chapter: "Organisms and Populations",
            icon: "🏠"
        }
    ]
};
