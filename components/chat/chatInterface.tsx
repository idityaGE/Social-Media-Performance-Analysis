'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { MarkdownMessage } from '../MarkdownMessage';
import { Message } from '@/types/chat';
import axios from 'axios';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        messages: [...messages, userMessage]
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.content,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'error',
        content: 'Sorry, there was an error processing your message. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl px-4">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4 py-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`${message.role === 'user' ? 'ml-auto' : 'mr-auto'
                } max-w-[85%] w-fit`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="shrink-0">
                    <AvatarImage src={message.role === 'user' ? '/user-avatar.png' : '/ai-avatar.png'} />
                    <AvatarFallback>{message.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="text-sm font-semibold">
                      {message.role === 'user' ? 'You' : message.role === 'error' ? 'Error' : 'AI'}
                    </div>
                    <div className="break-words">
                      {message.role === 'user' ? (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      ) : (
                        <MarkdownMessage content={message.content} />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm text-muted-foreground">AI is thinking...</span>
        </div>
      )}

      <div className="mt-4 border-t pt-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

