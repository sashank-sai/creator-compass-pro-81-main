import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/common/Header";
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Zap, 
  Users, 
  Calendar,
  ArrowRight,
  Play,
  Check,
  Star
} from "lucide-react";

const Landing = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Unified Analytics",
      description: "Track performance across all platforms in one dashboard"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Get personalized content recommendations based on data"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Trend Prediction",
      description: "Stay ahead with viral content prediction algorithms"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Audience Analysis",
      description: "Deep dive into your audience demographics and behavior"
    }
  ];

  const painPoints = [
    "Fragmented Analytics Across Platforms",
    "Content Strategy Blindness",
    "Reactive vs Proactive Approach",
    "Time-Consuming Manual Analysis"
  ];

  const solutions = [
    "Unified Cross-Platform Dashboard",
    "AI-Powered Content Intelligence",
    "Predictive Trend Analysis",
    "Automated Insights & Recommendations"
  ];

  const stats = [
    { value: "500K+", label: "Content Creators" },
    { value: "2.5M+", label: "Posts Analyzed" },
    { value: "87%", label: "Engagement Increase" },
    { value: "24/7", label: "Real-time Monitoring" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header isLanding={true} />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Transform Content Creation from{" "}
              <span className="gradient-text">Reactive Analytics</span>{" "}
              to{" "}
              <span className="gradient-text">Proactive Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              The only platform that turns fragmented social media data into actionable content strategies 
              that drive real engagement and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Button className="btn-hero text-lg px-8 py-4">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="btn-hero-outline text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Problems */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">The Content Creator's Dilemma</h2>
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-destructive" />
                  </div>
                  <span className="text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>

            {/* Solutions */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-8">Our Solution</h2>
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-foreground font-medium">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Content Success</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, analyze, and optimize your content strategy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="domain-card p-6 text-center hover-scale"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary-foreground">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-hero rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Content Strategy?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who've already elevated their content game with ICCAP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 font-semibold">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <div className="flex items-center space-x-1 text-sm opacity-90">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-2">Trusted by 10,000+ creators</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IC</span>
              </div>
              <span className="text-xl font-bold gradient-text">ICCAP</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 ICCAP. Transforming content creation with intelligent analytics.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;