import React from 'react';

const BlogPDFDownload = ({ blogTitle, blogId }) => {
  const handleDownloadPDF = () => {
    // Simple implementation - in a real app, you'd generate actual PDFs
    const content = `
Backend Engineering Blog - ${blogTitle}

This article demonstrates expertise in:
- Node.js backend development
- System architecture and design
- Production deployment strategies
- Database optimization
- Security best practices

For the full interactive article, visit: 
https://jainishgupta.dev/blog/${blogId}

Contact: jainishgupta2000@gmail.com
LinkedIn: https://www.linkedin.com/in/jainish-gupta/
GitHub: https://github.com/AurtherRod
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${blogTitle.replace(/[^a-zA-Z0-9]/g, '_')}_JainishGupta.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>Download for Recruiters</span>
    </button>
  );
};

export default BlogPDFDownload;