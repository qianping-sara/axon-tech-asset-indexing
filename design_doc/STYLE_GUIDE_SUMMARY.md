# Automation Solution Designer - Style Guide Summary

## 📋 Overview

This document summarizes the unified styling approach for both the **Process Orchestration Selector** and **Data Ingestion Selector** in the Automation Solution Designer. Both selectors now follow a consistent design pattern.

---

## Process Orchestration Selector (Template Style)

### 1. Question Options/Selection Cards

**未选中状态：**
- Border: `border-2 border-gray-200`
- Background: `bg-white`
- Hover: `hover:border-gray-300`
- Transition: `transition-all`

**选中状态：**
- Border: `border-2 border-green-500`
- Background: `bg-green-50`

**单选框（Radio Button）：**
- 未选中：`w-6 h-6 rounded-full border-2 border-gray-300`
- 选中：`border-2 border-green-500 bg-green-500`
- 选中时显示：`CheckCircle` 图标（`w-5 h-5 text-white`）

**文本样式：**
- 标题：`font-semibold text-black`
- 描述：`text-gray-600 text-sm`
- 示例框：`bg-gray-50 p-3 rounded border-l-2 border-gray-300`
- 示例标题：`text-xs font-semibold text-gray-700`
- 示例文本：`text-xs text-gray-600`

### 2. Navigation Buttons

**Next Step Button：**
- 样式：`px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold`
- 禁用：`disabled:opacity-50 disabled:cursor-not-allowed`

**Previous Button：**
- 样式：`px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold`
- 图标：`ArrowLeft` 从 lucide-react

**按钮容器：**
- 仅 Next：`flex justify-end gap-3 pt-6`
- Next + Previous：`flex justify-between gap-3 pt-6`

### 3. Progress Bar & Step Labels

**进度条容器：**
- 标题：`text-sm font-semibold text-gray-700`
- 百分比：`text-sm text-gray-600`
- 进度条背景：`w-full bg-gray-200 rounded-full h-2`
- 进度条填充：`bg-green-600 h-2 rounded-full transition-all duration-300`

**步骤标签：**
- 已完成：`text-xs font-medium text-green-600`
- 当前步骤：`text-xs font-medium text-gray-900`
- 未来步骤：`text-xs font-medium text-gray-400`

### 4. Result Card - Matched Recommendation

**头部框：**
- 样式：`border rounded-lg p-4`
- 左边框：`border-l-4 border-l-green-600`
- 背景：`bg-white`

**图标：**
- 类型：`CheckCircle`
- 样式：`w-6 h-6 text-green-600 flex-shrink-0`

**标题：**
- 样式：`text-xl font-bold text-black`

**描述：**
- 样式：`text-sm text-gray-700 mt-1`

**详情列表：**
- 容器：`mt-3 pt-3 border-t border-gray-300`
- 项目：`text-xs text-gray-600 ml-4`
- 项目符号：`•`

### 5. Result Card - Warnings Section

**警告框：**
- 样式：`border border-orange-300 rounded-lg p-4`
- 背景：`bg-white`

**标题：**
- 样式：`text-sm font-bold text-black mb-2 flex items-center gap-2`
- 图标：`AlertTriangle` (`w-4 h-4 text-orange-600`)

**内容：**
- 项目：`text-xs text-gray-700 ml-6`
- 项目符号：`•`

### 6. Result Card - Suggestions Section

**建议框：**
- 样式：`border border-green-300 rounded-lg p-4`
- 背景：`bg-white`

**标题：**
- 样式：`text-sm font-bold text-black mb-2 flex items-center gap-2`
- 图标：`CheckCircle` (`w-4 h-4 text-green-600`)

**内容：**
- 项目：`text-xs text-gray-700 ml-6`
- 项目符号：`•`

### 7. Result Card - Next Steps Section

**下一步框：**
- 样式：`border border-blue-300 rounded-lg p-4`
- 背景：`bg-white`

**标题：**
- 样式：`text-sm font-bold text-black mb-2 flex items-center gap-2`
- 图标：`ArrowRight` (`w-4 h-4 text-blue-600`)

**内容：**
- 项目：`text-xs text-gray-700 ml-6`
- 编号：`1. 2. 3.` 等

### 8. Result Card - Action Buttons

**Restart Button：**
- 样式：`px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold`
- 图标：`RotateCcw`

**容器：**
- 样式：`flex gap-3 pt-6 border-t border-gray-200`

---

## Data Injection Selector - Current Implementation Issues

### 不统一的地方：

1. **选项卡片选中状态**
   - Process：明显的绿色背景 + 边框
   - Data Injection：没有选中状态的视觉反馈

2. **单选框样式**
   - Process：圆形 + CheckCircle 图标
   - Data Injection：方形（无选中时的填充）

3. **按钮**
   - Process：有明确的 Next/Previous 按钮
   - Data Injection：没有按钮（直接点击选项跳转）

4. **进度条颜色**
   - Process：`bg-green-600`
   - Data Injection：`bg-green-700`

5. **结果卡片头部**
   - Process：左边框 + 白色背景
   - Data Injection：背景色 + 边框

6. **结果卡片各部分**
   - Process：Warnings/Suggestions/Next Steps 各有单独的框
   - Data Injection：没有单独的框，直接列表

7. **字体颜色**
   - Process：`text-black`
   - Data Injection：`text-gray-900`

