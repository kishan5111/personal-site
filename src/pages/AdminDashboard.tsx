
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getVisitorSummary, VisitorSummary } from "@/services/analyticsService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, Users, Eye, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { data: summary, isLoading, error, refetch } = useQuery({
    queryKey: ['visitorSummary'],
    queryFn: getVisitorSummary,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const [pageViewsData, setPageViewsData] = useState<Array<{ name: string; value: number }>>([]);
  const [visitsByDateData, setVisitsByDateData] = useState<Array<{ date: string; visits: number }>>([]);

  useEffect(() => {
    console.log("Summary data in dashboard:", summary);
    if (summary) {
      // Format page views data for pie chart
      const pageViewsArray = Object.entries(summary.pageViews).map(([page, count]) => ({
        name: page === '/' ? 'Home' : page.substring(1).charAt(0).toUpperCase() + page.substring(2),
        value: count
      }));
      
      // Format visits by date for bar chart
      const visitsArray = Object.entries(summary.visitsByDate)
        .map(([date, count]) => ({
          date,
          visits: count
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-7); // Last 7 days
      
      setPageViewsData(pageViewsArray);
      setVisitsByDateData(visitsArray);
    }
  }, [summary]);

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const handleRefresh = () => {
    toast.info("Refreshing data...");
    refetch();
  };

  return (
    <div className="container mx-auto p-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleRefresh} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-muted-foreground">Loading visitor statistics...</p>
        </div>
      ) : error ? (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center p-6">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-xl font-semibold mb-2">Error Loading Data</h3>
              <p className="text-muted-foreground mb-4">There was a problem fetching visitor statistics.</p>
              <Button onClick={handleRefresh} variant="outline">Try Again</Button>
            </div>
          </CardContent>
        </Card>
      ) : !summary ? (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center p-6">
              <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
              <p className="text-muted-foreground mb-4">We haven't collected any visitor data yet.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.totalVisits}</div>
                <p className="text-xs text-muted-foreground">All time page views</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.uniqueVisitors}</div>
                <p className="text-xs text-muted-foreground">Distinct visitor sessions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pages Per Visit</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.uniqueVisitors > 0 
                    ? (summary.totalVisits / summary.uniqueVisitors).toFixed(2) 
                    : '0.00'}
                </div>
                <p className="text-xs text-muted-foreground">Average pages viewed per visitor</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {pageViewsData.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Page Views by Page</CardTitle>
                  <CardDescription>Distribution of traffic across website pages</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pageViewsData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pageViewsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} views`, 'Page Views']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Page Views by Page</CardTitle>
                  <CardDescription>No page view data available yet</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">Visit different pages to see data here</p>
                </CardContent>
              </Card>
            )}
            
            {visitsByDateData.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Trend</CardTitle>
                  <CardDescription>Daily page views for the last 7 days</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visitsByDateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="visits" fill="#8884d8" name="Page Views" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Trend</CardTitle>
                  <CardDescription>No visit data available yet</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground text-center">Come back later to see traffic trends</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
              <CardDescription>How to complete the analytics setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To complete the analytics setup, make sure you have:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Set up your Supabase project and connected it to this application</li>
                <li>Created a <code>page_views</code> table in your Supabase database with these fields:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li><code>id</code> (primary key, auto-increment)</li>
                    <li><code>page</code> (text)</li>
                    <li><code>referrer</code> (text, nullable)</li>
                    <li><code>userAgent</code> (text)</li>
                    <li><code>timestamp</code> (timestamp with timezone)</li>
                    <li><code>sessionId</code> (text)</li>
                  </ul>
                </li>
                <li>Added your Supabase URL and Anonymous Key to your environment variables</li>
              </ol>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-mono text-sm">
                  Make sure you have these environment variables set:<br />
                  VITE_SUPABASE_URL=your_supabase_url<br />
                  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
