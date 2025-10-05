export const generateProjectSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": project.title,
  "description": project.description,
  "applicationCategory": "WebApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "@id": "https://jainish.space/#person",
    "name": "Jainish Gupta"
  },
  "creator": {
    "@type": "Person",
    "@id": "https://jainish.space/#person"
  },
  "programmingLanguage": project.technologies || [],
  "url": project.liveUrl || "https://jainish.space/",
  "codeRepository": project.github || "",
  "dateCreated": project.date || new Date().toISOString(),
  "keywords": project.technologies?.join(', ') || ""
});

export const generateCreativeWorkSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.description,
  "author": {
    "@type": "Person",
    "@id": "https://jainish.space/#person",
    "name": "Jainish Gupta"
  },
  "creator": {
    "@type": "Person",
    "@id": "https://jainish.space/#person"
  },
  "datePublished": project.date || new Date().toISOString(),
  "keywords": project.technologies?.join(', ') || "",
  "url": "https://jainish.space/#projects"
});
