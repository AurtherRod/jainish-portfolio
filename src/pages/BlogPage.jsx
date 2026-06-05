import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../services/api';
import { blogsData } from '../data/blogs';
import SEO from '../components/SEO';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingStatic, setUsingStatic] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const result = await fetchBlogs();
      setBlogs(result.data.blogs);
    } catch (err) {
      console.error('Failed to load blogs from API, using static data:', err);
      // Fallback to static blog data
      setBlogs(blogsData.map(b => ({
        _id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.description,
        category: b.category,
        tags: b.tags,
        readTime: parseInt(b.readTime) || 10,
        publishedAt: b.date,
      })));
      setUsingStatic(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-meadow border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Engineering Blog | Jainish Gupta - Software Engineer"
        description="Engineering write-ups on backend systems, architecture, and lessons from building real-world software."
        keywords={['Software Engineering', 'Backend', 'Node.js', 'System Design', 'Architecture', 'Technical Blog']}
      />
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Page header inside a card for readability */}
        <div className="slab p-8 md:p-10 mb-8">
          <Link to="/" className="inline-flex items-center text-meadow-deep hover:text-meadow font-semibold mb-5 transition-colors text-sm">
            ← Back to Portfolio
          </Link>
          <span className="toon-pill bg-sky mb-4 block w-fit"><span>📜</span> Field Notes</span>
          <h1 className="font-display text-4xl md:text-5xl text-ink mt-2 mb-3">
            Engineering <span className="text-meadow-deep">Blog</span>
          </h1>
          <p className="text-ink/70 max-w-2xl font-semibold">
            Write-ups on backend systems, architecture, and lessons learned building real-world software.
          </p>
        </div>

        {/* Write for Hire CTA */}
        <div className="slab bg-sun/20 p-6 md:p-8 mb-10">
          <h3 className="font-display text-2xl text-ink mb-2">Write for Hire ✍️</h3>
          <p className="text-ink/70 mb-5 font-semibold">
            Need technical articles for your engineering team? I write in-depth content on backend systems, architecture, and game development.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="mailto:jainishgupta2000@gmail.com?subject=Technical Writing Inquiry" className="toon-btn text-sm">
              Get in Touch
            </a>
            <a href="https://www.linkedin.com/in/jainish-gupta/" target="_blank" rel="noreferrer" className="toon-btn toon-btn--ghost text-sm">
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.length === 0 ? (
            <div className="col-span-2 slab text-center py-12">
              <p className="text-ink/60 text-lg font-semibold">No blogs published yet. Check back soon!</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="slab group block overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 gap-3">
                    <span className="toon-pill bg-meadow text-white whitespace-nowrap">
                      {blog.category}
                    </span>
                    <span className="text-ink/45 text-xs font-mono whitespace-nowrap">{blog.readTime} min</span>
                  </div>

                  <h2 className="font-display text-xl text-ink mb-2 group-hover:text-meadow-deep transition-colors leading-snug">
                    {blog.title}
                  </h2>

                  <p className="text-ink/70 mb-4 leading-relaxed font-semibold text-sm line-clamp-3">{blog.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <time className="text-ink/45 text-xs font-mono">{formatDate(blog.publishedAt || blog.createdAt)}</time>
                    <span className="text-meadow-deep text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">Read →</span>
                  </div>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {blog.tags.slice(0, 4).map((tag, index) => (
                        <span key={index} className="tech-tag px-2 py-0.5 rounded-full text-[0.65rem]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
