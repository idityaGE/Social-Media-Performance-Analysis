"use client"

import { useChat, Message } from 'ai/react';
import { Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const MarkdownMessage = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      className="prose prose-sm max-w-none dark:prose-invert prose-pre:p-0"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              style={oneDark}
              PreTag="div"
              className="rounded-md"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const ChatInterface = () => {
  const { messages, input, handleInputChange, setMessages, isLoading } =
    useChat({
      api: '/api/chat',
      id: 'chat',
      initialMessages: [],
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    // Create the new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      createdAt: new Date(),
    };

    // Optimistically update messages
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      // Add the AI's response to the messages
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        createdAt: new Date(),
      };

      setMessages([...messages, userMessage, aiMessage]);
      handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    } catch (err) {
      console.error('Error sending message:', err);
      // Optionally show an error message to the user
    } finally {
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-4 ${message.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800'
                }`}
            >
              <div className="text-sm font-semibold mb-2">
                {message.role === 'user' ? 'You' : 'AI'}
              </div>
              {message.role === 'user' ? (
                <div className="whitespace-pre-wrap">{message.content}</div>
              ) : (
                <div className={message.role === 'system' ? 'text-white' : 'text-gray-900 dark:text-gray-100'}>
                  <MarkdownMessage content={message.content} />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center justify-center space-x-2 p-4">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm text-gray-500">AI is thinking...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;