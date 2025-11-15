# Data Ingestion Dimension - Comprehensive Guide

## Overview

The Data Ingestion dimension guides you through selecting the right data ingestion approach for your automation use case. It helps you decide whether to eliminate unstructured data at the source, use template-based extraction, or leverage AI capabilities.

**When to use**: When your automation use case involves ingesting data from external sources (documents, images, APIs, emails, etc.). If your use case does not require data ingestion, you can skip this dimension.

---

## 📋 Question Flow (4 Main Questions + Conditional Sub-questions)

### Q1: Strategic Choice (REQUIRED)
**Question**: Can the input data be fully digitized at the source channel?

**Options**:
- **Yes**: We can modify the source channel to provide structured, digital input
  - **Recommendation**: Shift-Left Strategy (Channel-side Transformation)
  - **Benefit**: Eliminate unstructured data at the origin
  - **Next**: Proceed to Phase 3

- **No**: We must accept data as-is from the source
  - **Next**: Go to Q2

---

### Q2: Tactical Diagnosis (REQUIRED if Q1=No)
**Question**: What is the main challenge when processing this data?

**Options**:
- **Mapping**: Data is clean, predictable, machine-readable
  - **Recommendation**: Template-based Extraction (RPA / Script)
  - **Benefit**: Simple, cost-effective for structured data
  - **Next**: Proceed to Phase 3

- **Interpretation**: Data is messy, requires intelligence to understand
  - **Next**: Go to Q3.1 (AI Capability & Resource Diagnosis)

---

### Q3.1: Problem Type Diagnosis (REQUIRED if Q2=Interpretation)
**Question**: Which type of AI challenge does your use case most resemble?

**Options**:
- **Common Task**: Well-known, common industry problem with existing off-the-shelf capabilities
  - **Examples**: Standard OCR, invoice/receipt extraction, basic text classification
  - **Recommendation**: Use Existing General Model (Platform API)
  - **Next**: Check Q3.3 for business criticality

- **New Data Pattern**: Custom patterns specific to your domain, but using standard ML techniques
  - **Examples**: Custom claim form extraction, domain-specific classification
  - **Next**: Go to Q3.2 (Capability Match)

- **New Cognitive Task**: Novel, complex reasoning or generation tasks
  - **Examples**: Complex reasoning, generation, novel problem solving
  - **Next**: Go to Q3.2 (Capability Match)

---

### Q3.2: Capability Match (REQUIRED if Q3.1=New Pattern or New Cognitive)
**Question**: Which description best matches your team, platform, and operational commitment?

**Options**:
- **Level 1**: Business/Rule Expert
  - Team: BA or SME
  - Platform: Business systems or configuration tools
  - Commitment: Low - can only maintain business rules, not AI models

- **Level 2**: Citizen Developer + AutoML
  - Team: Citizen developers with some technical skills
  - Platform: AutoML platforms (Power Platform, etc.)
  - Commitment: Medium - can build and maintain models with platform support

- **Level 3**: Professional AI Team
  - Team: Professional AI/ML engineers
  - Platform: Professional AI/ML tools and infrastructure
  - Commitment: High - can build and maintain complex models

- **None**: No clear capability-platform-operations combination yet

---

### Q3.3: Business Criticality (REQUIRED if Q3.1=Common OR Q3.2 selected)
**Question**: What is your true business requirement for accuracy?

**Options**:
- **Efficiency Gain**: Higher accuracy is better, but we can tolerate some manual corrections
  - **Acceptable Accuracy**: <95% is acceptable
  - **Examples**: Extracting claim amounts (90% OK), categorizing claims (85% OK)

- **Business Critical**: We need near-perfect automation, minimal manual corrections
  - **Required Accuracy**: >99% required
  - **Examples**: Critical financial transactions, compliance-sensitive operations

---

### Q3.4: Data Readiness (REQUIRED if Q3.1=New Pattern/Cognitive AND Q3.2=Level 2/3)
**Question**: How ready is your data for AI model training or processing?

**Options**:
- **Ready**: Sufficient labeled/clean data (100-1000+ samples), good quality, clear governance
  - **Proceed**: Immediately start model development

- **Partial**: Some data available (50-100 samples), but needs cleaning and labeling
  - **Action**: Data preparation required (2-4 weeks)

- **Not Ready**: Insufficient data (<50 samples), poor quality, or unclear governance
  - **Action**: Project blocked, must focus on data collection (1-3 months)

---

## 🎯 Rule Engine (9 Rules)

