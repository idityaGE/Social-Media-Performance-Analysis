import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { MarkdownMessageProps } from '@/types/chat';
import Image from 'next/image';

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content }) => {
  return (
    <ReactMarkdown
      className="prose prose-sm max-w-none dark:prose-invert prose-pre:p-0"
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        // Code blocks with syntax highlighting
        code({ _, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              style={oneDark}
              PreTag="div"
              className="rounded-md !my-4"
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

        // Tables
        table({ _, children, ...props }) {
          return (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-gray-300 dark:border-gray-700" {...props}>
                {children}
              </table>
            </div>
          );
        },

        // Table headers
        th({ _, children, ...props }) {
          return (
            <th
              className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left border border-gray-300 dark:border-gray-700 font-semibold"
              {...props}
            >
              {children}
            </th>
          );
        },

        // Table cells
        td({ _, children, ...props }) {
          return (
            <td
              className="px-4 py-2 border border-gray-300 dark:border-gray-700"
              {...props}
            >
              {children}
            </td>
          );
        },

        // Blockquotes
        blockquote({ _, children, ...props }) {
          return (
            <blockquote
              className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic"
              {...props}
            >
              {children}
            </blockquote>
          );
        },

        // Lists
        ul({ _, children, ...props }) {
          return (
            <ul className="list-disc list-inside my-4 space-y-2" {...props}>
              {children}
            </ul>
          );
        },

        ol({ _, children, ...props }) {
          return (
            <ol className="list-decimal list-inside my-4 space-y-2" {...props}>
              {children}
            </ol>
          );
        },

        // Headings
        h1: ({ _, children, ...props }) => (
          <h1 className="text-2xl font-bold my-4" {...props}>{children}</h1>
        ),
        h2: ({ _, children, ...props }) => (
          <h2 className="text-xl font-bold my-3" {...props}>{children}</h2>
        ),
        h3: ({ _, children, ...props }) => (
          <h3 className="text-lg font-bold my-2" {...props}>{children}</h3>
        ),

        // Links
        a: ({ _, children, href, ...props }) => (
          <a
            href={href}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        ),

        // Images
        img: ({ _, src, alt, ...props }) => (
          <Image
            src={src}
            alt={alt}
            className="max-w-full h-auto rounded-lg my-4"
            loading="lazy"
            {...props}
          />
        ),

        // Horizontal rule
        hr: ({ _, ...props }) => (
          <hr className="my-8 border-t border-gray-300 dark:border-gray-700" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};