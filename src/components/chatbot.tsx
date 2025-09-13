
'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { Bot, Loader, Send, User, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatAboutPortfolio } from '@/ai/flows/portfolio-chat-flow';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ChatState = {
  messages: Message[];
  error?: string;
};

const initialState: ChatState = {
  messages: [
    {
      role: 'assistant',
      content: "Hello! I'm an AI assistant. How can I help you learn about this developer's portfolio?",
    },
  ],
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  async function chatAction(_prevState: ChatState, formData: FormData): Promise<ChatState> {
    const question = formData.get('question') as string;
    if (!question) return _prevState;

    const newMessages: Message[] = [
      ..._prevState.messages,
      { role: 'user', content: question },
    ];

    try {
      const result = await chatAboutPortfolio(question);
      return {
        messages: [
          ...newMessages,
          { role: 'assistant', content: result.answer },
        ],
      };
    } catch (error) {
      console.error('AI chat error:', error);
      return {
        messages: newMessages,
        error: 'Sorry, I encountered an error. Please try again.',
      };
    }
  }
  
  const [state, formAction, isPending] = useActionState(chatAction, initialState);

  useEffect(() => {
    if (!isPending) {
      setInput('');
    }
  }, [isPending]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: 'smooth',
        });
    }
  }, [state.messages]);

  return (
    <>
      <div className={cn("fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out", {
        'transform scale-0 opacity-0': isOpen,
        'transform scale-100 opacity-100': !isOpen,
      })}>
        <Button onClick={() => setIsOpen(true)} size="lg" className="rounded-full shadow-lg">
          <MessageSquare className="mr-2 h-5 w-5" />
          Ask AI Assistant
        </Button>
      </div>

      <div className={cn("fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out", {
          'transform scale-100 opacity-100': isOpen,
          'transform scale-0 opacity-0': !isOpen,
        })}>
        <Card className="w-[350px] h-[500px] shadow-2xl flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-headline">AI Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 p-6" viewportRef={scrollAreaRef}>
              <div className="space-y-4">
                {state.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      message.role === 'user' ? 'justify-end' : ''
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Bot className="h-5 w-5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm ${
                        message.role === 'user'
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.role === 'user' && (
                       <div className="bg-secondary text-secondary-foreground rounded-full p-2">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
                 {isPending && (
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                       <Loader className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t mt-auto">
              <form action={formAction} className="flex gap-2">
                <Input
                  name="question"
                  placeholder="Ask about my projects..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isPending}
                  autoComplete='off'
                />
                <Button type="submit" disabled={isPending || !input.trim()}>
                  {isPending ? <Loader className="animate-spin" /> : <Send />}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