### ✅ Matched Rules (Perfect Alignment)

| Rule | Condition | Recommendation | Description |
|------|-----------|-----------------|-------------|
| **Rule 1** | Q3.1=common + Q3.3=efficiency | Use Existing Model | Platform general model API, over-design detected |
| **Rule 2** | Q3.1=new_pattern + Q3.2=level2 + Q3.3=efficiency + Q3.4=ready/partial | AutoML Training | Level 2 citizen developers train custom models |
| **Rule 3** | Q3.1=new_cognitive + Q3.2=level3 + Q3.4=ready/partial | Custom Development | Professional AI/ML team builds specialized solutions |
| **Rule 9** | Q3.1=new_cognitive + Q3.2=level3 + Q3.3=efficiency | Cost-Benefit Review | L3 resources for efficiency gain, confirm TCO & ROI |

### ⚠️ Warning Rules (Capability Mismatch)

| Rule | Condition | Issue | Suggestion |
|------|-----------|-------|-----------|
| **Rule 5** | (Q3.1=new_pattern OR new_cognitive) + Q3.2=level1 | Severe capability mismatch | Upgrade to L2 / Submit to CoE / Simplify scope |
| **Rule 6** | Q3.1=new_cognitive + Q3.2=level2 | L3 problem + L2 resources | AutoML cannot handle complex reasoning |
| **Rule 8** | Q3.1=common + Q3.3=critical + Q3.2=level1 | High risk warning | General model may not meet >99% SLA |
| **Rule 7** | Q3.1=common + (Q3.2=level2 OR level3) | Over-design detected | Don't waste L2/L3 resources on common tasks |

### ✗ Blocked Rules

| Rule | Condition | Issue | Suggestion |
|------|-----------|-------|-----------|
| **Rule 4** | (Q3.1=new_pattern OR new_cognitive) + Q3.4=not_ready | Data not ready | Must focus on data collection & governance (1-3 months) |

### ⚠️ Other Warnings

| Condition | Issue | Suggestion |
|-----------|-------|-----------|
| Q3.2=level2 + Q3.3=critical | High accuracy requirement | AutoML can work but needs careful tuning & professional support |
| Q3.2=none | No clear capability | Conduct capability assessment before proceeding |

---

## 📊 Rule Evaluation Order

The rule engine evaluates conditions in this order. **The first matching rule returns the result**:

1. **Phase 1**: Early Exit Rules
   - Q1=yes → Shift-Left (exit)
   - Q2=mapping → Template-based (exit)

2. **Phase 2**: Common Task Rules (Rule 1, 7, 8)
   - Q3.1=common → Check business criticality and capability level

3. **Phase 3**: New Pattern/Cognitive Rules (Rule 2, 3, 4, 5, 6, 9)
   - Q3.1=new_pattern/cognitive → Check capability level and data readiness

4. **Phase 4**: Default
   - No matching rule → Custom solution required

---

## 🔄 Common Scenarios

### Scenario 1: Shift-Left (Q1=Yes)
```
Q1: Yes, can modify source
→ Recommendation: Shift-Left Strategy
→ Eliminate unstructured data at source
→ Proceed to Phase 3
```

### Scenario 2: Template-based Extraction (Q2=Mapping)
```
Q1: No
Q2: Mapping (structured data)
→ Recommendation: Template-based Extraction (RPA/Script)
→ Proceed to Phase 3
```

### Scenario 3: Common Task + Efficiency (Rule 1)
```
Q1: No
Q2: Interpretation
Q3.1: Common
Q3.3: Efficiency
→ Recommendation: Use Existing Model (Platform API)
→ Over-design detected
→ Proceed to Phase 3
```

### Scenario 4: Common Task + Critical + Level 1 (Rule 8)
```
Q1: No
Q2: Interpretation
Q3.1: Common
Q3.3: Critical
Q3.2: Level 1
→ Warning: High Risk
→ General model may not meet >99% SLA
→ Must conduct strict PoC testing
```

### Scenario 5: New Pattern + Level 2 + Efficiency + Data Ready (Rule 2)
```
Q1: No
Q2: Interpretation
Q3.1: New Pattern
Q3.2: Level 2
Q3.3: Efficiency
Q3.4: Ready/Partial
→ Recommendation: AutoML Model Training
→ Level 2 citizen developers train custom models
→ Proceed to Phase 3
```

