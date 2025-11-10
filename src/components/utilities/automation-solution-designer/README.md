# Automation Solution Designer Components

## Overview

The Automation Solution Designer is a guided assessment tool that helps architects, developers, and business analysts design standardized, architecturally sound, and cost-effective technology stacks for automation use cases.

## Components

### 1. AutomationObjective
Displays the objective and purpose of the tool.

### 2. AutomationPrinciples
Collapsible section showing the three guiding principles:
- Eliminate Before You Automate
- Assemble, Don't Rebuild
- Commonality to Platform, Differentiation to Business

### 3. DimensionOverview
Shows dimension description and "when to use" guidance. Includes a help button to view the complete decision flow diagram in a modal.

### 4. FlowDiagramModal
Modal dialog that displays Mermaid flow diagrams. Dynamically loads mermaid.js library.

### 5. DataIngestionSelector
Main component for the Data Ingestion dimension. Manages the flow through three main steps:
- Q1.1: Strategic Choice (Shift-Left)
- Q1.2: Data Characteristics (Structured vs Unstructured)
- Q1.3: AI Capability Assessment (comprehensive form)

### 6. AICapabilityAssessment
**New comprehensive form component** that replaces the previous 4-step Q1.3 flow.

#### Design
Multi-part form with conditional sections:
- **Part 1**: Existing Capability Check (always shown)
- **Part 2**: Precision Check (shown if Part 1 = "yes")
- **Part 3**: Improvement Approach (shown if needs improvement)
- **Part 4**: Resources & Data (shown if Part 3 = "training")

#### Benefits
- Reduced cognitive load (one form instead of 4 questions)
- Better user experience (see all related questions together)
- Clearer progress indication (Step 3 of 3)
- More natural question flow with conditional sections

### 7. QuestionCard
Displays individual questions with options. Used for Q1.1 and Q1.2.

### 8. ResultCard
Displays the final recommendation with strategy, technology, description, details, and next steps.

## Data Flow

```
DataIngestionSelector
├─ Q1.1 (QuestionCard) → Strategic Choice
├─ Q1.2 (QuestionCard) → Data Characteristics
├─ Q1.3 (AICapabilityAssessment) → AI Capability Assessment
│  ├─ Part 1: Existing Capability
│  ├─ Part 2: Precision Check (conditional)
│  ├─ Part 3: Improvement Approach (conditional)
│  └─ Part 4: Resources & Data (conditional)
└─ Result (ResultCard) → Recommendation
```

## Key Improvements

### Progress Tracking
- Maintains "Step 3 of 3" structure
- Q1.3 is now a single comprehensive step
- Progress bar shows 100% when entering Q1.3

### Question Design
- Q1.3c changed from "What approach is needed?" to "What approach best fits your situation?"
- Options better reflect platform support and team capabilities
- More descriptive option labels

### User Experience
- Fewer clicks to complete assessment
- Conditional sections reduce cognitive load
- Clear visual hierarchy with parts and sections

## Recommendation Paths

1. **Shift-Left**: Q1.1 = "yes"
2. **Template-based**: Q1.2 = "structured"
3. **Use Existing**: Q1.3a = "yes" AND Q1.3b = "yes"
4. **Configuration**: Q1.3c = "config"
5. **AutoML Training**: Q1.3c = "training" AND Q1.3d = "yes"
6. **Custom Specialist**: Q1.3c = "training" AND Q1.3d = "no" OR Q1.3c = "specialized"

## Type Definitions

See `@/lib/types/data-ingestion.ts` for:
- `DataIngestionStep`: Step types (q1.1, q1.2, q1.3a, q1.3b, q1.3c, q1.3d, result)
- `DataIngestionAnswers`: User answers storage
- `Question`: Question structure
- `RecommendationResult`: Recommendation structure

## Constants

See `@/lib/constants/data-ingestion.ts` for:
- Question definitions (QUESTION_Q1_1, QUESTION_Q1_2, QUESTION_Q1_3a, etc.)
- Recommendation results mapping
- `getRecommendation()` function

See `@/lib/constants/data-ingestion-overview.ts` for:
- Dimension overview text
- Mermaid flow diagram

## Utilities

See `@/lib/utils/data-ingestion.ts` for:
- `getNextStep()`: Determine next step based on answers
- `getCurrentQuestion()`: Get question for current step
- `getProgressInfo()`: Get progress percentage and step info
- `generateAnswersSummary()`: Generate summary of answers
- `downloadRecommendation()`: Export recommendation as CSV

