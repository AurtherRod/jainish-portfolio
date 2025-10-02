# Resume Setup Instructions

## Adding Your Resume PDF

To enable the "Download Resume" functionality on your portfolio:

1. **Create your resume PDF** with the filename: `resume.pdf`

2. **Place the file** in the `public` folder:
   ```
   jainish-portfolio/
   └── public/
       └── resume.pdf
   ```

3. **Recommended Resume Filename**: The download will be named `Jainish_Gupta_Backend_Developer_Resume.pdf` automatically.

## Resume Content Recommendations for Backend Roles

Your resume should highlight:

- **Backend Technologies**: Node.js, Express.js, MongoDB, REST APIs, Microservices
- **DevOps Skills**: AWS, Docker, Nginx, PM2, CI/CD
- **Quantifiable Achievements**: 
  - 1000+ daily transactions processed
  - 99.9% uptime maintained
  - 500+ institutions supported
- **Leadership Experience**: CTO roles, team management
- **Technical Writing**: Link to your blog articles

## Testing

After adding the resume.pdf file:
1. Restart your development server
2. Click any "Download Resume" button
3. Verify the file downloads correctly

## Alternative: External Resume Link

If you prefer to host your resume externally (e.g., Google Drive, Dropbox):

Replace `/resume.pdf` with your external URL in these files:
- `src/components/HeroSection.jsx`
- `src/components/ContactSection.jsx`
- `src/components/Footer.jsx`

Example:
```jsx
href="https://drive.google.com/file/d/YOUR_FILE_ID/view"
```
