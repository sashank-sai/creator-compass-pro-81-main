import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { azureAIService } from "@/lib/azure-ai";
import { useToast } from "@/hooks/use-toast";
import { Loader2, TestTube, CheckCircle, XCircle } from "lucide-react";

const AITest = () => {
  const [testMessage, setTestMessage] = useState("Hello, please respond with 'Azure AI is working correctly' if you can see this message.");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const { toast } = useToast();

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runAllTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      // Test 1: Environment Variables
      addResult('=== ENVIRONMENT VARIABLES CHECK ===');
      addResult(`VITE_AZURE_API_KEY: ${import.meta.env.VITE_AZURE_API_KEY ? 'SET' : 'NOT SET'}`);
      addResult(`AZURE_OPENAI_API_KEY: ${import.meta.env.AZURE_OPENAI_API_KEY ? 'SET' : 'NOT SET'}`);
      addResult(`VITE_AZURE_API_KEY length: ${import.meta.env.VITE_AZURE_API_KEY?.length || 0}`);
      addResult(`AZURE_OPENAI_API_KEY length: ${import.meta.env.AZURE_OPENAI_API_KEY?.length || 0}`);
      
      // Test 2: Environment Check
      addResult('\n=== ENVIRONMENT CHECK ===');
      const envCheck = azureAIService.checkEnvironment();
      addResult(`Environment valid: ${envCheck.isValid}`);
      if (!envCheck.isValid) {
        envCheck.issues.forEach(issue => addResult(`❌ ${issue}`));
      } else {
        addResult('✅ Environment is properly configured');
      }

      // Test 3: Connection Test
      addResult('\n=== CONNECTION TEST ===');
      const isConnected = await azureAIService.testConnection();
      if (isConnected) {
        addResult('✅ Azure AI connection successful');
      } else {
        addResult('❌ Azure AI connection failed');
      }

      // Test 4: Simple Message Test
      addResult('\n=== SIMPLE MESSAGE TEST ===');
      try {
        const response = await azureAIService.makeRequest('Hello, please respond with "Test successful"', 'You are a helpful assistant.');
        addResult(`✅ Response received: ${response.substring(0, 100)}...`);
      } catch (error) {
        addResult(`❌ Message test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

    } catch (error) {
      addResult(`❌ Test suite failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const runSingleTest = async () => {
    if (!testMessage.trim()) return;
    
    setIsLoading(true);
    setResponse("");
    
    try {
      const result = await azureAIService.makeRequest(testMessage, "You are a helpful assistant.");
      setResponse(result);
      toast({
        title: "Success",
        description: "Message sent successfully!",
      });
    } catch (error) {
      console.error('Single test failed:', error);
      setResponse(error instanceof Error ? error.message : 'Unknown error occurred');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Azure AI Connection Test</h1>
        <p className="text-muted-foreground">
          Test your Azure AI connection and debug any issues
        </p>
      </div>

      <div className="grid gap-6">
        {/* Connection Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTube className="w-5 h-5" />
              <span>Connection Tests</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={runAllTests} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>

            {testResults.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Test Results:</h3>
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                    {result.includes('✅') ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{result}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Single Message Test */}
        <Card>
          <CardHeader>
            <CardTitle>Single Message Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test-message">Test Message</Label>
              <Input
                id="test-message"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Enter a test message..."
                className="mt-1"
              />
            </div>
            
            <Button 
              onClick={runSingleTest} 
              disabled={isLoading || !testMessage.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4 mr-2" />
                  Send Test Message
                </>
              )}
            </Button>

            {response && (
              <div className="mt-4">
                <Label>Response:</Label>
                <div className="mt-1 p-3 bg-muted rounded border">
                  <pre className="whitespace-pre-wrap text-sm">{response}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Environment Info */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Azure Endpoint:</span> 
                <span className="ml-2 text-muted-foreground">https://delhihackathon.openai.azure.com/</span>
              </div>
              <div>
                <span className="font-medium">Deployment:</span> 
                <span className="ml-2 text-muted-foreground">gpt-4.1-mini</span>
              </div>
              <div>
                <span className="font-medium">API Version:</span> 
                <span className="ml-2 text-muted-foreground">2025-01-01-preview</span>
              </div>
              <div>
                <span className="font-medium">API Key:</span> 
                <span className="ml-2 text-muted-foreground">
                  {import.meta.env.VITE_AZURE_API_KEY ? '✅ Configured' : '❌ Not configured'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITest; 