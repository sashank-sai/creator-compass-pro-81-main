# Azure AI Integration Setup Guide

This guide explains how to set up and use the Azure AI integration in the ICCAP platform.

## Overview

The ICCAP platform now uses Azure OpenAI GPT-4.1-mini for AI-powered features including:
- Content suggestions and recommendations
- AI insights for dashboard analytics
- Hashtag optimization
- Content performance analysis

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with your Azure OpenAI API key:

```env
VITE_AZURE_API_KEY=your_azure_openai_api_key_here
```

### 2. Azure OpenAI Configuration

The application is configured to use the following Azure OpenAI settings:
- **Base Endpoint**: `https://delhihackathon.openai.azure.com/`
- **Deployment Name**: `gpt-4.1-mini`
- **API Version**: `2025-01-01-preview`
- **Full URL**: `https://delhihackathon.openai.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2025-01-01-preview`

### 3. Features Integrated

#### Dashboard - AI Insights
- **Location**: Dashboard page, "AI Insights" button
- **Functionality**: Generates actionable insights about content performance and trends
- **API Call**: `azureAIService.generateAIInsights()`

#### Content Planner - AI Suggestions
- **Location**: Content Planner page, "AI Suggest" button in create content dialog
- **Functionality**: Generates content ideas based on selected domain and platform
- **API Call**: `azureAIService.generateContentSuggestions(domain, platform)`

#### Domain Explorer - Content Creation
- **Location**: Domain Explorer page, "Create This Content" buttons
- **Functionality**: Creates content based on AI-generated recommendations
- **Integration**: Connects with content planning workflow

### 4. API Service Structure

The Azure AI service (`src/lib/azure-ai.ts`) provides the following methods:

```typescript
// Generate content suggestions
generateContentSuggestions(domain: string, platform: string): Promise<ContentSuggestion[]>

// Generate AI insights
generateAIInsights(): Promise<AIInsight[]>

// Generate hashtag suggestions
generateHashtagSuggestions(content: string, platform: string): Promise<string[]>

// Analyze content performance
analyzeContentPerformance(contentData: any): Promise<string>
```

### 5. Error Handling

The application includes comprehensive error handling:
- API key validation
- Network error handling
- JSON parsing fallbacks
- User-friendly error messages via toast notifications

### 6. Development Notes

- **Mock Data Fallback**: If Azure AI is unavailable, the app falls back to mock data
- **Loading States**: All AI interactions show loading indicators
- **Responsive Design**: AI dialogs are responsive and mobile-friendly
- **Type Safety**: Full TypeScript support with proper interfaces

### 7. Testing the Integration

1. Set your Azure API key in the `.env` file
2. Start the development server: `npm run dev`
3. Navigate to the Dashboard and click "AI Insights"
4. Try the Content Planner's "AI Suggest" feature
5. Test the Domain Explorer's content creation

### 8. Troubleshooting

**Common Issues:**

1. **"Azure API key not configured"**
   - Ensure your `.env` file exists and contains `VITE_AZURE_API_KEY`
   - Restart the development server after adding the environment variable

2. **"Azure AI API error"**
   - Verify your API key is correct
   - Check if the Azure OpenAI service is accessible
   - Ensure you have sufficient quota/credits
   - Check browser console for detailed error messages

3. **"Failed to parse AI response"**
   - The app will fall back to mock data
   - Check the browser console for detailed error information

4. **API Structure Issues**
   - The app now uses the correct Azure OpenAI API structure
   - Matches the Python SDK format you provided
   - Includes proper model parameter and request structure

5. **Connection Test**
   - The app now includes a connection test before making AI requests
   - Check browser console for "Azure AI Request Config" logs
   - Look for "Azure AI Test Response" to verify connectivity

### 9. Security Considerations

- Never commit your API key to version control
- Use environment variables for sensitive configuration
- Consider implementing rate limiting for production use
- Monitor API usage and costs

### 10. Future Enhancements

Potential improvements for the Azure AI integration:
- Caching AI responses for better performance
- Batch processing for multiple content suggestions
- Advanced prompt engineering for better results
- Integration with content scheduling systems
- Real-time AI-powered analytics

## Support

For issues with the Azure AI integration, check:
1. Browser console for error messages
2. Network tab for API request/response details
3. Azure OpenAI service status
4. API key permissions and quota 