
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Mic, MicOff, Send } from 'lucide-react';
import { toast } from "sonner";

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AiNurseChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm your AI health assistant. How can I help you today? You can ask me about medications, symptoms, prevention tips, or general health advice.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasSpeechRecognition, setHasSpeechRecognition] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check if speech recognition is available
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      setHasSpeechRecognition(true);

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error("Failed to recognize speech. Please try again.");
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.info("Listening... Speak now!");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the Gemini API to get a response
      const response = await fetchGeminiResponse(input);
      
      // Add AI response
      const aiMessage: Message = {
        content: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);

      // Convert AI response to speech
      speakResponse(response);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      toast.error("Sorry, I couldn't process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGeminiResponse = async (query: string) => {
    // This is a simplified example - in a real app, you would make a proper API call
    // to Gemini API using the provided API key: AIzaSyAff7A4dBVrLDuKnOYbaWLKXt1MFgLWUbQ
    
    // For now, we'll simulate a response
    const healthResponses = [
      "Based on your symptoms, it could be a common cold. Rest, stay hydrated, and take over-the-counter pain relievers if needed. If symptoms worsen, please consult a doctor.",
      "It's important to maintain a balanced diet rich in fruits, vegetables, and whole grains to support your immune system.",
      "Regular exercise is key to maintaining good health. Aim for at least 150 minutes of moderate activity per week.",
      "Make sure to take your medication as prescribed by your doctor. Do not adjust dosages without medical supervision.",
      "Those symptoms could indicate several conditions. I recommend consulting with one of our doctors in Vijayawada or Eluru for a proper diagnosis.",
      "Prevention is better than cure. Regular handwashing, staying up-to-date with vaccinations, and avoiding close contact with sick individuals can help prevent many illnesses.",
      "For that condition, I recommend rest and applying a cold compress to the affected area. If pain persists for more than a few days, please consult a healthcare provider."
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a relevant health response
    return healthResponses[Math.floor(Math.random() * healthResponses.length)];
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-US';
      window.speechSynthesis.speak(speech);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="bg-healSmart-blue text-white p-4">
        <h3 className="text-xl font-semibold">AI Health Assistant</h3>
        <p className="text-sm text-blue-100">Ask any health-related questions or concerns</p>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-healSmart-blue text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <Card className="border-t rounded-none">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            {hasSpeechRecognition && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleListening}
                className={isListening ? "bg-red-100 text-red-500" : ""}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </Button>
            )}
            <Input
              placeholder="Type your health question here..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              className="flex-grow"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-healSmart-blue hover:bg-blue-700"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ask about symptoms, medications, preventive measures, or general health advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiNurseChat;
