
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { MessageSquare, Send, X, MinusCircle, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  
  // Scroll to bottom of messages on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = language === 'id'
        ? 'Halo! Apa yang bisa saya bantu hari ini?'
        : 'Hello! How can I help you today?';
        
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length, language]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Format messages for API
      const formattedMessages = messages
        .concat(userMessage)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { 
          messages: formattedMessages,
          language
        }
      });
      
      if (error) throw new Error(error.message);
      
      // Add assistant response
      setMessages(prev => [
        ...prev, 
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
          timestamp: new Date()
        }
      ]);
    } catch (error: any) {
      console.error('Error in chat:', error);
      toast.error(
        language === 'id' ? 'Gagal mengirim pesan' : 'Failed to send message',
        { description: error.message }
      );
      
      // Add error message
      setMessages(prev => [
        ...prev, 
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: language === 'id' 
            ? 'Maaf, terjadi kesalahan. Silakan coba lagi.' 
            : 'Sorry, there was an error. Please try again.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
        variant="default"
      >
        <MessageSquare size={24} />
      </Button>
    );
  }

  return (
    <div className={`fixed ${isMinimized ? 'bottom-6 right-6' : 'bottom-[5%] right-[5%]'} z-50 transition-all duration-300`}>
      {isMinimized ? (
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
          variant="default"
        >
          <MessageSquare size={24} />
        </Button>
      ) : (
        <Card className="w-[350px] md:w-[400px] shadow-xl border-primary/20">
          <CardHeader className="bg-primary text-primary-foreground py-3 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6" />
                <CardTitle className="text-lg font-medium">
                  {language === 'id' ? 'Asisten AI' : 'AI Assistant'}
                </CardTitle>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground h-8 w-8 hover:bg-primary-foreground/10"
                  onClick={() => setIsMinimized(true)}
                >
                  <MinusCircle size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground h-8 w-8 hover:bg-primary-foreground/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 relative">
            <div className="h-[350px] overflow-y-auto p-4 bg-muted/30">
              <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-5" 
                style={{ 
                  backgroundImage: `url(/scarf2.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[80%] px-4 py-2 rounded-lg shadow-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-none'
                          : 'bg-card border border-border rounded-tl-none'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-center mb-1">
                          <Bot size={14} className="mr-1 text-primary" />
                          <span className="text-xs font-medium text-primary">
                            {language === 'id' ? 'Asisten AI' : 'AI Assistant'}
                          </span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <div className="flex w-full gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={language === 'id' ? 'Ketik pesan...' : 'Type a message...'}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                variant="default" 
                size="icon"
                disabled={isLoading || !inputMessage.trim()}
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary/90"
              >
                <Send size={18} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
