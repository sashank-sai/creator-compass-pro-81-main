import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/common/Sidebar";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Eye, 
  Heart,
  Share2,
  Download,
  Calendar,
  Target,
  Globe,
  Smartphone,
  Monitor,
  Filter
} from "lucide-react";

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("30d");
  const [platform, setPlatform] = useState("all");

  // Mock data for analytics
  const overviewStats = [
    {
      title: "Total Views",
      value: "2.4M",
      change: "+15.2%",
      trend: "up",
      icon: Eye,
      color: "text-primary"
    },
    {
      title: "Engagement Rate",
      value: "8.7%",
      change: "+2.1%",
      trend: "up",
      icon: Heart,
      color: "text-trending"
    },
    {
      title: "Followers",
      value: "127K",
      change: "+5.8%",
      trend: "up",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Shares",
      value: "45.2K",
      change: "-3.2%",
      trend: "down",
      icon: Share2,
      color: "text-warning"
    }
  ];

  const performanceData = [
    { date: "Jan", views: 180000, engagement: 7.2, followers: 115000 },
    { date: "Feb", views: 200000, engagement: 7.8, followers: 118000 },
    { date: "Mar", views: 220000, engagement: 8.1, followers: 121000 },
    { date: "Apr", views: 240000, engagement: 8.5, followers: 124000 },
    { date: "May", views: 280000, engagement: 8.7, followers: 127000 },
    { date: "Jun", views: 260000, engagement: 8.3, followers: 125000 }
  ];

  const platformData = [
    { platform: "Instagram", views: 950000, engagement: 9.2, color: "#E4405F" },
    { platform: "YouTube", views: 720000, engagement: 7.8, color: "#FF0000" },
    { platform: "TikTok", views: 580000, engagement: 11.5, color: "#000000" },
    { platform: "Twitter", views: 150000, engagement: 5.2, color: "#1DA1F2" }
  ];

  const audienceData = [
    { name: "18-24", value: 28, color: "#8B5CF6" },
    { name: "25-34", value: 35, color: "#3B82F6" },
    { name: "35-44", value: 22, color: "#10B981" },
    { name: "45-54", value: 12, color: "#F59E0B" },
    { name: "55+", value: 3, color: "#EF4444" }
  ];

  const deviceData = [
    { device: "Mobile", percentage: 68, icon: Smartphone },
    { device: "Desktop", percentage: 24, icon: Monitor },
    { device: "Tablet", percentage: 8, icon: Globe }
  ];

  const topContent = [
    {
      title: "AI-Powered Workout Form Analysis",
      views: "324K",
      engagement: "12.4%",
      platform: "Instagram",
      date: "3 days ago"
    },
    {
      title: "Quick Healthy Breakfast Ideas",
      views: "289K",
      engagement: "11.8%",
      platform: "TikTok",
      date: "1 week ago"
    },
    {
      title: "Tech Review: Latest Fitness Tracker",
      views: "256K",
      engagement: "9.7%",
      platform: "YouTube",
      date: "5 days ago"
    },
    {
      title: "Sustainable Fashion Trends 2024",
      views: "198K",
      engagement: "8.9%",
      platform: "Instagram",
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics Hub</h1>
              <p className="text-muted-foreground">
                Comprehensive insights into your content performance across all platforms
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-success mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                          )}
                          <span className={`text-sm ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="content">Top Content</TabsTrigger>
            </TabsList>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Views Over Time</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="views" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5" />
                      <span>Engagement Rate</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="engagement" 
                          stroke="hsl(var(--trending))" 
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--trending))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Platforms Tab */}
            <TabsContent value="platforms" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={platformData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="platform" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {platformData.map((platform) => (
                        <div key={platform.platform} className="flex items-center justify-between p-4 border border-border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: platform.color }}
                            />
                            <span className="font-medium">{platform.platform}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{platform.engagement}%</p>
                            <p className="text-sm text-muted-foreground">
                              {(platform.views / 1000).toFixed(0)}K views
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Audience Tab */}
            <TabsContent value="audience" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Age Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={audienceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {audienceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Device Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deviceData.map((device) => {
                        const IconComponent = device.icon;
                        return (
                          <div key={device.device} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <IconComponent className="w-5 h-5 text-primary" />
                              <span className="font-medium">{device.device}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-24 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${device.percentage}%` }}
                                />
                              </div>
                              <span className="font-semibold w-12 text-right">{device.percentage}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Top Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Top Performing Content</span>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topContent.map((content, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{content.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{content.views} views</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{content.engagement} engagement</span>
                            </div>
                            <Badge variant="outline">
                              {content.platform}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{content.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Analytics;