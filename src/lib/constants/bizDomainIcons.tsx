/**
 * Business Domain Icon Components
 * Maps icon names to lucide-react components
 */

import React from 'react';
import {
  ClipboardList,
  Wallet,
  HelpCircle,
  ArrowDownCircle,
  TrendingUp,
  MessageCircle,
  Users,
  CreditCard,
  BarChart3,
  ShieldAlert,
  Wrench,
  Package,
} from 'lucide-react';

export const BIZ_DOMAIN_ICON_MAP: Record<string, React.ReactNode> = {
  // Core Servicing Domains
  'clipboard-list': <ClipboardList className="w-5 h-5" />,
  'wallet': <Wallet className="w-5 h-5" />,
  'help-circle': <HelpCircle className="w-5 h-5" />,
  'arrow-down-circle': <ArrowDownCircle className="w-5 h-5" />,
  'trending-up': <TrendingUp className="w-5 h-5" />,
  
  // Support Domain Capabilities
  'message-circle': <MessageCircle className="w-5 h-5" />,
  'users': <Users className="w-5 h-5" />,
  'credit-card': <CreditCard className="w-5 h-5" />,
  'bar-chart-3': <BarChart3 className="w-5 h-5" />,
  'shield-alert': <ShieldAlert className="w-5 h-5" />,
  
  // Common Capabilities
  'wrench': <Wrench className="w-5 h-5" />,
  
  // Default fallback
  'package': <Package className="w-5 h-5" />,
};

/**
 * Get lucide-react icon component by icon name
 * @param iconName - The icon name from BizDomainInfo
 * @returns React component or default package icon
 */
export function getBizDomainIconComponent(iconName: string): React.ReactNode {
  return BIZ_DOMAIN_ICON_MAP[iconName] || BIZ_DOMAIN_ICON_MAP['package'];
}

/**
 * Get lucide-react icon component with custom color
 * @param iconName - The icon name from BizDomainInfo
 * @param color - Tailwind color class (e.g., 'text-green-700')
 * @returns React component with custom color
 */
export function getBizDomainIconWithColor(iconName: string, color: string = 'text-gray-700'): React.ReactNode {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'clipboard-list': ClipboardList,
    'wallet': Wallet,
    'help-circle': HelpCircle,
    'arrow-down-circle': ArrowDownCircle,
    'trending-up': TrendingUp,
    'message-circle': MessageCircle,
    'users': Users,
    'credit-card': CreditCard,
    'bar-chart-3': BarChart3,
    'shield-alert': ShieldAlert,
    'wrench': Wrench,
    'package': Package,
  };

  const IconComponent = iconMap[iconName] || Package;
  return <IconComponent className={`w-5 h-5 ${color}`} />;
}

