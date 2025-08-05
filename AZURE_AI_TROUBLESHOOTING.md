# Azure AI Troubleshooting Guide

If you're getting "Failed to generate AI insights" errors, follow these steps to debug and fix the issue.

## 🔍 Step 1: Check Environment Variables

1. **Verify your `.env` file exists** in the root directory
2. **Check your API key** is correctly set:
   ```env
   # You can use either of these:
   VITE_AZURE_API_KEY=45XwREpW0VDCjInZF1BZtXWiZmVjP0GhmRI6hCM6nths0gDxGY6pJQQJ99BGACYeBjFXJ3w3AAABACOGo1uo
   # OR
   AZURE_OPENAI_API_KEY=45XwREpW0VDCjInZF1BZtXWiZmVjP0GhmRI6hCM6nths0gDxGY6pJQQJ99BGACYeBjFXJ3w3AAABACOGo1uo
   ```
3. **Restart your development server** after making changes:
   ```bash
   npm run dev
   ```

## 🧪 Step 2: Use the AI Test Page

1. **Navigate to the test page**: Go to `http://localhost:8080/ai-test`
2. **Run the connection tests** to identify the specific issue
3. **Check the browser console** for detailed error messages

## 🔧 Step 3: Common Issues and Solutions

### Issue 1: "Azure API key not configured"
**Solution**: 
- Create a `.env` file in the root directory
- Add your API key: `VITE_AZURE_API_KEY=your_key_here`
- Restart the development server

### Issue 2: "401 Unauthorized"
**Solution**:
- Verify your API key is correct
- Check if the API key has expired
- Ensure you have sufficient quota/credits

### Issue 3: "404 Not Found"
**Solution**:
- Verify the deployment name is correct: `gpt-4.1-mini`
- Check if the Azure OpenAI service is accessible
- Ensure the API version is correct: `2025-01-01-preview`

### Issue 4: "429 Too Many Requests"
**Solution**:
- Wait a few minutes before trying again
- Check your Azure OpenAI quota limits
- Consider upgrading your plan if needed

### Issue 5: "500 Internal Server Error"
**Solution**:
- This is usually a temporary Azure service issue
- Wait a few minutes and try again
- Check Azure service status

## 📊 Step 4: Debug Information

The enhanced error logging will show you:

1. **Request URL**: The exact endpoint being called
2. **Request payload**: The data being sent to Azure
3. **Response status**: HTTP status code
4. **Response headers**: Server response headers
5. **Error details**: Specific error message from Azure

## 🛠️ Step 5: Manual Testing

You can test the Azure AI connection manually:

1. **Open browser console** (F12)
2. **Try the AI features** and watch for console logs
3. **Look for these log messages**:
   - "Azure AI Request Config"
   - "Making Azure AI request to:"
   - "Response status:"
   - "Azure AI response data:"

## 🔗 Step 6: Verify Azure Configuration

Ensure your Azure OpenAI setup matches:

- **Endpoint**: `https://delhihackathon.openai.azure.com/`
- **Deployment**: `gpt-4.1-mini`
- **API Version**: `2025-01-01-preview`
- **Model**: `gpt-4.1-mini`

## 📞 Step 7: Get Help

If you're still having issues:

1. **Check the browser console** for detailed error messages
2. **Use the AI Test page** to run diagnostics
3. **Share the error messages** for further assistance
4. **Verify your Azure OpenAI service** is active and accessible

## 🎯 Quick Fix Checklist

- [ ] `.env` file exists in root directory
- [ ] API key is correctly set in `.env`
- [ ] Development server restarted after changes
- [ ] Browser console checked for errors
- [ ] AI Test page used for diagnostics
- [ ] Azure OpenAI service is accessible
- [ ] API key has sufficient quota

## 🚀 Testing the Fix

After making changes:

1. **Restart the development server**
2. **Go to Dashboard** and click "AI Insights"
3. **Try the chatbot** by clicking quick actions
4. **Check for success messages** instead of errors

If you're still experiencing issues, the enhanced error logging will provide specific details about what's going wrong. 