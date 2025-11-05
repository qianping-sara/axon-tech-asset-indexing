'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-light.css';

interface MarkdownRendererProps {
  content: string;
}

/**
 * Markdown 内容渲染组件
 * 支持 GitHub Flavored Markdown (GFM) 和代码块高亮
 */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // 标题样式 - 缩小尺寸以适应详情页面
          h1: ({ node, ...props }) => (
            <h1 className="text-xl font-bold mt-4 mb-3 text-gray-900" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-lg font-bold mt-3 mb-2 text-gray-900" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-base font-bold mt-3 mb-2 text-gray-900" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-sm font-semibold mt-2 mb-1 text-gray-800" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-sm font-semibold mt-2 mb-1 text-gray-800" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-xs font-semibold mt-2 mb-1 text-gray-700" {...props} />
          ),

          // 段落样式
          p: ({ node, ...props }) => (
            <p className="my-3 text-gray-700 leading-relaxed" {...props} />
          ),

          // 代码样式
          code: ({ node, inline, className, ...props }: any) => (
            <code
              className={
                inline
                  ? 'bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600'
                  : className || 'block bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto font-mono text-sm'
              }
              {...props}
            />
          ),

          // 预格式化文本
          pre: ({ node, ...props }) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto" {...props} />
          ),

          // 表格样式
          table: ({ node, ...props }) => (
            <table className="w-full border-collapse my-4" {...props} />
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-100" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props} />
          ),

          // 列表样式
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside my-3 ml-4 text-gray-700" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside my-3 ml-4 text-gray-700" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="my-1" {...props} />
          ),

          // 引用样式
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-green-700 pl-4 my-3 italic text-gray-600 bg-gray-50 py-2 pr-4" {...props} />
          ),

          // 链接样式
          a: ({ node, ...props }) => (
            <a className="text-green-700 hover:text-green-800 underline" {...props} />
          ),

          // 水平线
          hr: ({ node, ...props }) => (
            <hr className="my-4 border-gray-300" {...props} />
          ),

          // 图片
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded my-4" {...props} />
          ),

          // 强调
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-gray-900" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-gray-700" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

