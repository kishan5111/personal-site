
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../services/analyticsService';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    console.log('Location changed to:', location.pathname);
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;
