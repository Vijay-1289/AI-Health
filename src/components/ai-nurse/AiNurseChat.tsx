
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
      content: "Hello! I'm your AI health assistant. How can I help you today? You can ask me about medications, symptoms, or get treatment suggestions for common ailments.",
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
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
    // This is a simplified simulation for common medical conditions and medications
    // In a real implementation, we would call the Gemini API using the provided key
    
    // Sample responses prioritizing medication suggestions over doctor consultations
    const medicationResponses: Record<string, string> = {
      'fever': "For fever, you can take acetaminophen (Tylenol) or ibuprofen (Advil, Motrin) as directed on packaging. Adults typically take 325-650mg every 4-6 hours of acetaminophen, not exceeding 3000mg daily. Stay hydrated and rest. If fever persists for more than 3 days or exceeds 103°F (39.4°C), visit a nearby hospital.",
      'headache': "For headaches, try ibuprofen (Advil) 200-400mg or acetaminophen (Tylenol) 500mg every 4-6 hours as needed. Ensure you're hydrated and consider resting in a dark, quiet room. If headaches are severe or persistent, Apollo Hospital in Vijayawada provides specialized care.",
      'cough': "For a dry cough, try dextromethorphan (Robitussin DM) 10-20mg every 4 hours, not exceeding 120mg daily. For productive cough, guaifenesin (Mucinex) 200-400mg every 4 hours can help. Stay hydrated and use honey with warm water. Take these medications for 5-7 days. If symptoms worsen, visit Kamineni Hospital in Vijayawada.",
      'cold': "For common cold symptoms, take acetaminophen (Tylenol) 500mg every 6 hours for pain/fever, pseudoephedrine (Sudafed) 60mg every 4-6 hours for congestion, and diphenhydramine (Benadryl) 25mg every 6 hours for runny nose. Use these medications for 3-5 days while resting and staying hydrated.",
      'sore throat': "For a sore throat, try acetaminophen (Tylenol) 500mg or ibuprofen (Advil) 400mg every 6 hours. Gargle with warm salt water (1/4 tsp salt in 8oz water) every 2-3 hours. Throat lozenges with benzocaine can provide temporary relief. Continue treatment for 3-5 days.",
      'allergies': "For allergies, take cetirizine (Zyrtec) 10mg or loratadine (Claritin) 10mg once daily. For severe symptoms, fexofenadine (Allegra) 180mg once daily may be more effective. Avoid known allergens and continue medication for as long as exposed to allergens.",
    };
    
    // Default medication responses for unknown conditions
    const defaultResponses = [
      "Based on your symptoms, you could try acetaminophen (Tylenol) 500mg every 6 hours for pain and fever. Stay hydrated and rest. If symptoms persist for more than 3 days, consider visiting Krishna Institute of Medical Sciences in Vijayawada.",
      "For those symptoms, ibuprofen (Advil) 400mg every 6 hours with food may help reduce inflammation and discomfort. Use for 3-5 days. If not improving, Andhra Hospitals in Vijayawada offers excellent care.",
      "You might benefit from diphenhydramine (Benadryl) 25mg every 6 hours for those symptoms. Stay hydrated and get plenty of rest. Use for 2-3 days and if not improving, consider visiting NRI General Hospital in Guntur.",
      "Try loratadine (Claritin) 10mg once daily for your symptoms. This antihistamine can help with those issues for 24 hours. If symptoms persist for more than a week, Manipal Hospital in Vijayawada is recommended."
    ];
    
    // Try to match query with known conditions
    const lowercaseQuery = query.toLowerCase();
    let response = '';
    
    for (const [condition, medication] of Object.entries(medicationResponses)) {
      if (lowercaseQuery.includes(condition)) {
        response = medication;
        break;
      }
    }
    
    // If no match found, use a default response
    if (!response) {
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return response;
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

  return (
    <div className="flex flex-col h-[600px] rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="bg-healSmart-blue text-white p-4">
        <h3 className="text-xl font-semibold">AI Health Assistant</h3>
        <p className="text-sm text-blue-100">Ask about symptoms for medication recommendations</p>
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
              placeholder="Describe your symptoms for medication suggestions..."
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
            Ask about symptoms to get medication recommendations and dosage information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiNurseChat;
