import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { azureAIService } from "@/lib/azure-ai";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  TrendingUp,
  Calendar,
  Plus,
  X,
  MessageSquare
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'trends' | 'schedule';
}

const Chatbot = ({ isOpen, onClose, mode }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const modeConfig = {
    create: {
      title: "Content Creation Assistant",
      icon: Plus,
      welcomeMessage: "Hello! I'm your AI content creation assistant. I can help you brainstorm ideas, write content, and optimize your posts. What type of content would you like to create today?",
      suggestions: [
        "I need content ideas for fitness",
        "Help me write a caption for my latest post",
        "Generate hashtags for lifestyle content",
        "Create a content calendar for this week"
      ]
    },
    trends: {
      title: "Trend Analysis Assistant",
      icon: TrendingUp,
      welcomeMessage: "Hi! I'm your trend analysis assistant. I can help you identify trending topics, analyze hashtags, and discover viral opportunities. What trends would you like to explore?",
      suggestions: [
        "What's trending in fitness right now?",
        "Analyze trending hashtags in my niche",
        "Find viral content opportunities",
        "Predict upcoming trends"
      ]
    },
    schedule: {
      title: "Post Scheduling Assistant",
      icon: Calendar,
      welcomeMessage: "Hello! I'm your scheduling assistant. I can help you optimize posting times, create schedules, and plan your content calendar. How can I help with your scheduling?",
      suggestions: [
        "What's the best time to post today?",
        "Create a posting schedule for this week",
        "Optimize my content calendar",
        "Analyze my best performing times"
      ]
    }
  };

  const currentConfig = modeConfig[mode];

  useEffect(() => {
    if (isOpen) {
      // Add welcome message when chatbot opens
      const welcomeMessage: Message = {
        id: 'welcome',
        content: currentConfig.welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
      setSuggestions(currentConfig.suggestions);
    } else {
      // Clear messages when closing
      setMessages([]);
      setSuggestions([]);
      setInputValue('');
    }
  }, [isOpen, mode]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateSystemPrompt = (mode: string) => {
    switch (mode) {
      case 'create':
        return `You are an expert content creation assistant for social media. You help creators brainstorm ideas, write engaging content, generate hashtags, and optimize posts for maximum engagement. Be creative, specific, and actionable in your responses.`;
      case 'trends':
        return `You are a trend analysis expert for social media. You help creators identify trending topics, analyze hashtag performance, discover viral opportunities, and predict upcoming trends. Provide data-driven insights and actionable recommendations.`;
      case 'schedule':
        return `You are a social media scheduling expert. You help creators optimize posting times, create content calendars, analyze performance patterns, and plan strategic content schedules. Focus on timing optimization and scheduling strategies.`;
      default:
        return `You are a helpful AI assistant for content creators.`;
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const systemPrompt = generateSystemPrompt(mode);
      const response = await azureAIService.makeRequest(content, systemPrompt);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botMessage]);

      // Generate new suggestions based on the conversation
      const suggestionPrompt = `Based on this conversation about ${mode}, provide 3 helpful follow-up questions or suggestions. Return only the suggestions as a JSON array.`;
      try {
        const suggestionResponse = await azureAIService.makeRequest(suggestionPrompt, systemPrompt);
        const newSuggestions = JSON.parse(suggestionResponse);
        if (Array.isArray(newSuggestions)) {
          setSuggestions(newSuggestions.slice(0, 3));
        }
      } catch (error) {
        console.log('Failed to generate suggestions, using defaults');
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Azure AI Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center space-x-2">
            <currentConfig.icon className="w-5 h-5" />
            <span>{currentConfig.title}</span>
            <Badge variant="secondary" className="ml-auto">
              Azure AI
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 border rounded-lg mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Azure AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Suggestions */}
          {suggestions.length > 0 && !isLoading && (
            <div className="flex-shrink-0 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="flex-shrink-0">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Ask me about ${mode === 'create' ? 'content creation' : mode === 'trends' ? 'trends' : 'scheduling'}...`}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Chatbot; 