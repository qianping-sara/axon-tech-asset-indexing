/**
 * Markdown 相关的类型定义
 */

/**
 * Markdown 文件的 Frontmatter 元数据
 */
export interface MarkdownFrontmatter {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  assetType?: string;
  version?: string;
  status?: string;
  owner?: string;
  [key: string]: string | undefined;
}

/**
 * 解析后的 Markdown 内容
 */
export interface MarkdownContent {
  frontmatter: MarkdownFrontmatter;
  content: string;
}

/**
 * API 响应格式
 */
export interface ContentResponse {
  success: boolean;
  data?: MarkdownContent;
  error?: string;
}

