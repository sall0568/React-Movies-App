// src/hooks/useAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
      });
    }

    if (typeof window.clarity !== 'undefined') {
      window.clarity('set', 'page', location.pathname);
    }

    console.log('📊 Page view tracked:', location.pathname);
  }, [location]);
};

export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
    console.log('📊 Event tracked:', eventName, eventParams);
  }
};
