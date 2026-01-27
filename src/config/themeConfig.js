/**
 * Central Configuration File for the Portfolio
 * Contains: Theme, SEO, Page Metadata, Keywords, and Content Calendar
 */

// ============================================
// THEME CONFIGURATION
// ============================================
export const themeConfig = {
  // Primary colors
  primary: '#64C8FF', // Neon cyan
  secondary: '#9D4EDD', // Purple
  accent: '#FF6B35', // Orange

  // Dark theme (main theme)
  background: {
    primary: '#0f0f23',
    secondary: '#1a1a2e',
    tertiary: '#16213e',
    card: 'rgba(15, 15, 35, 0.6)',
    cardHover: 'rgba(15, 15, 35, 0.8)',
  },

  text: {
    primary: '#E5E7EB',
    secondary: '#9CA3AF',
    dark: '#1F2937',
    light: '#FFFFFF',
  },

  // Tailwind class utilities
  classes: {
    // Background
    bgPrimary: 'bg-slate-950',
    bgSecondary: 'bg-slate-900',
    bgCard: 'bg-slate-900/60',
    
    // Text
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-400',
    textLight: 'text-white',
    
    // Borders
    borderGlass: 'border border-cyan-500/20',
    borderHover: 'border border-cyan-500/50',
    
    // Common components
    linkPrimary: 'text-cyan-400 hover:text-cyan-300 transition-colors',
    linkSecondary: 'text-gray-400 hover:text-gray-200 transition-colors',
    
    // Cards
    card: 'bg-slate-900/60 border border-cyan-500/20 backdrop-blur-sm',
    cardHover: 'hover:bg-slate-900/80 hover:border-cyan-500/50',
    
    // Buttons
    buttonPrimary: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white',
    buttonSecondary: 'border border-cyan-500/50 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300',
  },

  // Glass effect
  glass: 'bg-slate-900/80 backdrop-filter backdrop-blur-lg border border-cyan-500/20',

  // Shadow effects
  neonShadow: 'shadow-lg shadow-cyan-500/20',
  cardShadow: 'shadow-xl shadow-cyan-500/10',

  // Gradients
  gradientPrimary: 'bg-gradient-to-r from-cyan-500 to-purple-600',
  gradientAccent: 'bg-gradient-to-r from-purple-600 to-pink-600',
};

// ============================================
// SEO CONFIGURATION
// ============================================
export const seoConfig = {
  home: {
    title: "Jainish Gupta - CTO & Node.js Developer | Fintech Backend Specialist",
    description: "CTO at Trustopay | Node.js & MongoDB specialist building secure fintech systems. 3+ years architecting scalable backends processing 1000+ daily transactions.",
    keywords: ['Node.js developer', 'MongoDB specialist', 'CTO', 'fintech developer', 'backend architect', 'microservices expert', 'REST APIs', 'AWS developer', 'Docker', 'system design']
  },
  
  projects: {
    title: "Projects - Jainish Gupta | Fintech & Backend Systems",
    description: "Explore fintech and backend projects by Jainish Gupta: Trustopay (1000+ daily transactions), Class & Class (500+ institutions), and scalable Node.js systems.",
    keywords: ['fintech projects', 'Node.js projects', 'escrow platform', 'backend systems', 'MongoDB applications', 'microservices architecture']
  },
  
  about: {
    title: "About Jainish Gupta - CTO & Backend Developer",
    description: "CTO at Trustopay with 3+ years building secure fintech backends. Expert in Node.js, MongoDB, AWS, Docker, and microservices architecture.",
    keywords: ['backend developer', 'CTO experience', 'Node.js expert', 'MongoDB developer', 'AWS architect', 'fintech CTO']
  },
  
  contact: {
    title: "Contact Jainish Gupta - Available for Backend Development",
    description: "Get in touch with Jainish Gupta for Node.js backend development, fintech consulting, or CTO advisory. Open to freelance and full-time opportunities.",
    keywords: ['hire Node.js developer', 'backend developer contact', 'fintech consultant', 'CTO advisory', 'MongoDB expert']
  },
  
  blog: {
    title: "Blog - Jainish Gupta | Node.js, MongoDB & Backend Development",
    description: "Technical articles on Node.js, MongoDB, AWS, microservices, and backend architecture by CTO Jainish Gupta. Real-world fintech and system design insights.",
    keywords: ['Node.js tutorials', 'MongoDB guides', 'backend development blog', 'microservices articles', 'AWS deployment', 'fintech engineering']
  }
};

