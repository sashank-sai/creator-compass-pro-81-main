import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Sidebar from "@/components/common/Sidebar";
import { azureAIService, ContentSuggestion } from "@/lib/azure-ai";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";

const DomainExplorer = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [expandedTier, setExpandedTier] = useState<'popular' | 'extraordinary' | null>(null);
  const [showAICreation, setShowAICreation] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isCreatingContent, setIsCreatingContent] = useState(false);
  const { toast } = useToast();

  const domains = [
    {
      id: 'education',
      emoji: '🎓',
      name: 'Education & Learning',
      description: 'Educational content, tutorials, and skill development',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'food',
      emoji: '🍽',
      name: 'Food & Culinary',
      description: 'Recipes, cooking tips, and food reviews',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'fitness',
      emoji: '💪',
      name: 'Fitness & Wellness',
      description: 'Workouts, health tips, and wellness advice',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'lifestyle',
      emoji: '👗',
      name: 'Lifestyle & Fashion',
      description: 'Style, beauty, and lifestyle content',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'technology',
      emoji: '💻',
      name: 'Technology & Gaming',
      description: 'Tech reviews, gaming, and digital trends',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'business',
      emoji: '💼',
      name: 'Business & Finance',
      description: 'Entrepreneurship, investing, and business tips',
      color: 'from-gray-600 to-gray-700'
    },
    {
      id: 'entertainment',
      emoji: '🎭',
      name: 'Entertainment & Arts',
      description: 'Music, movies, art, and creative content',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'health',
      emoji: '🏥',
      name: 'Health & Medical',
      description: 'Health information, medical advice, and wellness',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  const contentRecommendations = {
    education: {
      popular: [
        {
          title: "Interactive Learning Techniques",
          engagementRate: 92,
          trend: "rising",
          platforms: ["youtube", "linkedin"],
          audience: "25-34 professionals"
        },
        {
          title: "Study Tips for Different Learning Styles",
          engagementRate: 88,
          trend: "stable",
          platforms: ["instagram", "tiktok"],
          audience: "18-24 students"
        },
        {
          title: "Online Course Creation Strategies",
          engagementRate: 85,
          trend: "rising",
          platforms: ["youtube", "twitter"],
          audience: "Educators & coaches"
        },
        {
          title: "Educational Technology Reviews",
          engagementRate: 82,
          trend: "stable",
          platforms: ["youtube", "instagram"],
          audience: "Tech-savvy learners"
        },
        {
          title: "Career Development Roadmaps",
          engagementRate: 79,
          trend: "falling",
          platforms: ["linkedin", "twitter"],
          audience: "Working professionals"
        }
      ],
      extraordinary: [
        {
          title: "AI-Powered Personalized Learning Paths",
          predictedViews: "200K-400K",
          optimalTime: "Monday 7:00 PM EST",
          platforms: ["youtube", "linkedin"],
          hashtags: ["#EdTech", "#AILearning", "#PersonalizedEducation"],
          uniqueness: 96,
          description: "Create adaptive learning experiences that adjust based on individual progress and learning style"
        },
        {
          title: "Virtual Reality Classroom Experiences",
          predictedViews: "180K-350K",
          optimalTime: "Wednesday 6:00 PM EST",
          platforms: ["youtube", "instagram"],
          hashtags: ["#VREducation", "#ImmersiveLearning", "#FutureClassroom"],
          uniqueness: 98,
          description: "Design immersive educational experiences using VR technology for enhanced learning retention"
        },
        {
          title: "Gamified Learning Challenges",
          predictedViews: "160K-320K",
          optimalTime: "Friday 5:30 PM EST",
          platforms: ["tiktok", "instagram"],
          hashtags: ["#EdGaming", "#LearningGames", "#StudyChallenge"],
          uniqueness: 89,
          description: "Transform educational content into engaging game-like experiences that motivate continued learning"
        }
      ]
    },
    food: {
      popular: [
        {
          title: "Quick & Healthy Meal Prep Ideas",
          engagementRate: 91,
          trend: "rising",
          platforms: ["instagram", "tiktok"],
          audience: "Busy professionals"
        },
        {
          title: "Budget-Friendly Gourmet Recipes",
          engagementRate: 87,
          trend: "stable",
          platforms: ["youtube", "instagram"],
          audience: "Home cooking enthusiasts"
        },
        {
          title: "International Cuisine Tutorials",
          engagementRate: 84,
          trend: "rising",
          platforms: ["youtube", "tiktok"],
          audience: "Food adventurers"
        },
        {
          title: "Kitchen Gadget Reviews & Hacks",
          engagementRate: 81,
          trend: "stable",
          platforms: ["instagram", "youtube"],
          audience: "Cooking enthusiasts"
        },
        {
          title: "Dietary Restriction-Friendly Meals",
          engagementRate: 78,
          trend: "rising",
          platforms: ["instagram", "pinterest"],
          audience: "Health-conscious cooks"
        }
      ],
      extraordinary: [
        {
          title: "AI-Generated Recipe Combinations",
          predictedViews: "180K-350K",
          optimalTime: "Sunday 5:00 PM EST",
          platforms: ["instagram", "tiktok"],
          hashtags: ["#FoodTech", "#RecipeAI", "#CookingInnovation"],
          uniqueness: 94,
          description: "Use AI to create unique recipe combinations based on available ingredients and dietary preferences"
        },
        {
          title: "Molecular Gastronomy at Home",
          predictedViews: "220K-450K",
          optimalTime: "Saturday 7:00 PM EST",
          platforms: ["youtube", "instagram"],
          hashtags: ["#MolecularCooking", "#ScienceCooking", "#GourmetAtHome"],
          uniqueness: 97,
          description: "Bring restaurant-level molecular gastronomy techniques to home kitchens with simple equipment"
        },
        {
          title: "Cultural Food History Deep Dives",
          predictedViews: "140K-280K",
          optimalTime: "Thursday 6:30 PM EST",
          platforms: ["youtube", "instagram"],
          hashtags: ["#FoodHistory", "#CulturalCuisine", "#FoodStories"],
          uniqueness: 91,
          description: "Explore the fascinating cultural stories and historical origins behind popular dishes worldwide"
        }
      ]
    },
    fitness: {
      popular: [
        {
          title: "30-Day Home Workout Challenges",
          engagementRate: 94,
          trend: "rising",
          platforms: ["instagram", "youtube"],
          audience: "25-35 year olds"
        },
        {
          title: "Quick Morning Stretch Routines",
          engagementRate: 89,
          trend: "stable",
          platforms: ["tiktok", "instagram"],
          audience: "Working professionals"
        },
        {
          title: "Healthy Meal Prep for Busy People",
          engagementRate: 87,
          trend: "rising",
          platforms: ["youtube", "instagram"],
          audience: "Fitness enthusiasts"
        },
        {
          title: "Bodyweight Exercises for Small Spaces",
          engagementRate: 85,
          trend: "rising",
          platforms: ["tiktok", "youtube"],
          audience: "Urban millennials"
        },
        {
          title: "Mindfulness and Meditation Tips",
          engagementRate: 82,
          trend: "stable",
          platforms: ["instagram", "youtube"],
          audience: "Wellness seekers"
        }
      ],
      extraordinary: [
        {
          title: "AI-Powered Form Correction Workouts",
          predictedViews: "150K-300K",
          optimalTime: "Tuesday 6:30 PM EST",
          platforms: ["instagram", "youtube"],
          hashtags: ["#AIFitness", "#FormCheck", "#TechWorkout"],
          uniqueness: 95,
          description: "Use motion tracking technology to provide real-time form feedback during workouts"
        },
        {
          title: "Virtual Reality Hiking Adventures",
          predictedViews: "200K-400K",
          optimalTime: "Saturday 2:00 PM EST",
          platforms: ["youtube", "tiktok"],
          hashtags: ["#VRFitness", "#VirtualHiking", "#FutureFitness"],
          uniqueness: 98,
          description: "Immersive VR hiking experiences that provide cardio workout while exploring virtual worlds"
        },
        {
          title: "Biometric-Driven Personalized Workouts",
          predictedViews: "120K-250K",
          optimalTime: "Monday 7:00 AM EST",
          platforms: ["instagram", "youtube"],
          hashtags: ["#BiometricFitness", "#PersonalizedWorkout", "#DataDriven"],
          uniqueness: 92,
          description: "Workouts that adapt in real-time based on heart rate, stress levels, and performance metrics"
        }
      ]
    },
    lifestyle: {
      popular: [
        {
          title: "Sustainable Fashion & Thrifting Tips",
          engagementRate: 90,
          trend: "rising",
          platforms: ["instagram", "pinterest"],
          audience: "Eco-conscious millennials"
        },
        {
          title: "Seasonal Wardrobe Capsule Collections",
          engagementRate: 86,
          trend: "stable",
          platforms: ["instagram", "youtube"],
          audience: "Fashion enthusiasts"
        },
        {
          title: "Home Decor on a Budget",
          engagementRate: 83,
          trend: "rising",
          platforms: ["pinterest", "instagram"],
          audience: "Home decorators"
        },
        {
          title: "Travel Style & Packing Hacks",
          engagementRate: 80,
          trend: "stable",
          platforms: ["instagram", "tiktok"],
          audience: "Digital nomads"
        },
        {
          title: "Beauty Routine Minimalism",
          engagementRate: 77,
          trend: "rising",
          platforms: ["instagram", "youtube"],
          audience: "Minimalist beauty lovers"
        }
      ],
      extraordinary: [
        {
          title: "AI Fashion Trend Predictions",
          predictedViews: "120K-250K",
          optimalTime: "Wednesday 8:00 PM EST",
          platforms: ["instagram", "pinterest"],
          hashtags: ["#FashionTech", "#StylePredict", "#TrendAlert"],
          uniqueness: 93,
          description: "Use AI analytics to predict upcoming fashion trends before they hit mainstream"
        },
        {
          title: "Virtual Styling Consultations",
          predictedViews: "160K-320K",
          optimalTime: "Sunday 3:00 PM EST",
          platforms: ["instagram", "youtube"],
          hashtags: ["#VirtualStylist", "#OnlineFashion", "#StyleConsult"],
          uniqueness: 89,
          description: "Offer personalized styling advice through virtual consultations using AR technology"
        },
        {
          title: "Upcycling Fashion Projects",
          predictedViews: "140K-280K",
          optimalTime: "Saturday 4:30 PM EST",
          platforms: ["youtube", "instagram"],
          hashtags: ["#Upcycling", "#SustainableFashion", "#DIYStyle"],
          uniqueness: 91,
          description: "Transform old clothing into trendy pieces through creative upcycling techniques"
        }
      ]
    },
    technology: {
      popular: [
        {
          title: "Latest Tech Product Reviews",
          engagementRate: 93,
          trend: "rising",
          platforms: ["youtube", "twitter"],
          audience: "Tech enthusiasts"
        },
        {
          title: "Gaming Setup Optimization Guides",
          engagementRate: 89,
          trend: "stable",
          platforms: ["youtube", "twitch"],
          audience: "Gamers"
        },
        {
          title: "Programming Tutorials for Beginners",
          engagementRate: 85,
          trend: "rising",
          platforms: ["youtube", "linkedin"],
          audience: "Aspiring developers"
        },
        {
          title: "Cybersecurity Tips for Everyone",
          engagementRate: 82,
          trend: "stable",
          platforms: ["linkedin", "twitter"],
          audience: "Digital privacy advocates"
        },
        {
          title: "Emerging Technology Explanations",
          engagementRate: 79,
          trend: "rising",
          platforms: ["youtube", "twitter"],
          audience: "Tech professionals"
        }
      ],
      extraordinary: [
        {
          title: "AI Tool Comparisons & Reviews",
          predictedViews: "220K-450K",
          optimalTime: "Thursday 7:30 PM EST",
          platforms: ["youtube", "linkedin"],
          hashtags: ["#TechReview", "#AITools", "#TechTrends"],
          uniqueness: 94,
          description: "Comprehensive comparisons of AI tools for productivity, creativity, and business applications"
        },
        {
          title: "Behind-the-Scenes Tech Development",
          predictedViews: "180K-360K",
          optimalTime: "Tuesday 8:00 PM EST",
          platforms: ["youtube", "twitter"],
          hashtags: ["#TechDev", "#CodingLife", "#TechBehindScenes"],
          uniqueness: 96,
          description: "Show the real development process behind popular apps and technologies"
        },
        {
          title: "Retro Gaming Restoration Projects",
          predictedViews: "160K-320K",
          optimalTime: "Friday 7:00 PM EST",
          platforms: ["youtube", "twitch"],
          hashtags: ["#RetroGaming", "#GameRestoration", "#VintageGaming"],
          uniqueness: 88,
          description: "Restore and modernize classic gaming systems with detailed technical explanations"
        }
      ]
    },
    business: {
      popular: [
        {
          title: "Personal Finance Management Tips",
          engagementRate: 91,
          trend: "rising",
          platforms: ["linkedin", "youtube"],
          audience: "Young professionals"
        },
        {
          title: "Entrepreneurship Success Stories",
          engagementRate: 87,
          trend: "stable",
          platforms: ["linkedin", "instagram"],
          audience: "Aspiring entrepreneurs"
        },
        {
          title: "Investment Strategies for Beginners",
          engagementRate: 84,
          trend: "rising",
          platforms: ["youtube", "linkedin"],
          audience: "New investors"
        },
        {
          title: "Side Hustle Ideas & Execution",
          engagementRate: 81,
          trend: "stable",
          platforms: ["instagram", "tiktok"],
          audience: "Side hustlers"
        },
        {
          title: "Career Advancement Strategies",
          engagementRate: 78,
          trend: "rising",
          platforms: ["linkedin", "youtube"],
          audience: "Career-focused professionals"
        }
      ],
      extraordinary: [
        {
          title: "AI-Driven Market Analysis",
          predictedViews: "160K-320K",
          optimalTime: "Friday 6:00 PM EST",
          platforms: ["linkedin", "youtube"],
          hashtags: ["#FinTech", "#MarketAnalysis", "#InvestmentTech"],
          uniqueness: 95,
          description: "Use AI tools to analyze market trends and provide investment insights for retail investors"
        },
        {
          title: "Startup Failure Case Studies",
          predictedViews: "190K-380K",
          optimalTime: "Wednesday 7:30 PM EST",
          platforms: ["linkedin", "youtube"],
          hashtags: ["#StartupLessons", "#BusinessFailure", "#EntrepreneurTips"],
          uniqueness: 92,
          description: "Deep dive analysis of startup failures with actionable lessons for entrepreneurs"
        },
        {
          title: "Passive Income Stream Creation",
          predictedViews: "210K-420K",
          optimalTime: "Sunday 6:00 PM EST",
          platforms: ["youtube", "instagram"],
          hashtags: ["#PassiveIncome", "#WealthBuilding", "#FinancialFreedom"],
          uniqueness: 89,
          description: "Step-by-step guide to building multiple passive income streams in the digital age"
        }
      ]
    },
    entertainment: {
      popular: [
        {
          title: "Behind-the-Scenes Creative Processes",
          engagementRate: 88,
          trend: "rising",
          platforms: ["instagram", "youtube"],
          audience: "Creative professionals"
        },
        {
          title: "Art Technique Tutorials & Tips",
          engagementRate: 85,
          trend: "stable",
          platforms: ["youtube", "instagram"],
          audience: "Artists & crafters"
        },
        {
          title: "Music Production & Composition",
          engagementRate: 82,
          trend: "rising",
          platforms: ["youtube", "tiktok"],
          audience: "Musicians & producers"
        },
        {
          title: "Comedy Writing & Performance",
          engagementRate: 79,
          trend: "stable",
          platforms: ["tiktok", "instagram"],
          audience: "Comedy enthusiasts"
        },
        {
          title: "Digital Art & Design Trends",
          engagementRate: 76,
          trend: "rising",
          platforms: ["instagram", "pinterest"],
          audience: "Digital artists"
        }
      ],
      extraordinary: [
        {
          title: "AI-Assisted Creative Collaborations",
          predictedViews: "140K-280K",
          optimalTime: "Saturday 4:00 PM EST",
          platforms: ["instagram", "youtube"],
          hashtags: ["#CreativeAI", "#ArtTech", "#DigitalCreativity"],
          uniqueness: 96,
          description: "Collaborate with AI tools to create unique art, music, and digital content"
        },
        {
          title: "Interactive Storytelling Experiences",
          predictedViews: "170K-340K",
          optimalTime: "Friday 8:00 PM EST",
          platforms: ["youtube", "instagram"],
          hashtags: ["#InteractiveStory", "#DigitalNarrative", "#StoryTech"],
          uniqueness: 94,
          description: "Create immersive storytelling experiences using interactive media and audience participation"
        },
        {
          title: "Virtual Art Gallery Tours",
          predictedViews: "120K-240K",
          optimalTime: "Sunday 2:00 PM EST",
          platforms: ["youtube", "instagram"],
          hashtags: ["#VirtualArt", "#ArtTour", "#DigitalGallery"],
          uniqueness: 87,
          description: "Curate and host virtual art gallery experiences featuring emerging and established artists"
        }
      ]
    },
    health: {
      popular: [
        {
          title: "Preventive Health & Wellness Tips",
          engagementRate: 89,
          trend: "rising",
          platforms: ["youtube", "instagram"],
          audience: "Health-conscious adults"
        },
        {
          title: "Mental Health Awareness & Support",
          engagementRate: 86,
          trend: "stable",
          platforms: ["instagram", "linkedin"],
          audience: "Mental health advocates"
        },
        {
          title: "Nutrition Science Explained Simply",
          engagementRate: 83,
          trend: "rising",
          platforms: ["youtube", "instagram"],
          audience: "Nutrition enthusiasts"
        },
        {
          title: "Home Remedies & Natural Health",
          engagementRate: 80,
          trend: "stable",
          platforms: ["instagram", "pinterest"],
          audience: "Natural health seekers"
        },
        {
          title: "Healthcare Navigation Guides",
          engagementRate: 77,
          trend: "rising",
          platforms: ["linkedin", "youtube"],
          audience: "Healthcare consumers"
        }
      ],
      extraordinary: [
        {
          title: "Telemedicine Technology Reviews",
          predictedViews: "130K-260K",
          optimalTime: "Monday 8:00 PM EST",
          platforms: ["youtube", "linkedin"],
          hashtags: ["#HealthTech", "#Telemedicine", "#DigitalHealth"],
          uniqueness: 93,
          description: "Review and compare telemedicine platforms and digital health tools for consumers"
        },
        {
          title: "Health Myth Debunking Series",
          predictedViews: "180K-360K",
          optimalTime: "Thursday 7:00 PM EST",
          platforms: ["youtube", "instagram"],
          hashtags: ["#HealthMyths", "#MedicalFacts", "#HealthEducation"],
          uniqueness: 91,
          description: "Evidence-based debunking of common health myths with expert medical insights"
        },
        {
          title: "Personalized Medicine Insights",
          predictedViews: "150K-300K",
          optimalTime: "Tuesday 6:00 PM EST",
          platforms: ["linkedin", "youtube"],
          hashtags: ["#PersonalizedMedicine", "#PrecisionHealth", "#HealthInnovation"],
          uniqueness: 97,
          description: "Explore how genetic testing and AI are revolutionizing personalized healthcare"
        }
      ]
    }
  };

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId);
    setExpandedTier(null);
  };

  const toggleTier = (tier: 'popular' | 'extraordinary') => {
    setExpandedTier(expandedTier === tier ? null : tier);
  };

  const handleCreateContent = async (content: any) => {
    setSelectedContent(content);
    setShowAICreation(true);
    setIsCreatingContent(true);

    try {
      // Here you would typically send the content to your backend
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Content Created!",
        description: `"${content.title}" has been added to your content planner.`,
      });
      
      setShowAICreation(false);
    } catch (error) {
      console.error('Failed to create content:', error);
      toast({
        title: "Error",
        description: "Failed to create content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingContent(false);
    }
  };

  if (selectedDomain) {
    const domain = domains.find(d => d.id === selectedDomain);
    const recommendations = contentRecommendations[selectedDomain as keyof typeof contentRecommendations];

    return (
      <div className="flex h-screen bg-background">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedDomain(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ← Back to Domains
                </Button>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{domain?.emoji}</span>
                  <div>
                    <h1 className="text-2xl font-bold">{domain?.name}</h1>
                    <p className="text-muted-foreground">{domain?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Popular Content Section */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleTier('popular')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🔥</span>
                    <CardTitle className="text-xl">Your Audience's Top Interests in {domain?.name}</CardTitle>
                  </div>
                  {expandedTier === 'popular' ? <ChevronUp /> : <ChevronDown />}
                </div>
              </CardHeader>
              {expandedTier === 'popular' && (
                <CardContent className="space-y-4">
                  {recommendations?.popular.map((item, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{item.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>{item.engagementRate}% engagement</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{item.audience}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            {item.platforms.map((platform) => (
                              <Badge key={platform} variant="outline" className="text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={item.trend === 'rising' ? 'default' : 'secondary'}
                            className={item.trend === 'rising' ? 'bg-success text-success-foreground' : ''}
                          >
                            {item.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>

            {/* Extraordinary Content Section */}
            <Card className="border-l-4 border-l-trending">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleTier('extraordinary')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🚀</span>
                    <CardTitle className="text-xl">Extraordinary Content Ideas</CardTitle>
                  </div>
                  {expandedTier === 'extraordinary' ? <ChevronUp /> : <ChevronDown />}
                </div>
              </CardHeader>
              {expandedTier === 'extraordinary' && (
                <CardContent className="space-y-6">
                  {recommendations?.extraordinary.map((item, index) => (
                    <div key={index} className="p-6 border border-border rounded-xl bg-gradient-to-r from-card to-muted/30">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                          <p className="text-muted-foreground mb-4">{item.description}</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-trending to-orange-600 text-white">
                          {item.uniqueness}% Unique
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Predicted Views:</span>
                            <span className="text-sm text-success font-semibold">{item.predictedViews}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Optimal Time:</span>
                            <span className="text-sm">{item.optimalTime}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium">Platforms:</span>
                            <div className="flex space-x-2 mt-1">
                              {item.platforms.map((platform) => (
                                <Badge key={platform} variant="outline">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Hashtags:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.hashtags.map((hashtag) => (
                                <Badge key={hashtag} variant="secondary" className="text-xs">
                                  {hashtag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="btn-hero"
                        onClick={() => handleCreateContent(item)}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Create This Content
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          </div>
        </main>

        {/* AI Content Creation Dialog */}
        <Dialog open={showAICreation} onOpenChange={setShowAICreation}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Creating Content with Azure AI</span>
              </DialogTitle>
            </DialogHeader>
            
            {isCreatingContent ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2">Creating content with Azure AI...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedContent && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{selectedContent.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{selectedContent.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium">Predicted Views:</span>
                          <p className="text-success font-semibold">{selectedContent.predictedViews}</p>
                        </div>
                        <div>
                          <span className="font-medium">Uniqueness:</span>
                          <p className="text-primary font-semibold">{selectedContent.uniqueness}%</p>
                        </div>
                      </div>
                      
                      <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                        Powered by Azure OpenAI GPT-4.1-mini
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">Domain Explorer</h1>
            <p className="text-muted-foreground">
              Choose your content domain to discover personalized recommendations and trending opportunities
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain) => (
              <Card 
                key={domain.id}
                className="domain-card group"
                onClick={() => handleDomainSelect(domain.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4 animate-float">
                    {domain.emoji}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{domain.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {domain.description}
                  </p>
                  <Button variant="ghost" className="w-full group">
                    Explore Domain
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DomainExplorer;