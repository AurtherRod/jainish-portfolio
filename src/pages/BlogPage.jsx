import React from 'react';
import { Link } from 'react-router-dom';
import { blogsData } from '../data/blogs';
import { useScrollReveal } from '../hooks/useScrollReveal';

const BlogPage = () => {
  useScrollReveal();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 scroll-reveal">
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
            ← Back to Portfolio
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">My <span className="neon-accent">Blog</span></h1>
          <p className="text-xl text-gray-400">Thoughts, tutorials, and insights from my development journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog) => (
            <article key={blog.id} className="card-hover rounded-2xl overflow-hidden scroll-reveal group" style={{transitionDelay: blog.delay}}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                  <span className="text-gray-500 text-sm">{blog.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                  {blog.title}
                </h2>
                
                <p className="text-gray-300 mb-4 leading-relaxed">{blog.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <time className="text-gray-400 text-sm">{formatDate(blog.date)}</time>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="tech-tag text-blue-300 text-sm font-medium px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;