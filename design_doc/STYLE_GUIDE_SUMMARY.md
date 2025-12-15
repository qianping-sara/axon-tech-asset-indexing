# Axon Platform - UI Style Guide

**Version**: 2.0
**Last Updated**: 2025-12-15
**Status**: Active

---

## 📋 Overview

This document defines the core design principles and style standards for the Axon platform UI. All components should follow these guidelines for consistency.

---

## 🎨 Color System

### Primary Colors

| Purpose | Color | Tailwind Class | Usage |
|---------|-------|----------------|-------|
| **Success/Primary** | Green | `green-600` | Primary actions, success states, selected items |
| **Warning** | Orange | `orange-600` | Warnings, caution states |
| **Error/Blocked** | Red | `red-600` | Errors, blocked states, critical alerts |
| **Info** | Blue | `blue-600` | Information, next steps, navigation |
| **Neutral** | Gray | `gray-600` | Text, borders, backgrounds |

### Semantic Color Usage

**Recommendation Types**:
- **Matched** (Perfect alignment): Green (`green-600`)
- **Downgrade** (Over-engineering): Blue (`blue-600`)
- **Warning** (Capability mismatch): Orange (`orange-600`)
- **Blocked** (Critical issue): Red (`red-600`)
- **Info** (Additional information): Gray (`gray-600`)

**Interactive States**:
- **Selected**: Green border (`border-green-500`) + Light green background (`bg-green-50`)
- **Unselected**: Gray border (`border-gray-200`) + White background (`bg-white`)
- **Hover**: Darker border (`hover:border-gray-300`)
- **Disabled**: Reduced opacity (`opacity-50`)

---

## 🔤 Typography

### Text Hierarchy

| Element | Size | Weight | Color | Tailwind Classes |
|---------|------|--------|-------|------------------|
| **Page Title** | XL | Bold | Black | `text-xl font-bold text-black` |
| **Section Title** | SM | Bold | Black | `text-sm font-bold text-black` |
| **Body Text** | SM | Normal | Gray-700 | `text-sm text-gray-700` |
| **Description** | SM | Normal | Gray-600 | `text-sm text-gray-600` |
| **Label** | XS | Medium | Gray-700 | `text-xs font-medium text-gray-700` |
| **Detail** | XS | Normal | Gray-600 | `text-xs text-gray-600` |

### Font Principles
- **Headings**: Always use `text-black` for maximum contrast
- **Body**: Use `text-gray-700` for readability
- **Secondary**: Use `text-gray-600` for less important information
- **Disabled**: Use `text-gray-400` for inactive states

---

## 🎯 Icons

### Icon Library
- **Source**: Lucide React
- **Default Size**: `w-4 h-4` or `w-5 h-5` or `w-6 h-6`
- **Color**: Match semantic meaning (green for success, orange for warning, etc.)

### Standard Icons

| Purpose | Icon | Color |
|---------|------|-------|
| **Success/Matched** | `CheckCircle` | `text-green-600` |
| **Warning** | `AlertTriangle` | `text-orange-600` |
| **Error/Blocked** | `XCircle` | `text-red-600` |
| **Info** | `Info` | `text-blue-600` |
| **Next Steps** | `ArrowRight` | `text-blue-600` |
| **Previous** | `ArrowLeft` | `text-gray-700` |
| **Restart** | `RotateCcw` | `text-gray-700` |

---

## 📦 Component Patterns

### Selection Cards
- **Border**: `border-2` for emphasis
- **Unselected**: `border-gray-200 bg-white`
- **Selected**: `border-green-500 bg-green-50`
- **Hover**: `hover:border-gray-300`
- **Transition**: `transition-all` for smooth state changes

### Buttons

**Primary Button** (Actions):
- Background: `bg-green-600 hover:bg-green-700`
- Text: `text-white`
- Padding: `px-6 py-2`
- Border Radius: `rounded-lg`

**Secondary Button** (Navigation):
- Border: `border border-gray-300`
- Text: `text-gray-700`
- Hover: `hover:bg-gray-50`

**Tertiary Button** (Restart/Cancel):
- Background: `bg-gray-100 hover:bg-gray-200`
- Text: `text-gray-700`

### Progress Indicators
- **Background**: `bg-gray-200 rounded-full h-2`
- **Fill**: `bg-green-600 h-2 rounded-full`
- **Transition**: `transition-all duration-300`

### Result Cards

**Card Structure**:
- Border: `border rounded-lg p-4`
- Background: `bg-white`
- Left Accent: `border-l-4` with semantic color

**Section Boxes** (Warnings/Suggestions/Next Steps):
- Border: `border rounded-lg p-4`
- Background: `bg-white`
- Border Color: Match semantic meaning
  - Warnings: `border-orange-300`
  - Suggestions: `border-green-300`
  - Next Steps: `border-blue-300`

---

## 📐 Spacing & Layout

### Spacing Scale
- **Gap between elements**: `gap-3` (12px)
- **Padding inside cards**: `p-4` (16px)
- **Margin between sections**: `mt-4` or `mt-6`
- **Border top spacing**: `pt-6 border-t border-gray-200`

### Layout Principles
- **Consistent padding**: Use `p-4` or `p-6` for card interiors
- **Consistent gaps**: Use `gap-3` for button groups
- **Responsive**: Use flexbox for button containers (`flex justify-between` or `flex justify-end`)

---

## ✅ Design Principles

1. **Consistency**: All selectors and utilities use the same color system and component patterns
2. **Clarity**: Use semantic colors to communicate meaning (green = success, orange = warning, red = error)
3. **Accessibility**: Maintain sufficient contrast ratios (black text on white background)
4. **Feedback**: Provide clear visual feedback for interactive states (hover, selected, disabled)
5. **Simplicity**: Avoid unnecessary decoration; focus on content and functionality

---

**Document Version**: 2.0
**Scope**: Platform-wide UI standards
**Last Verified**: 2025-12-15
