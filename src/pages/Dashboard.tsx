import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/common/Sidebar";
import Chatbot from "@/components/common/Chatbot";
import { azureAIService, AIInsight } from "@/lib/azure-ai";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart,
  Plus,
  BarChart3,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Loader2,
  AlertCircle,
  TrendingDown,
  Lightbulb
} from "lucide-react";

const Dashboard = () => {
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotMode, setChatbotMode] = useState<'create' | 'trends' | 'schedule'>('create');
  const { toast } = useToast();

  const stats = [
    {
      title: "Total Views",
      value: "1.2M",
      change: "+12.5%",
      icon: <Eye className="w-5 h-5" />,
      trend: "up"
    },
    {
      title: "Engagement Rate",
      value: "7.2%",
      change: "+2.1%",
      icon: <Heart className="w-5 h-5" />,
      trend: "up"
    },
    {
      title: "Follower Growth",
      value: "15.8K",
      change: "+8.3%",
      icon: <Users className="w-5 h-5" />,
      trend: "up"
    },
    {
      title: "Content Score",
      value: "92",
      change: "+5.2%",
      icon: <TrendingUp className="w-5 h-5" />,
      trend: "up"
    }
  ];

  const recentActivity = [
    {
      action: "Your fitness workout video went viral",
      platform: "Instagram",
      time: "2 hours ago",
      impact: "+25K views"
    },
    {
      action: "New trending hashtag detected",
      platform: "TikTok",
      time: "4 hours ago",
      impact: "#HealthyLifestyle"
    },
    {
      action: "Content performance spike",
      platform: "YouTube",
      time: "6 hours ago",
      impact: "+85% engagement"
    },
    {
      action: "Optimal posting time alert",
      platform: "Instagram",
      time: "1 day ago",
      impact: "6:30 PM today"
    }
  ];

  const quickActions = [
    {
      title: "Create Content",
      description: "AI-powered content suggestions",
      icon: <Plus className="w-6 h-6" />,
      action: "Start Creating",
      gradient: "from-primary to-primary-glow",
      mode: 'create' as const
    },
    {
      title: "Analyze Trends",
      description: "Discover viral opportunities",
      icon: <BarChart3 className="w-6 h-6" />,
      action: "View Trends",
      gradient: "from-secondary to-blue-400",
      mode: 'trends' as const
    },
    {
      title: "Schedule Posts",
      description: "Optimize posting times",
      icon: <Calendar className="w-6 h-6" />,
      action: "Schedule Now",
      gradient: "from-success to-green-400",
      mode: 'schedule' as const
    }
  ];

  const handleAIInsights = async () => {
    setIsLoadingInsights(true);
    setShowAIInsights(true);
    
    try {
      console.log('Testing Azure AI connection...');
      
      // First check environment
      const envCheck = azureAIService.checkEnvironment();
      console.log('Environment check:', envCheck);
      
      if (!envCheck.isValid) {
        throw new Error(`Environment issues: ${envCheck.issues.join(', ')}`);
      }
      
      // Then test the connection
      const isConnected = await azureAIService.testConnection();
      console.log('Connection test result:', isConnected);
      
      if (!isConnected) {
        throw new Error('Azure AI connection test failed');
      }
      
      console.log('Generating AI insights...');
      const insights = await azureAIService.generateAIInsights();
      console.log('AI insights generated:', insights);
      setAiInsights(insights);
    } catch (error) {
      console.error('Failed to generate AI insights:', error);
      toast({
        title: "Azure AI Error",
        description: error instanceof Error ? error.message : "Failed to generate AI insights. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'performance': return <TrendingUp className="w-4 h-4" />;
      case 'trend': return <TrendingDown className="w-4 h-4" />;
      case 'recommendation': return <Lightbulb className="w-4 h-4" />;
      case 'alert': return <AlertCircle className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-trending/10 text-trending border-trending/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your content today
              </p>
            </div>
            <Button 
              className="btn-hero" 
              onClick={handleAIInsights}
              disabled={isLoadingInsights}
            >
              {isLoadingInsights ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              AI Insights
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-success flex items-center mt-1">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl">
                      <div className="text-primary">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl bg-gradient-to-r border border-border hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${action.gradient} text-white`}>
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{action.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {action.description}
                        </p>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-xs p-0 h-auto font-medium text-primary hover:text-primary group-hover:underline"
                          onClick={() => {
                            setChatbotMode(action.mode);
                            setShowChatbot(true);
                          }}
                        >
                          {action.action} →
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-primary font-medium">
                            {activity.platform}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-success">
                          {activity.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights Dialog */}
        <Dialog open={showAIInsights} onOpenChange={setShowAIInsights}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Azure AI Insights</span>
              </DialogTitle>
            </DialogHeader>
            
            {isLoadingInsights ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2">Generating insights with Azure AI...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {getInsightIcon(insight.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{insight.title}</h3>
                            <Badge 
                              variant="outline" 
                              className={getPriorityColor(insight.priority)}
                            >
                              {insight.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {insight.description}
                          </p>
                          {insight.action && (
                            <p className="text-xs text-primary font-medium">
                              💡 {insight.action}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                  Powered by Azure OpenAI GPT-4.1-mini
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Chatbot */}
        <Chatbot 
          isOpen={showChatbot}
          onClose={() => setShowChatbot(false)}
          mode={chatbotMode}
        />
      </main>
    </div>
  );
};

export default Dashboard;