import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Sidebar from "@/components/common/Sidebar";
import { azureAIService, ContentSuggestion } from "@/lib/azure-ai";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  Plus,
  Clock,
  Target,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Eye,
  Heart,
  Share2,
  Edit,
  Trash2,
  MoreHorizontal,
  Bot,
  Upload,
  Grid3X3,
  List,
  Filter,
  Search,
  Loader2
} from "lucide-react";

const ContentPlanner = () => {
  const [activeView, setActiveView] = useState<"calendar" | "board" | "list">("board");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<ContentSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    platform: '',
    scheduledDate: '',
    scheduledTime: ''
  });
  const { toast } = useToast();

  // Mock content data
  const contentItems = [
    {
      id: 1,
      title: "AI-Powered Workout Form Analysis",
      description: "Interactive video showing AI form correction technology",
      status: "scheduled",
      domain: "fitness",
      platform: "instagram",
      scheduledDate: "2024-01-15",
      estimatedViews: "250K-400K",
      engagementPrediction: 9.2,
      hashtags: ["#AIFitness", "#FormCheck", "#WorkoutTech"]
    },
    {
      id: 2,
      title: "Quick Healthy Breakfast Recipes",
      description: "5-minute breakfast ideas for busy professionals",
      status: "in-progress",
      domain: "food",
      platform: "tiktok",
      scheduledDate: "2024-01-18",
      estimatedViews: "180K-320K",
      engagementPrediction: 8.7,
      hashtags: ["#HealthyBreakfast", "#QuickRecipes", "#FoodPrep"]
    },
    {
      id: 3,
      title: "Sustainable Fashion Trends 2024",
      description: "Eco-friendly fashion choices and thrifting tips",
      status: "ideas",
      domain: "lifestyle",
      platform: "instagram",
      scheduledDate: null,
      estimatedViews: "120K-250K",
      engagementPrediction: 7.9,
      hashtags: ["#SustainableFashion", "#EcoStyle", "#ThriftFinds"]
    },
    {
      id: 4,
      title: "Tech Product Review: Smart Home Hub",
      description: "Comprehensive review of latest smart home technology",
      status: "published",
      domain: "technology",
      platform: "youtube",
      scheduledDate: "2024-01-10",
      estimatedViews: "300K-500K",
      engagementPrediction: 8.5,
      hashtags: ["#TechReview", "#SmartHome", "#HomeAutomation"]
    },
    {
      id: 5,
      title: "Mental Health Awareness Tips",
      description: "Daily practices for better mental wellness",
      status: "scheduled",
      domain: "health",
      platform: "instagram",
      scheduledDate: "2024-01-20",
      estimatedViews: "90K-180K",
      engagementPrediction: 9.5,
      hashtags: ["#MentalHealth", "#Wellness", "#SelfCare"]
    }
  ];

  const statusColumns = [
    { id: "ideas", title: "💡 Ideas", color: "bg-yellow-500/10 border-yellow-500/20" },
    { id: "in-progress", title: "🚧 In Progress", color: "bg-blue-500/10 border-blue-500/20" },
    { id: "scheduled", title: "📅 Scheduled", color: "bg-green-500/10 border-green-500/20" },
    { id: "published", title: "✅ Published", color: "bg-purple-500/10 border-purple-500/20" }
  ];

  const platforms = [
    { id: "all", name: "All Platforms", color: "#6B7280" },
    { id: "instagram", name: "Instagram", color: "#E4405F" },
    { id: "youtube", name: "YouTube", color: "#FF0000" },
    { id: "tiktok", name: "TikTok", color: "#000000" },
    { id: "twitter", name: "Twitter", color: "#1DA1F2" }
  ];

  const domains = [
    { id: "all", name: "All Domains", emoji: "🌐" },
    { id: "education", name: "Education", emoji: "🎓" },
    { id: "food", name: "Food", emoji: "🍽" },
    { id: "fitness", name: "Fitness", emoji: "💪" },
    { id: "lifestyle", name: "Lifestyle", emoji: "👗" },
    { id: "technology", name: "Technology", emoji: "💻" },
    { id: "business", name: "Business", emoji: "💼" },
    { id: "entertainment", name: "Entertainment", emoji: "🎭" },
    { id: "health", name: "Health", emoji: "🏥" }
  ];

  const getFilteredContent = () => {
    return contentItems.filter(item => {
      const domainMatch = selectedDomain === "all" || item.domain === selectedDomain;
      const platformMatch = selectedPlatform === "all" || item.platform === selectedPlatform;
      return domainMatch && platformMatch;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ideas": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300";
      case "in-progress": return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300";
      case "scheduled": return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300";
      case "published": return "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPlatformColor = (platform: string) => {
    const platformData = platforms.find(p => p.id === platform);
    return platformData?.color || "#6B7280";
  };

  const handleAISuggest = async () => {
    if (!formData.domain || !formData.platform) {
      toast({
        title: "Missing Information",
        description: "Please select a domain and platform first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingSuggestions(true);
    setShowAISuggestions(true);

    try {
      const suggestions = await azureAIService.generateContentSuggestions(
        formData.domain, 
        formData.platform
      );
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Failed to generate AI suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const ContentCard = ({ item }: { item: typeof contentItems[0] }) => (
    <Card className="mb-4 hover:shadow-card transition-shadow cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <Badge className={getStatusColor(item.status)}>
            {item.status.replace("-", " ")}
          </Badge>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span>{item.estimatedViews}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{item.engagementPrediction}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getPlatformColor(item.platform) }}
              />
              <span className="text-xs capitalize">{item.platform}</span>
            </div>
            {item.scheduledDate && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{new Date(item.scheduledDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {item.hashtags.slice(0, 2).map((hashtag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {hashtag}
            </Badge>
          ))}
          {item.hashtags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{item.hashtags.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Content Planner</h1>
              <p className="text-muted-foreground">
                Plan, create, and schedule your content across all platforms
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Content</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Domain</label>
                        <Select value={formData.domain} onValueChange={(value) => handleInputChange('domain', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select domain" />
                          </SelectTrigger>
                          <SelectContent>
                            {domains.slice(1).map((domain) => (
                              <SelectItem key={domain.id} value={domain.id}>
                                {domain.emoji} {domain.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Platform</label>
                        <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {platforms.slice(1).map((platform) => (
                              <SelectItem key={platform.id} value={platform.id}>
                                {platform.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input 
                        placeholder="Enter content title" 
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea 
                        placeholder="Describe your content idea" 
                        rows={3}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Scheduled Date</label>
                        <Input 
                          type="date" 
                          value={formData.scheduledDate}
                          onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Scheduled Time</label>
                        <Input 
                          type="time" 
                          value={formData.scheduledTime}
                          onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={handleAISuggest}
                        disabled={isLoadingSuggestions}
                      >
                        {isLoadingSuggestions ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Bot className="w-4 h-4 mr-2" />
                        )}
                        AI Suggest
                      </Button>
                      <Button>Create Content</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Filters and View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain.id} value={domain.id}>
                      {domain.emoji} {domain.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search content..." className="pl-10 w-64" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={activeView === "board" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("board")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={activeView === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("calendar")}
              >
                <Calendar className="w-4 h-4" />
              </Button>
              <Button
                variant={activeView === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content Views */}
          {activeView === "board" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statusColumns.map((column) => (
                <div key={column.id} className={`border-2 border-dashed rounded-lg p-4 ${column.color}`}>
                  <h3 className="font-semibold mb-4 text-center">{column.title}</h3>
                  <div className="space-y-4">
                    {getFilteredContent()
                      .filter(item => item.status === column.id)
                      .map((item) => (
                        <ContentCard key={item.id} item={item} />
                      ))}
                    
                    {column.id === "ideas" && (
                      <Card className="border-dashed border-2 hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardContent className="p-8 text-center">
                          <Plus className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Add new idea</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeView === "calendar" && (
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-semibold p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date(2024, 0, i - 5);
                    const hasContent = getFilteredContent().some(item => 
                      item.scheduledDate && new Date(item.scheduledDate).toDateString() === date.toDateString()
                    );
                    
                    return (
                      <div 
                        key={i} 
                        className={`aspect-square border border-border rounded-lg p-2 hover:bg-muted/50 transition-colors cursor-pointer ${
                          hasContent ? "bg-primary/10 border-primary/30" : ""
                        }`}
                      >
                        <div className="text-sm font-medium">{date.getDate()}</div>
                        {hasContent && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {activeView === "list" && (
            <Card>
              <CardHeader>
                <CardTitle>Content List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getFilteredContent().map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{item.title}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.replace("-", " ")}
                          </Badge>
                          <Badge variant="outline" style={{ borderColor: getPlatformColor(item.platform) }}>
                            {item.platform}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>📊 {item.estimatedViews}</span>
                          <span>❤️ {item.engagementPrediction}%</span>
                          {item.scheduledDate && (
                            <span>📅 {new Date(item.scheduledDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Suggestions Dialog */}
        <Dialog open={showAISuggestions} onOpenChange={setShowAISuggestions}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Azure AI Content Suggestions</span>
              </DialogTitle>
            </DialogHeader>
            
            {isLoadingSuggestions ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2">Generating content suggestions with Azure AI...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{suggestion.title}</h3>
                          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Estimated Views:</span>
                            <p className="text-success font-semibold">{suggestion.estimatedViews}</p>
                          </div>
                          <div>
                            <span className="font-medium">Engagement:</span>
                            <p className="text-trending font-semibold">{suggestion.engagementPrediction}%</p>
                          </div>
                          <div>
                            <span className="font-medium">Optimal Time:</span>
                            <p className="text-primary">{suggestion.optimalTime}</p>
                          </div>
                          <div>
                            <span className="font-medium">Platforms:</span>
                            <div className="flex space-x-1 mt-1">
                              {suggestion.platforms.map((platform) => (
                                <Badge key={platform} variant="outline" className="text-xs">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium text-sm">Hashtags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {suggestion.hashtags.map((hashtag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {hashtag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <Button 
                            size="sm" 
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                title: suggestion.title,
                                description: suggestion.description
                              }));
                              setShowAISuggestions(false);
                            }}
                          >
                            Use This Idea
                          </Button>
                          <Button variant="outline" size="sm">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Refine
                          </Button>
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
      </main>
    </div>
  );
};

export default ContentPlanner;