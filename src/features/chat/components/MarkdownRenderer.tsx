import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import "highlight.js/styles/github-dark.css";

interface Props {
  content: string;
  isUser?: boolean;
}

export const MarkdownRenderer = ({ content, isUser }: Props) => {
  const components: Components = {
    code({ className, children, ...props }) {
  const isBlock = className?.startsWith("language-");

  if (!isBlock) {
    return (
      <code
        className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <pre className="bg-neutral-900 p-4 rounded-xl overflow-x-auto text-sm">
      <code className={className} {...props}>
        {children}
      </code>
    </pre>
  );
}
  };

  return (
    <div
      className={`
        prose prose-sm max-w-none
        dark:prose-invert
        prose-p:my-2
        prose-ul:my-2
        prose-ol:my-2
        prose-headings:mb-3
        prose-pre:my-3
        font-noto-sans-arabic
        ${isUser ? "prose-invert text-black dark:text-white" : ""}
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};