// SEO Configuration for all pages
export const seoConfig = {
  home: {
    title: "Jainish Gupta | Full-Stack Software Engineer & Unity Developer",
    description: "Versatile Software Engineer specializing in Node.js/React enterprise backends (1000+ daily tx) and Unity C# game development. Available for full-time roles.",
    keywords: ['Full-stack developer', 'Unity developer', 'Node.js expert', 'React developer', 'C# programmer', 'backend architect', 'game programmer', 'AWS developer', 'Pune software engineer']
  },

  projects: {
    title: "Projects - Jainish Gupta | Web Systems & Game Development",
    description: "Explore a dual portfolio by Jainish Gupta: Enterprise fintech backends (Trustopay) and interactive Unity 2D/3D game development projects.",
    keywords: ['React projects', 'Unity games', 'Node.js backend', 'C# game development', 'fintech systems', 'multiplayer architecture', 'game design']
  },

  about: {
    title: "About Jainish Gupta | Web Architect & Game Programmer",
    description: "Software Engineer bridging enterprise web architecture (Node/React/AWS) with interactive media and game development (Unity/C#).",
    keywords: ['Software engineer', 'backend developer', 'Unity 3D developer', 'Node.js specialist', 'React expert', 'game systems engineer', 'technical educator']
  },

  contact: {
    title: "Contact Jainish Gupta | Hire for Web or Game Development",
    description: "Get in touch with Jainish Gupta for enterprise full-stack development (React/Node) or Unity game programming opportunities.",
    keywords: ['hire Node.js developer', 'hire Unity developer', 'game programmer contact', 'full-stack engineer', 'backend developer available']
  },

  blog: {
    title: "Blog - Jainish Gupta | Web Architecture & Game Dev Insights",
    description: "Technical articles on Node.js scaling, React UI, AWS deployment, and Unity C# game development tutorials by Jainish Gupta.",
    keywords: ['Node.js tutorials', 'Unity C# guides', 'game development blog', 'backend architecture', 'full-stack insights']
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
    "jobTitle": ["Software Engineer", "Lead Full-Stack Developer", "Unity Game Developer"],
    "description": "Software Engineer with 3+ years of experience building secure fintech systems (Node.js/React) and interactive experiences (Unity/C#).",
    "url": "https://jainish.space/",
    "image": "https://jainish.space/Images/favicon.png",
    "sameAs": [
      "https://www.linkedin.com/in/jainish-gupta/",
      "https://github.com/AurtherRod"
    ],
    "knowsAbout": [
      "React.js", "Node.js", "Express.js", "MongoDB", "AWS",
      "Unity 2D/3D", "C#", "Game Design", "Microservices", "System Architecture"
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
    "name": "Jainish Gupta - Software & Game Developer Portfolio",
    "description": "Portfolio showcasing Enterprise Web Systems (Node.js/React) and Game Development (Unity/C#) by Jainish Gupta",
    "publisher": {
      "@type": "Person",
      "@id": "https://jainish.space/#person"
    },
    "inLanguage": "en-US"
  }
};