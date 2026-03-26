import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import "highlight.js/styles/github-dark.css";

interface Props {
  content: string;
}

export const MarkdownRenderer = ({ content }: Props) => {
  
  const components: Components = {
    code({ className, children, ...props }) {
      const isBlock = className?.startsWith("language-");

      if (!isBlock) {
        return (
          <code
            className="code-block px-1 py-0.5 rounded text-sm"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <pre className="code-block p-4 rounded-xl overflow-x-auto text-sm">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    }
  };

  return (
    <div
      dir="auto"
      className={`
        content-prose
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