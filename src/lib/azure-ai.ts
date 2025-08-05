// Azure AI Service for ICCAP
// Handles all AI-related API calls to Azure OpenAI

const AZURE_ENDPOINT = 'https://delhihackathon.openai.azure.com';
const DEPLOYMENT_NAME = 'gpt-4.1-mini';
const API_VERSION = '2025-01-01-preview';

// You'll need to set this as an environment variable
const AZURE_API_KEY = import.meta.env.VITE_AZURE_API_KEY || import.meta.env.AZURE_OPENAI_API_KEY || '';

// Debug environment variables
console.log('Environment variables check:', {
  VITE_AZURE_API_KEY: import.meta.env.VITE_AZURE_API_KEY ? 'Set' : 'Not set',
  AZURE_OPENAI_API_KEY: import.meta.env.AZURE_OPENAI_API_KEY ? 'Set' : 'Not set',
  finalKey: AZURE_API_KEY ? 'Available' : 'Not available',
  keyLength: AZURE_API_KEY ? AZURE_API_KEY.length : 0
});

export interface AzureAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ContentSuggestion {
  title: string;
  description: string;
  hashtags: string[];
  platforms: string[];
  estimatedViews: string;
  engagementPrediction: number;
  optimalTime: string;
}

export interface AIInsight {
  type: 'performance' | 'trend' | 'recommendation' | 'alert';
  title: string;
  description: string;
  action?: string;
  priority: 'low' | 'medium' | 'high';
}

class AzureAIService {
  async makeRequest(prompt: string, systemMessage?: string): Promise<string> {
    if (!AZURE_API_KEY) {
      throw new Error('Azure API key not configured. Please set VITE_AZURE_API_KEY environment variable.');
    }

    console.log('Azure AI Request Config:', {
      endpoint: AZURE_ENDPOINT,
      deployment: DEPLOYMENT_NAME,
      apiVersion: API_VERSION,
      hasApiKey: !!AZURE_API_KEY,
      apiKeyLength: AZURE_API_KEY ? AZURE_API_KEY.length : 0,
      apiKeyStart: AZURE_API_KEY ? AZURE_API_KEY.substring(0, 10) + '...' : 'none'
    });

    const messages = [
      {
        role: 'system',
        content: systemMessage || 'You are an AI assistant specialized in content creation and social media analytics. Provide helpful, actionable insights and suggestions.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    try {
      const requestUrl = `${AZURE_ENDPOINT}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=${API_VERSION}`;
      console.log('Making Azure AI request to:', requestUrl);
      console.log('Request payload:', {
        model: DEPLOYMENT_NAME,
        messages,
        max_tokens: 13107,
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null,
        stream: false
      });

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_API_KEY,
        },
        body: JSON.stringify({
          messages,
          max_tokens: 13107,
          temperature: 0.7,
          top_p: 0.95,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: null
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Azure API Error Response:', errorText);
        console.error('Response status:', response.status);
        console.error('Response status text:', response.statusText);
        
        // Try to parse error response for more details
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(`Azure AI API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        } catch {
          throw new Error(`Azure AI API error: ${response.status} ${response.statusText} - ${errorText}`);
        }
      }

      const data: AzureAIResponse = await response.json();
      console.log('Azure AI response data:', data);
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response choices from Azure AI');
      }
      
      return data.choices[0]?.message?.content || 'No response from AI';
    } catch (error) {
      console.error('Azure AI request failed:', error);
      throw error;
    }
  }

  // Generate content suggestions for a specific domain
  async generateContentSuggestions(domain: string, platform: string): Promise<ContentSuggestion[]> {
    const prompt = `Generate 3 creative content ideas for the ${domain} domain on ${platform}. 
    For each idea, provide:
    - A catchy title
    - A brief description (2-3 sentences)
    - 3-5 relevant hashtags
    - Estimated views range (e.g., "100K-200K")
    - Engagement prediction percentage (5-15%)
    - Optimal posting time (day and time)
    
    Format the response as a JSON array with these fields: title, description, hashtags, platforms, estimatedViews, engagementPrediction, optimalTime.`;

    const systemMessage = `You are a content strategy expert. Generate innovative, engaging content ideas that are tailored to specific platforms and domains. Focus on trending topics and viral potential.`;

    try {
      const response = await this.makeRequest(prompt, systemMessage);
      
      // Try to parse JSON response
      try {
        const suggestions = JSON.parse(response);
        return suggestions.map((suggestion: any) => ({
          title: suggestion.title,
          description: suggestion.description,
          hashtags: suggestion.hashtags || [],
          platforms: suggestion.platforms || [platform],
          estimatedViews: suggestion.estimatedViews || "50K-100K",
          engagementPrediction: suggestion.engagementPrediction || 8.0,
          optimalTime: suggestion.optimalTime || "Monday 7:00 PM EST"
        }));
      } catch (parseError) {
        // If JSON parsing fails, return a fallback suggestion
        console.warn('Failed to parse AI response as JSON, using fallback:', parseError);
        return [{
          title: `AI-Generated ${domain} Content`,
          description: response.substring(0, 200) + "...",
          hashtags: [`#${domain}`, "#ContentCreation", "#SocialMedia"],
          platforms: [platform],
          estimatedViews: "50K-100K",
          engagementPrediction: 8.0,
          optimalTime: "Monday 7:00 PM EST"
        }];
      }
    } catch (error) {
      console.error('Failed to generate content suggestions:', error);
      throw error;
    }
  }

