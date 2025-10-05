import { Link } from 'react-router-dom';

const InternalLink = ({ to, children, className = '', title }) => {
  const isExternal = to.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={to} 
        className={className}
        title={title}
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      to={to} 
      className={className}
      title={title}
      prefetch="intent"
    >
      {children}
    </Link>
  );
};

export default InternalLink;
