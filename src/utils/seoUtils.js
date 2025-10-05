export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const internalLinks = {
  home: { path: '/', title: 'Home - Jainish Gupta Portfolio' },
  projects: { path: '/#projects', title: 'Projects - Fintech & Backend Systems' },
  about: { path: '/#about', title: 'About - CTO & Backend Developer' },
  contact: { path: '/#contact', title: 'Contact - Hire Node.js Developer' },
  blog: { path: '/blog', title: 'Blog - Node.js & MongoDB Tutorials' },
  resume: { path: '/resume.pdf', title: 'Resume - Jainish Gupta' }
};
