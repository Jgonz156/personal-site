import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom heading styles
    h1: ({ children, ...props }) => (
      <h1
        className="text-4xl font-bold mb-6 mt-8 border-b pb-2 scroll-mt-24"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-3xl font-semibold mb-4 mt-6 scroll-mt-24" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-5 scroll-mt-24" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-xl font-semibold mb-2 mt-4 scroll-mt-24" {...props}>
        {children}
      </h4>
    ),

    // Paragraph styling
    p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,

    // List styling
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,

    // Code blocks
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 border">
        {children}
      </pre>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
        {children}
      </blockquote>
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse border">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border bg-muted p-2 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="border p-2">{children}</td>,

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),

    // Horizontal rule
    hr: () => <hr className="my-8 border-border" />,

    // Allow custom components to be passed in
    ...components,
  }
}
