import React from 'react';
import { Link } from 'react-router-dom';
import { blogsData } from '../data/blogs';

const FeaturedBlogsSection = () => {
  const featuredBlogs = blogsData.slice(0, 3);

  return (
    <section id="featured-blogs" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12 scroll-reveal">
          <div>
            <span className="toon-pill bg-sky"><span>📜</span> Lore</span>
            <h2 className="font-display text-5xl md:text-6xl text-ink mt-3">Field Notes</h2>
          </div>
          <Link to="/blog" className="toon-btn toon-btn--ghost text-sm py-2.5 px-5">
            All posts ↗
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredBlogs.map((blog, index) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="slab group p-6 flex flex-col scroll-reveal"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="toon-pill bg-meadow text-white">{blog.category}</span>
                <span className="font-mono text-xs text-ink/50">{blog.readTime}</span>
              </div>
              <h3 className="font-display text-xl text-ink group-hover:text-meadow-deep transition-colors mb-2 leading-snug">
                {blog.title}
              </h3>
              <p className="text-ink/65 leading-relaxed line-clamp-3 font-semibold text-sm flex-grow">
                {blog.description}
              </p>
              <span className="mt-4 font-display text-meadow-deep text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read it →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogsSection;
