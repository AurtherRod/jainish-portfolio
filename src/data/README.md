# Blog Data Documentation

This document explains the structure and format for adding blog articles to the portfolio.

## Blog Data Structure

Each blog article in `blogs.js` follows this structure:

```javascript
{
  id: number,              // Unique identifier for the blog post
  title: string,           // Blog post title (displayed in cards and article page)
  description: string,     // Short description (displayed in blog cards)
  date: string,           // Publication date in YYYY-MM-DD format
  readTime: string,       // Estimated reading time (e.g., "8 min read")
  category: string,       // Blog category (displayed as badge)
  tags: string[],         // Array of technology/topic tags
  delay: string,          // Animation delay for scroll reveal (e.g., "200ms")
  content: string         // Full article content in markdown-like format
}
```

## Content Formatting Guide

The `content` field supports the following markdown-like syntax:

### Headings
```
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
#### Sub-subsection Title (H4)
```

### Paragraphs
Regular text paragraphs are separated by empty lines:
```
This is a paragraph.

This is another paragraph.
```

### Lists
Use bullet points with `- ` prefix:
```
- First item
- Second item
- Third item
```

### Code Blocks
Wrap code in triple backticks with optional language specification:
````
```javascript
const example = "This is JavaScript code";
console.log(example);
```

```csharp
public class Example 
{
    public string Message { get; set; }
}
```
````

### Bold Text
Wrap text in double asterisks:
```
**This text will be bold**
```

### Empty Lines
Use empty lines to create spacing between sections.

## Example Blog Entry

```javascript
{
  id: 4,
  title: "Introduction to TypeScript",
  description: "Learn the basics of TypeScript and how it can improve your JavaScript development experience.",
  date: "2024-01-20",
  readTime: "6 min read",
  category: "TypeScript",
  tags: ["TypeScript", "JavaScript", "Web Development"],
  delay: "0ms",
  content: `# Introduction to TypeScript

TypeScript is a powerful superset of JavaScript that adds static typing to the language.

## Why Use TypeScript?

TypeScript offers several advantages:

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Improved Code Documentation**: Types serve as documentation

### Basic Types

Here are some basic TypeScript types:

```typescript
// Basic types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Objects
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
```

## Functions

TypeScript allows you to specify parameter and return types:

```typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a: number, b: number): number => a + b;
```

## Conclusion

TypeScript enhances JavaScript development by providing type safety and better tooling support.`
}
```

## Adding New Blog Posts

1. **Create the blog object** following the structure above
2. **Add it to the `blogsData` array** in `blogs.js`
3. **Use a unique ID** (increment from the last blog post)
4. **Format the content** using the markdown-like syntax
5. **Test the blog post** by navigating to `/blog` and clicking on your new post

## Content Guidelines

### Writing Style
- Use clear, concise language
- Break content into digestible sections
- Include practical examples and code snippets
- Provide actionable insights

### Technical Content
- Include relevant code examples
- Explain complex concepts step by step
- Use proper syntax highlighting by specifying language in code blocks
- Test all code examples before publishing

### SEO Considerations
- Use descriptive titles and descriptions
- Include relevant tags for discoverability
- Structure content with proper headings
- Keep descriptions under 160 characters for better display

## File Structure

```
src/
├── data/
│   ├── blogs.js          # Blog data array
│   ├── README.md         # This documentation file
│   ├── projects.js       # Project data
│   └── experience.js     # Experience data
├── pages/
│   ├── BlogPage.jsx      # Blog listing page
│   └── BlogArticle.jsx   # Individual blog article page
└── components/
    └── Header.jsx        # Navigation with blog link
```

## Styling Classes Available

The blog system uses these CSS classes for consistent styling:

- `card-hover` - Hover effects for blog cards
- `neon-accent` - Gradient text effect
- `tech-tag` - Styling for technology tags
- `glass-effect` - Glassmorphism background effect
- `neon-border` - Glowing border effect

## Best Practices

1. **Keep IDs sequential** - Use 1, 2, 3, etc.
2. **Use consistent date format** - Always use YYYY-MM-DD
3. **Optimize content length** - Aim for 5-15 minute read times
4. **Include relevant tags** - Help users find related content
5. **Test on mobile** - Ensure content displays well on all devices
6. **Proofread content** - Check for typos and formatting issues

## Troubleshooting

### Common Issues

1. **Blog not displaying**: Check that the ID is unique and the object is properly formatted
2. **Code blocks not rendering**: Ensure you're using triple backticks (```) 
3. **Styling issues**: Verify you're using the correct markdown syntax
4. **Navigation errors**: Make sure the blog ID matches the route parameter

### Debugging Tips

- Check the browser console for JavaScript errors
- Verify the blog data structure matches the expected format
- Test individual components in isolation
- Use React Developer Tools to inspect component props