  // Generate AI insights for dashboard
  async generateAIInsights(): Promise<AIInsight[]> {
    const prompt = `Analyze the current content creator landscape and provide 3-5 actionable insights. 
    Focus on:
    - Performance trends
    - Content opportunities
    - Platform-specific recommendations
    - Emerging trends
    
    For each insight, provide:
    - Type (performance, trend, recommendation, or alert)
    - Title
    - Description
    - Priority (low, medium, or high)
    - Optional action item
    
    Format as JSON array with fields: type, title, description, action, priority.`;

    const systemMessage = `You are a social media analytics expert. Provide data-driven insights that help content creators improve their performance and stay ahead of trends.`;

    try {
      const response = await this.makeRequest(prompt, systemMessage);
      
      try {
        const insights = JSON.parse(response);
        return insights.map((insight: any) => ({
          type: insight.type || 'recommendation',
          title: insight.title,
          description: insight.description,
          action: insight.action,
          priority: insight.priority || 'medium'
        }));
      } catch (parseError) {
        console.warn('Failed to parse AI insights as JSON, using fallback:', parseError);
        return [{
          type: 'recommendation' as const,
          title: 'AI-Powered Content Optimization',
          description: response.substring(0, 200) + "...",
          priority: 'medium' as const
        }];
      }
    } catch (error) {
      console.error('Failed to generate AI insights:', error);
      throw error;
    }
  }

  // Generate hashtag suggestions
  async generateHashtagSuggestions(content: string, platform: string): Promise<string[]> {
    const prompt = `Generate 5-8 relevant hashtags for this content on ${platform}: "${content}"
    
    Consider:
    - Platform-specific hashtag trends
    - Content relevance
    - Viral potential
    - Mix of popular and niche hashtags
    
    Return only the hashtags as a JSON array.`;

    const systemMessage = `You are a hashtag optimization expert. Generate hashtags that maximize reach and engagement while staying relevant to the content.`;

    try {
      const response = await this.makeRequest(prompt, systemMessage);
      
      try {
        const hashtags = JSON.parse(response);
        return hashtags.filter((tag: string) => tag.startsWith('#'));
      } catch (parseError) {
        console.warn('Failed to parse hashtags as JSON, using fallback:', parseError);
        return ['#ContentCreation', '#SocialMedia', '#Trending'];
      }
    } catch (error) {
      console.error('Failed to generate hashtag suggestions:', error);
      throw error;
    }
  }

  // Analyze content performance and provide recommendations
  async analyzeContentPerformance(contentData: any): Promise<string> {
    const prompt = `Analyze this content performance data and provide actionable recommendations:
    
    Content Data: ${JSON.stringify(contentData, null, 2)}
    
    Provide insights on:
    - What's working well
    - Areas for improvement
    - Specific recommendations
    - Trend analysis
    
    Keep the response concise and actionable (2-3 paragraphs).`;

    const systemMessage = `You are a content performance analyst. Provide data-driven insights and actionable recommendations to improve content performance.`;

    try {
      const response = await this.makeRequest(prompt, systemMessage);
      return response;
    } catch (error) {
      console.error('Failed to analyze content performance:', error);
      throw error;
    }
  }

  // Test function to verify Azure AI connection
  async testConnection(): Promise<boolean> {
    const prompt = "Hello, please respond with 'Azure AI is working correctly' if you can see this message.";
    const systemMessage = "You are a helpful assistant. Respond briefly and directly.";

    try {
      console.log('Testing Azure AI connection...');
      console.log('Environment check:', {
        hasApiKey: !!AZURE_API_KEY,
        apiKeyLength: AZURE_API_KEY ? AZURE_API_KEY.length : 0,
        endpoint: AZURE_ENDPOINT,
        deployment: DEPLOYMENT_NAME
      });
      
      const response = await this.makeRequest(prompt, systemMessage);
      console.log('Azure AI Test Response:', response);
      return response.includes('Azure AI is working correctly') || response.length > 0;
    } catch (error) {
      console.error('Azure AI Connection Test Failed:', error);
      return false;
    }
  }

  // Check environment configuration
  checkEnvironment(): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];
    
    if (!AZURE_API_KEY) {
      issues.push('Azure API key is not configured');
    } else if (AZURE_API_KEY.length < 10) {
      issues.push('Azure API key appears to be too short');
    }
    
    if (!AZURE_ENDPOINT) {
      issues.push('Azure endpoint is not configured');
    }
    
    if (!DEPLOYMENT_NAME) {
      issues.push('Deployment name is not configured');
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  }
}

// Export singleton instance
export const azureAIService = new AzureAIService(); 