// ============================================
// SCHEMA MARKUP TEMPLATES (Structured Data)
// ============================================
export const schemaTemplates = {
  person: {
    "@type": "Person",
    "@id": "https://jainish.space/#person",
    "name": "Jainish Gupta",
    "givenName": "Jainish",
    "familyName": "Gupta",
    "jobTitle": ["Chief Technology Officer", "Software Developer", "Backend Architect"],
    "description": "CTO and Co-founder at Trustopay with 3+ years of experience building secure, scalable fintech systems using Node.js, MongoDB, and AWS.",
    "url": "https://jainish.space/",
    "image": "https://jainish.space/Images/favicon.png",
    "sameAs": [
      "https://www.linkedin.com/in/jainish-gupta/",
      "https://github.com/AurtherRod"
    ],
    "knowsAbout": [
      "Node.js", "Express.js", "MongoDB", "REST APIs", "Microservices", 
      "AWS", "Docker", "System Architecture", "Fintech", "Backend Development"
    ],
    "worksFor": {
      "@type": "Organization",
      "@id": "https://jainish.space/#trustopay"
    }
  },
  
  organization: {
    "@type": "Organization",
    "@id": "https://jainish.space/#trustopay",
    "name": "Trustopay Innovations Pvt. Ltd.",
    "description": "India's secure escrow platform for online transactions, processing 1000+ daily transactions with 99.9% uptime.",
    "url": "https://trustopay.in",
    "founder": {
      "@type": "Person",
      "@id": "https://jainish.space/#person"
    },
    "industry": "Fintech",
    "numberOfEmployees": "10-50"
  },
  
  website: {
    "@type": "WebSite",
    "@id": "https://jainish.space/#website",
    "url": "https://jainish.space/",
    "name": "Jainish Gupta - Software Developer Portfolio",
    "description": "Portfolio showcasing Node.js, MongoDB, and AWS projects by CTO Jainish Gupta",
    "publisher": {
      "@type": "Person",
      "@id": "https://jainish.space/#person"
    },
    "inLanguage": "en-US"
  }
};

// ============================================
// TARGET KEYWORDS
// ============================================
export const targetKeywords = {
  primary: [
    "Node.js developer",
    "backend developer",
    "MongoDB specialist",
    "CTO",
    "fintech developer"
  ],
  
  longTail: [
    "Node.js backend developer for hire",
    "MongoDB database architect",
    "fintech developer India",
    "microservices expert",
    "REST API developer",
    "AWS solutions architect",
    "Docker container specialist",
    "Node.js performance optimization",
    "database design expert",
    "system architecture designer"
  ],
  
  location: [
    "Node.js developer India",
    "backend developer Mumbai",
    "CTO Bangalore"
  ]
};

// ============================================
// CONTENT CALENDAR
// ============================================
export const contentCalendar = [
  { month: "Jan", title: "Building Scalable Node.js Applications with Microservices", keywords: ["Node.js", "microservices"] },
  { month: "Feb", title: "MongoDB Optimization: Indexing and Query Performance", keywords: ["MongoDB", "database optimization"] },
  { month: "Mar", title: "Secure Payment Processing with Node.js and Fintech APIs", keywords: ["payment processing", "Node.js"] },
  { month: "Apr", title: "Docker Containerization: Deploy Node.js Apps Efficiently", keywords: ["Docker", "deployment"] },
  { month: "May", title: "AWS Architecture: Building Resilient Backend Systems", keywords: ["AWS", "cloud architecture"] },
  { month: "Jun", title: "REST API Design: Best Practices and Common Pitfalls", keywords: ["REST API", "API design"] },
  { month: "Jul", title: "Database Scaling Strategies for High-Traffic Applications", keywords: ["database scaling", "performance"] },
  { month: "Aug", title: "CI/CD Pipelines: Automated Testing and Deployment with Node.js", keywords: ["CI/CD", "automation"] },
  { month: "Sep", title: "Authentication and Authorization in Modern Web Apps", keywords: ["authentication", "security"] },
  { month: "Oct", title: "Real-time Data Processing with WebSockets and Node.js", keywords: ["WebSockets", "real-time"] },
  { month: "Nov", title: "Monitoring and Logging: Observability in Production Systems", keywords: ["monitoring", "logging"] },
  { month: "Dec", title: "2024 in Review: Top Backend Development Trends", keywords: ["backend trends", "development"] }
];

// ============================================
// PAGE METADATA
// ============================================
export const pageMetadata = {
  homepage: {
    title: "Jainish Gupta - CTO & Node.js Developer | Fintech Backend Specialist",
    description: "CTO at Trustopay with 3+ years building secure fintech backends using Node.js and MongoDB. Processing 1000+ daily transactions with 99.9% uptime.",
    keywords: ["CTO", "Node.js developer", "backend specialist", "fintech developer"]
  },
  
  projects: {
    title: "Backend Projects - Jainish Gupta | Trustopay, Class & Class",
    description: "Explore fintech projects: Trustopay (escrow platform, 1000+ daily transactions), Class & Class (500+ institutions). Built with Node.js, MongoDB, AWS.",
    keywords: ["backend projects", "fintech systems", "Node.js projects"]
  },
  
  about: {
    title: "About Jainish Gupta - CTO & Backend Developer",
    description: "CTO at Trustopay with expertise in Node.js, MongoDB, AWS, microservices, and system architecture. 3+ years building scalable fintech backends.",
    keywords: ["CTO", "backend developer", "system architect"]
  }
};

export default themeConfig;
