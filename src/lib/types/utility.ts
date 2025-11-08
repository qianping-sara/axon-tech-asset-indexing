/**
 * Utility Types
 * Type definitions for the CoE Utilities system
 */

export type UtilityStatus = 'DRAFT' | 'PUBLISHED' | 'DEPRECATED' | 'ARCHIVED';

export interface Utility {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string; // lucide-react icon name
  url: string;
  version: string;
  status: UtilityStatus;
  owner?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
}

export interface UtilityCategory {
  id: string;
  name: string;
}

export interface UtilityResponse {
  success: boolean;
  data?: Utility | Utility[];
  error?: string;
  message?: string;
}

export interface UtilityListResponse {
  success: boolean;
  data: Utility[];
  total: number;
  error?: string;
}

