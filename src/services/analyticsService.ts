
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (will use environment variables)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PageView {
  page: string;
  referrer: string | null;
  userAgent: string;
  timestamp: string;
  sessionId: string;
}

export interface VisitorSummary {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: Record<string, number>;
  visitsByDate: Record<string, number>;
}

// Generate a session ID for the current visit
const generateSessionId = (): string => {
  const existingId = localStorage.getItem('visitor_session_id');
  if (existingId) return existingId;
  
  const newId = crypto.randomUUID();
  localStorage.setItem('visitor_session_id', newId);
  return newId;
};

// Track a page view
export const trackPageView = async (page: string): Promise<void> => {
  try {
    const sessionId = generateSessionId();
    const pageView: PageView = {
      page,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId
    };
    
    // Console log to check data being sent
    console.log('Tracking page view:', pageView);
    
    const { error } = await supabase
      .from('page_views')
      .insert([pageView]);
      
    if (error) {
      console.error('Error tracking page view:', error);
    } else {
      console.log('Successfully tracked page view');
    }
  } catch (err) {
    console.error('Failed to track page view:', err);
  }
};

// Get visitor summary statistics
export const getVisitorSummary = async (): Promise<VisitorSummary | null> => {
  try {
    console.log('Fetching visitor summary...');
    
    // Get all page views
    const { data: pageViews, error } = await supabase
      .from('page_views')
      .select('*');
      
    if (error) {
      console.error('Error fetching page views:', error);
      return null;
    }
    
    console.log('Received page views data:', pageViews);
    
    if (!pageViews || pageViews.length === 0) {
      console.log('No page views data available');
      return {
        totalVisits: 0,
        uniqueVisitors: 0,
        pageViews: {},
        visitsByDate: {}
      };
    }
    
    // Count unique session IDs
    const uniqueSessionIds = new Set(pageViews.map(view => view.sessionId));
    
    // Count page views by URL
    const pageViewCounts: Record<string, number> = {};
    pageViews.forEach(view => {
      pageViewCounts[view.page] = (pageViewCounts[view.page] || 0) + 1;
    });
    
    // Count visits by date
    const visitsByDate: Record<string, number> = {};
    pageViews.forEach(view => {
      const date = new Date(view.timestamp).toISOString().split('T')[0];
      visitsByDate[date] = (visitsByDate[date] || 0) + 1;
    });
    
    const summary = {
      totalVisits: pageViews.length,
      uniqueVisitors: uniqueSessionIds.size,
      pageViews: pageViewCounts,
      visitsByDate
    };
    
    console.log('Generated summary:', summary);
    return summary;
  } catch (err) {
    console.error('Failed to get visitor summary:', err);
    return null;
  }
};
