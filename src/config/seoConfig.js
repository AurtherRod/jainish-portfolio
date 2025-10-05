// SEO Configuration for all pages
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

// Schema markup templates
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