### Scenario 6: New Pattern + Level 2 + Critical (Rule 7 variant)
```
Q1: No
Q2: Interpretation
Q3.1: New Pattern
Q3.2: Level 2
Q3.3: Critical
→ Warning: High Accuracy Requirement
→ AutoML can work but needs careful tuning
→ May need professional support
```

### Scenario 7: New Cognitive + Level 3 + Data Ready (Rule 3)
```
Q1: No
Q2: Interpretation
Q3.1: New Cognitive
Q3.2: Level 3
Q3.4: Ready/Partial
→ Recommendation: Custom Model Development
→ Professional AI/ML team builds specialized solutions
→ Proceed to Phase 3
```

### Scenario 8: New Cognitive + Level 3 + Efficiency (Rule 9)
```
Q1: No
Q2: Interpretation
Q3.1: New Cognitive
Q3.2: Level 3
Q3.3: Efficiency
→ Warning: Cost-Benefit Review
→ L3 resources for efficiency gain
→ Confirm TCO & ROI before start
→ Proceed to Phase 3 with cost review
```

### Scenario 9: New Pattern/Cognitive + Level 1 (Rule 5)
```
Q1: No
Q2: Interpretation
Q3.1: New Pattern/Cognitive
Q3.2: Level 1
→ Warning: Severe Capability Mismatch
→ Options: Upgrade to L2 / Submit to CoE / Simplify scope
```

### Scenario 10: New Cognitive + Level 2 (Rule 6)
```
Q1: No
Q2: Interpretation
Q3.1: New Cognitive
Q3.2: Level 2
→ Warning: Capability Mismatch
→ AutoML cannot handle complex reasoning
→ Options: Upgrade to L3 / Submit to CoE / Simplify scope
```

### Scenario 11: Data Not Ready (Rule 4)
```
Q1: No
Q2: Interpretation
Q3.1: New Pattern/Cognitive
Q3.4: Not Ready
→ Blocked: Project Blocked
→ Must focus on data collection & governance
→ Estimated time: 1-3 months
```

---

## 🚀 Three Capability Levels

### Level 1: Business/Rule Expert
- Can define business rules and requirements
- Cannot code or maintain AI models
- Suitable for: Defining requirements, business logic
- Platform: Business systems or configuration tools

### Level 2: Citizen Developer + AutoML
- Can use AutoML platforms (Power Platform, etc.)
- Can build and maintain models with platform support
- Commits to ongoing operations and support
- Suitable for: New data patterns, domain-specific models

### Level 3: Professional AI Team
- Professional AI/ML engineers with advanced expertise
- Can build complex, high-performance solutions
- Professional DevOps and infrastructure support
- Suitable for: Complex, novel cognitive tasks, enterprise-grade solutions

---

## 💡 Key Decision Points

1. **Q1 (Strategic Choice)**: Can we eliminate the problem at the source?
   - yes → Shift-Left (exit)
   - no → Continue to Q2

2. **Q2 (Tactical Diagnosis)**: Is the data structured or unstructured?
   - mapping → Template-based (exit)
   - interpretation → Continue to Q3.1

3. **Q3.1 (Problem Type)**: What type of AI challenge?
   - common → Check business criticality
   - new_pattern/cognitive → Check capability level

4. **Q3.2 (Capability Match)**: Most critical decision point
   - Determines if team can build and maintain solution
   - Without proper commitment, project will fail

5. **Q3.4 (Data Readiness)**: Is data ready for model training?
   - not_ready → Project blocked (1-3 months data prep)
   - ready/partial → Proceed with model development

---

## 📞 When to Contact AI CoE

- Need to build custom AI models
- Need L3 expertise for complex cognitive tasks
- Need to upgrade to L2 capability
- Need complex data preparation and governance
- Need technical architecture consultation
- Estimated response time: 2-4 weeks for new requests

---

## 🔗 Related Files

- **Implementation**: `app/src/lib/constants/data-ingestion.ts`
- **Types**: `app/src/lib/types/data-ingestion.ts`
- **Utilities**: `app/src/lib/utils/data-ingestion.ts`
- **Component**: `app/src/components/utilities/automation-solution-designer/DataIngestionSelector.tsx`
- **Overview**: `app/src/lib/constants/data-ingestion-overview.ts`

---

## 📝 Version History

- **Latest Update**: 2025-11-15
- **Changes**:
  - Updated Mermaid diagram to show complete rule evaluation logic
  - Added Q3.4 (Data Readiness) to the flow
  - Clarified all 9 rules and their conditions
  - Added 11 common scenarios
  - Clarified rule evaluation order and priority

