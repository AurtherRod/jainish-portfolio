import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FacebookPixel = ({ pixelId = 'YOUR_PIXEL_ID' }) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Facebook Pixel
    if (typeof window !== 'undefined' && pixelId !== 'YOUR_PIXEL_ID') {
      window.fbq = function() {
        window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = window.fbq;
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);

      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  }, [pixelId]);

  useEffect(() => {
    // Track page views on route change
    if (typeof window !== 'undefined' && window.fbq && pixelId !== 'YOUR_PIXEL_ID') {
      window.fbq('track', 'PageView');
    }
  }, [location, pixelId]);

  return null;
};

export default FacebookPixel;
