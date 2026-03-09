# UI Component Library

Reusable, gaming-themed UI components for the portfolio.

## Components

### Card

Flexible card component with multiple variants and hover effects.

**Props:**
- `children` (node, required): Card content
- `variant` (string): 'default' | 'game' | 'blog' | 'glass'
- `className` (string): Additional CSS classes
- `hover` (boolean): Enable hover effects (default: true)
- `onClick` (function): Click handler

**Usage:**
```jsx
import { Card } from './components/ui';

<Card variant="game" hover={true}>
  <h3>Project Title</h3>
  <p>Project description</p>
</Card>
```

---

### Button

Versatile button component with multiple variants and sizes.

**Props:**
- `children` (node, required): Button content
- `variant` (string): 'primary' | 'secondary' | 'outline' | 'ghost'
- `size` (string): 'sm' | 'md' | 'lg'
- `className` (string): Additional CSS classes
- `href` (string): Link URL (renders as <a>)
- `download` (string): Download attribute for links
- `onClick` (function): Click handler
- `type` (string): 'button' | 'submit' | 'reset'
- `disabled` (boolean): Disable button
- `icon` (component): Icon component to display

**Usage:**
```jsx
import { Button } from './components/ui';

// Primary button
<Button variant="primary" size="md">
  Click Me
</Button>

// Link button with icon
<Button 
  variant="secondary" 
  href="/resume.pdf" 
  download="resume.pdf"
  icon={DownloadIcon}
>
  Download Resume
</Button>

// Ghost button
<Button variant="ghost" onClick={handleClick}>
  Cancel
</Button>
```

---

### Badge

Small badge component for tags, labels, and status indicators.

**Props:**
- `children` (node, required): Badge content
- `variant` (string): 'default' | 'success' | 'tech' | 'playable'
- `size` (string): 'sm' | 'md' | 'lg'
- `className` (string): Additional CSS classes
- `icon` (node): Icon or emoji to display

**Usage:**
```jsx
import { Badge } from './components/ui';

// Tech badge
<Badge variant="tech">Unity</Badge>

// Success badge with icon
<Badge variant="success" icon="✨">
  300K+ downloads
</Badge>

// Playable badge
<Badge variant="playable" icon="🎮">
  Playable
</Badge>
```

---

## Styling

All components use:
- Tailwind CSS utilities
- Gaming-themed colors from theme config
- Smooth transitions and hover effects
- Responsive design

## Customization

Components accept `className` prop for additional styling:

```jsx
<Card className="my-custom-class">
  Content
</Card>
```

## Theme Integration

Components automatically use colors from `config/theme.js`:
- `game-purple`: #8b5cf6
- `game-pink`: #ec4899
- `game-cyan`: #06b6d4
- `game-dark`: #0a0e27
- `game-darker`: #050814

## Accessibility

All components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus states
- Semantic HTML

## Future Components

Planned additions:
- Input
- Select
- Modal
- Tooltip
- Toast
- Tabs
- Accordion
