import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogsData } from '../data/blogs';

const BlogArticle = () => {
  const { id } = useParams();
  const blog = blogsData.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-300 mb-4">Blog Not Found</h1>
          <Link to="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderInlineFormatting = (text) => {
    const parts = [];
    let currentIndex = 0;
    
    // Find all bold text patterns
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the bold part
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }
      
      // Add the bold part
      parts.push(<strong key={match.index} className="font-bold text-blue-300">{match[1]}</strong>);
      
      currentIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }
    
    return parts.length > 1 ? parts : text;
  };

  const renderContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      if (line.startsWith('```')) {
        // Handle code blocks
        const language = line.substring(3);
        i++;
        const codeLines = [];
        
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        
        elements.push(
          <div key={i} className="my-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                {language || 'code'}
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-green-400 text-sm">{codeLines.join('\n')}</code>
              </pre>
            </div>
          </div>
        );
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{line.substring(2)}</h1>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-3xl font-bold mb-4 text-blue-400 mt-8">{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-2xl font-bold mb-3 text-gray-300 mt-6">{line.substring(4)}</h3>);
      } else if (line.startsWith('#### ')) {
        elements.push(<h4 key={i} className="text-xl font-bold mb-2 text-gray-400 mt-4">{line.substring(5)}</h4>);
      } else if (line.startsWith('- ')) {
        const content = renderInlineFormatting(line.substring(2));
        elements.push(<li key={i} className="text-gray-300 mb-1 ml-4 list-disc">{content}</li>);
      } else if (/^\d+\. /.test(line)) {
        // Handle numbered lists
        const match = line.match(/^(\d+)\. (.*)/);
        if (match) {
          const content = renderInlineFormatting(match[2]);
          elements.push(<li key={i} className="text-gray-300 mb-1 ml-4 list-decimal">{content}</li>);
        }
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="mb-4"></div>);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(<p key={i} className="text-gray-300 mb-4 leading-relaxed font-bold">{line.substring(2, line.length - 2)}</p>);
      } else {
        const content = renderInlineFormatting(line);
        elements.push(<p key={i} className="text-gray-300 mb-4 leading-relaxed">{content}</p>);
      }
      
      i++;
    }
    
    return elements;
  };

  return (
    <div className="min-h-screen pt-20">
      <article className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
            ← Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
              {blog.category}
            </span>
            <span className="text-gray-500 text-sm">{blog.readTime}</span>
            <time className="text-gray-500 text-sm">{formatDate(blog.date)}</time>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {blog.title}
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">{blog.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span key={index} className="tech-tag text-blue-300 text-sm font-medium px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed space-y-4">
            {renderContent(blog.content)}
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-700">
          <Link to="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium">
            ← Back to All Articles
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogArticle;