'use client'

import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

interface MessageContentProps {
  content: string
  onSuggestionClick?: (suggestion: string) => void
}

// Message content component that renders markdown and makes suggestions clickable
export function MessageContent({ content, onSuggestionClick }: MessageContentProps) {
  // Parse suggestions from the content (format: "1. Question text\n")
  const parts = content.split(/(\n\n💡 \*\*You might also want to know:\*\*\n)/)
  
  if (parts.length > 1) {
    const mainContent = parts[0]
    const suggestionsSection = parts.slice(1).join('')
    const suggestions = suggestionsSection.match(/\d+\.\s+(.+?)(?=\n|$)/g)?.map(s => s.replace(/^\d+\.\s+/, '')) || []
    
    return (
      <div>
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <Link href={props.href || '#'} className="text-blue-600 hover:text-blue-800 underline">
                {props.children}
              </Link>
            ),
            strong: ({ node, ...props }) => <strong className="font-semibold">{props.children}</strong>,
            p: ({ node, ...props }) => <p className="mb-2 last:mb-0">{props.children}</p>,
            ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1">{props.children}</ul>,
            li: ({ node, ...props }) => <li className="ml-2">{props.children}</li>,
          }}
        >
          {mainContent}
        </ReactMarkdown>
        {suggestions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">💡 <strong>You might also want to know:</strong></p>
            <div className="space-y-2">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors border border-transparent hover:border-blue-200"
                >
                  {idx + 1}. {suggestion}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Click any question above to ask it!</p>
          </div>
        )}
        {suggestionsSection && suggestions.length === 0 && (
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <Link href={props.href || '#'} className="text-blue-600 hover:text-blue-800 underline">
                  {props.children}
                </Link>
              ),
            }}
          >
            {suggestionsSection}
          </ReactMarkdown>
        )}
      </div>
    )
  }
  
  // No suggestions, just render markdown
  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => (
          <Link href={props.href || '#'} className="text-blue-600 hover:text-blue-800 underline">
            {props.children}
          </Link>
        ),
        strong: ({ node, ...props }) => <strong className="font-semibold">{props.children}</strong>,
        p: ({ node, ...props }) => <p className="mb-2 last:mb-0">{props.children}</p>,
        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1">{props.children}</ul>,
        li: ({ node, ...props }) => <li className="ml-2">{props.children}</li>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}



