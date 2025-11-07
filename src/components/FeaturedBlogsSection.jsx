import React from 'react';
import { Link } from 'react-router-dom';
import { blogsData } from '../data/blogs';

const FeaturedBlogsSection = () => {
  // Select featured Unity/Game Dev focused blog posts
  const featuredBlogs = blogsData.filter(blog => 
    blog.tags.some(tag => ['Unity', 'C#', 'Game Development', 'Vehicle Physics', 'Editor Scripting', 'Level Design'].includes(tag))
  ).slice(0, 3);

  return (
    <section id="featured-blogs" className="py-20 md:py-32 border-t-2 border-purple-400/20 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-block bg-purple-500/10 px-4 py-1 rounded-full mb-4">
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Technical Blog</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="neon-accent">Articles</span></h2>
          <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed">
            Unity game development tutorials, C# programming guides, and technical insights from building games and simulators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBlogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`} className="card-hover rounded-2xl overflow-hidden group block scroll-reveal" style={{transitionDelay: blog.delay}}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-blue-500/30 backdrop-blur-sm border border-blue-400/50 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                  <span className="text-gray-500 text-sm">{blog.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300 line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-300 mb-3 leading-relaxed text-sm line-clamp-3">
                  {blog.description}
                </p>
                
                {/* Short summary for quick scanning */}
                <p className="text-gray-400 text-xs italic mb-4 line-clamp-2">
                  {blog.id === 10 ? "Master Unity 2D Tilemaps with advanced auto-tiling, procedural generation, and runtime tile updates." :
                   blog.id === 6 ? "Deep dive into custom Unity vehicle physics with ScriptableObjects and G29/G27 hardware integration." :
                   blog.id === 5 ? "Build custom Unity editor tools and level generators to automate repetitive development tasks." :
                   "Real-world Unity game development solutions and technical insights."}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.filter(tag => ['Unity', 'C#', 'Game Development', 'Vehicle Physics', 'Editor Scripting', 'Level Design', 'Tilemap', 'ScriptableObjects'].includes(tag)).slice(0, 3).map((tag, index) => (
                    <span key={index} className="tech-tag text-blue-300 text-xs font-medium px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                  Read Article →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center scroll-reveal">
          <Link 
            to="/blog" 
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-3 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 neon-shadow"
            aria-label="View all blog articles"
          >
            View All Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogsSection;