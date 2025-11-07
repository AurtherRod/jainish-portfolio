import React from 'react';
import { Link } from 'react-router-dom';
import { blogsData } from '../data/blogs';
import SEO from '../components/SEO';

const BlogPage = () => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Unity Game Development Blog | Jainish Gupta - C# & Unity Expert"
        description="Unity game development tutorials, C# programming guides, and technical insights. Learn vehicle physics, custom editor tools, procedural generation, and game optimization."
        keywords={['Unity', 'Game Development', 'C#', 'Unity Tutorial', 'Vehicle Physics', 'Editor Scripting', 'Procedural Generation', 'Game Optimization', 'Technical Blog']}
      />
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors">
            ← Back to Portfolio
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Unity Game <span className="neon-accent">Development</span> Blog</h1>
          <p className="text-xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
            Unity game development tutorials, C# programming guides, and technical insights from building games and simulators.
          </p>
          
          {/* Write for Hire Callout */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-400/30 rounded-2xl p-6 max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-bold mb-3 text-blue-300">Write for Hire</h3>
            <p className="text-gray-300 mb-4">
              Need technical articles, tutorials, or guides for your game development team? I create in-depth content on Unity, C#, game mechanics, and optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:jainishgupta2000@gmail.com?subject=Technical Writing Inquiry" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-full transition-colors">
                Get in Touch
              </a>
              <a href="https://www.linkedin.com/in/jainish-gupta/" target="_blank" rel="noreferrer" className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 font-semibold px-6 py-2 rounded-full transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogsData.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`} className="card-hover rounded-2xl overflow-hidden group block">
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
                
                {/* Real-world problems/solutions summary */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm italic">
                    {blog.id === 10 ? "Master Unity 2D Tilemaps with advanced auto-tiling, procedural generation, and runtime tile updates." :
                     blog.id === 6 ? "Deep dive into custom Unity vehicle physics with ScriptableObjects and G29/G27 hardware integration." :
                     blog.id === 5 ? "Build custom Unity editor tools and level generators to automate repetitive development tasks." :
                     "Real-world Unity game development solutions and technical insights."}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <time className="text-gray-400 text-sm">{formatDate(blog.date)}</time>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {blog.tags.filter(tag => ['Unity', 'C#', 'Game Development', 'Vehicle Physics', 'Editor Scripting', 'Level Design', 'Tilemap', 'ScriptableObjects'].includes(tag) || blog.tags.indexOf(tag) < 4).map((tag, index) => (
                    <span key={index} className="tech-tag text-blue-300 text-sm font-medium px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;