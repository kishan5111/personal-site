
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getVisitorSummary, VisitorSummary } from "@/services/analyticsService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowUpRight, Users, Eye } from "lucide-react";

const AdminDashboard = () => {
  const { data: summary, isLoading, error } = useQuery({
    queryKey: ['visitorSummary'],
    queryFn: getVisitorSummary,
    refetchInterval: 60000, // Refresh every minute
  });

  const [pageViewsData, setPageViewsData] = useState<Array<{ name: string; value: number }>>([]);
  const [visitsByDateData, setVisitsByDateData] = useState<Array<{ date: string; visits: number }>>([]);

  useEffect(() => {
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

  if (isLoading) return <div className="p-8 text-center">Loading visitor statistics...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading visitor statistics</div>;

  return (
    <div className="container mx-auto p-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {!summary ? (
        <div className="text-center py-8">No data available yet</div>
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
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
