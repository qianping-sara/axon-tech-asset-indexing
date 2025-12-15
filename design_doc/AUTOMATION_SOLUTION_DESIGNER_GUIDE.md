# Automation Solution Designer - Evaluation Logic Guide

**Version**: 1.0  
**Last Updated**: 2025-12-15  
**Status**: Active

---

## 📋 Overview

The Automation Solution Designer is a decision-support utility that helps teams select the right automation approach for their specific scenarios. It consists of two independent selectors:

1. **Data Ingestion Selector** - Recommends data extraction and AI model strategies
2. **Process Orchestration Selector** - Recommends process automation platforms and architectures

Each selector uses a rule-based evaluation engine to match user scenarios with optimal technology solutions.

---

## 🔍 Part 1: Data Ingestion Selector

### Question Flow (3 Steps)

**Q1: Strategic Choice**
- **Question**: Can you modify the source system to provide structured data?
- **Options**: Yes / No
- **Logic**: If Yes → Recommend "Shift-Left" (stop evaluation)

**Q2: Tactical Diagnosis** (Only if Q1 = No)
- **Question**: What type of data extraction is needed?
- **Options**: 
  - **Mapping** - Structured data with fixed positions
  - **Interpretation** - Unstructured data requiring AI
- **Logic**: If Mapping → Recommend "Template-Based Extraction" (stop evaluation)

**Q3: AI Diagnosis** (Only if Q2 = Interpretation)
- **Q3.1 - Problem Type**: Common / New Pattern / New Cognitive
- **Q3.2 - Capability Level**: Level 1 / Level 2 / Level 3 / None
- **Q3.3 - Business Criticality**: Efficiency (80-95% accuracy) / Critical (>99% accuracy)
- **Q3.4 - Data Readiness**: Ready (>100 samples) / Partial (50-100) / Not Ready (<50)

### Evaluation Rules (9 Rules)

#### Fast-Path Rules

| Rule | Condition | Recommendation | Type |
|------|-----------|----------------|------|
| **Rule 0** | Q2 = Mapping | Template-Based Extraction | matched |
| **Q1** | Q1 = Yes | Shift-Left (modify source) | matched |

#### AI Diagnosis Rules

| Rule | Q3.1 | Q3.2 | Q3.3 | Q3.4 | Type | Strategy |
|------|------|------|------|------|------|----------|
| **Rule 1** | common | any | any | any | downgrade | Use Existing Model |
| **Rule 2** | new_pattern | level2 | efficiency | ≠ not_ready | matched | AutoML Training |
| **Rule 3** | new_cognitive | level3 | any | ≠ not_ready | matched | Custom Model Development |
| **Rule 4** | new_pattern / new_cognitive | any | any | not_ready | blocked | Project Blocked |
| **Rule 5** | new_pattern / new_cognitive | level1 | any | any | warning | Submit to AI CoE |
| **Rule 6** | new_cognitive | level2 | any | any | warning | Submit to AI CoE |
| **Rule 7** | common | level2 / level3 | any | any | downgrade | Start from Level 1 |
| **Rule 8** | common / new_pattern | level1 | critical | any | warning | High Risk Warning |
| **Rule 9** | new_cognitive | level3 | efficiency | any | info | Cost-Benefit Review |

### Rule Details

**Rule 1 & 8: Common Task**
- **Recommendation**: Use platform general model API
- **Rule 8 Enhancement**: If Critical + Level 1 → Add high-risk warning (requires strict PoC testing)

**Rule 2: New Pattern + Level 2**
- **Recommendation**: AutoML training with citizen developers
- **Requirement**: Data readiness ≠ not_ready
- **If Q3.4 = partial**: Add data preparation step (2-4 weeks)

**Rule 3: New Cognitive + Level 3**
- **Recommendation**: Custom model development with professional AI team
- **Requirement**: Data readiness ≠ not_ready
- **Rule 9 Enhancement**: If Efficiency → Add TCO/ROI confirmation step

**Rule 4: Data Not Ready (Blocker)**
- **Condition**: (new_pattern OR new_cognitive) AND not_ready
- **Action**: Block project, redirect to data collection (1-3 months)

**Rule 5 & 6: Capability Mismatch**
- **Rule 5**: L2/L3 problem + Level 1 resources → Severe mismatch
- **Rule 6**: L3 problem (new_cognitive) + Level 2 resources → Capability mismatch
- **Suggestion**: Upgrade capability / Submit to AI CoE / Simplify scope

**Rule 7: Over-Design Detection**
- **Condition**: Common task + Level 2/3 resources
- **Recommendation**: Downgrade to Level 1 (use existing model)

---

## 🔄 Part 2: Process Orchestration Selector

### Question Flow (7 Questions)

**Q1: Process Scope**
- **Options**: New / Modify / Replace
- **Logic**: If New → Show Q2; If Modify/Replace → Skip to Q3

**Q2: Business Nature** (Only if Q1 = New)
- **Options**: Strategic (long-term core process) / Tactical (temporary/urgent)

**Q3: Integration Requirement**
- **Options**: Integrate to Workbench / Standalone
- **Logic**: If Integrate → Show Q3.5; If Standalone → Skip to Q4

**Q3.5: Integration Strategy** (Only if Q3 = Integrate to Workbench)
- **Options**: Backend Engine (SLA, approvals) / Atomic Task (single repeatable task)

**Q4: Integration Footprint**
- **Options**: Modern Only (REST APIs) / Legacy Involved (no API) / Mix (both)

**Q5: Logic Complexity**
- **Options**: Standard Rules (configurable) / High-Performance (AI/ML, complex algorithms)

**Q6: Capability Match** (Most Critical)
- **Options**: 
  - **Level 1**: Business/rule experts, cannot code
  - **Level 2**: Citizen developers + LCAP/BPA platform
  - **Level 3**: Professional developers + professional platforms
  - **None**: No clear capability-platform-operations combination

### Evaluation Rules (11 Rules)

#### Matched Rules (Perfect Alignment)

| Rule | Condition | Recommendation | Technology |
|------|-----------|----------------|------------|
| **Rule 1** | Q3=integrate + Q3.5=backend_engine + Q6=level2 | Backend Process Engine | Bizagi (BPA) |
| **Rule 2** | Q3=integrate + Q3.5=atomic_task | L1 Task API | Generic L1 API |
| **Rule 3** | Q1=new + Q2=strategic + Q3=standalone + Q6=level2 | Backend Process Architecture | Bizagi (BPA) |
| **Rule 4** | Q1=new + Q2=tactical + Q3=standalone + Q6=level2 | Low-Code Application | Power Platform (LCAP) |
| **Rule 4.5** | (Q1=modify OR replace) + Q3=integrate + Q3.5=backend_engine + Q6=level2 | Backend Process Engine | Bizagi (BPA) |
| **Rule 4.6** | (Q1=modify OR replace) + Q3=integrate + Q3.5=atomic_task | L1 Task API | Generic L1 API |
| **Rule 4.7** | (Q1=modify OR replace) + Q3=standalone + Q6=level2 | Backend Process Architecture | Bizagi (BPA) |
| **Rule 7** | Q6=level3 | Custom Microservice | Professional Platform |

#### Warning Rules (Capability Mismatch)

| Rule | Condition | Issue | Suggestion |
|------|-----------|-------|-----------|
| **Rule 5** | (L2 problem) + Q6=level1 | Severe capability mismatch | Upgrade to L2 / Submit to CoE / Simplify scope |
| **Rule 6** | Q3=integrate + Q3.5=atomic_task + (Q6=level2 OR level3) | Over-engineering | Submit to CoE as L1 API |
| **Rule 11** | Q5=high_performance + (Q6=level1 OR level2) | L3 logic capability mismatch | L2 orchestration + L3 logic microservice |

#### Blocked Rules

| Rule | Condition | Issue | Action |
|------|-----------|-------|--------|
| **Rule 9** | Q6=none | Missing operations commitment | Ensure L2 or L3 commitment before proceeding |

### Rule Details

**Rule 1, 4.5: Backend Engine Integration**
- **Scenario**: Integrate backend process management into existing workbench (e.g., UAW-T1)
- **Technology**: Bizagi manages SLA, approvals, and pushes tasks back to workbench
- **Team**: L2 citizen developers configure and maintain

**Rule 2, 4.6: Atomic Task Integration**
- **Scenario**: Single, repeatable automation task integrated into workbench
- **Technology**: Generic L1 Task API (any capability level can use)
- **Note**: If L2/L3 team builds this, it's over-engineering (Rule 6 warning)

**Rule 3, 4.7: Standalone Process**
- **Scenario**: New strategic core process or modify/replace existing standalone process
- **Technology**: Bizagi (BPA) for long-term strategic processes
- **Team**: L2 citizen developers design and configure

**Rule 4: Tactical Application**
- **Scenario**: Temporary/urgent application with limited lifespan
- **Technology**: Power Platform (LCAP) for rapid delivery
- **Team**: L2 citizen developers build and maintain

**Rule 7: Professional Development**
- **Scenario**: Any scenario with L3 professional development team
- **Technology**: Custom microservices on professional platforms (Java/K8s)
- **Team**: Professional developers with DevOps support

**Rule 5: Severe Capability Mismatch**
- **Condition**: L2-level problem (BPA/LCAP needed) but only L1 resources (cannot code)
- **Action**: Upgrade team capability / Submit to CoE / Simplify scope

**Rule 6: Over-Engineering Warning**
- **Condition**: Atomic task integration but using L2/L3 resources
- **Action**: Submit to CoE to build as generic L1 API for reuse

**Rule 11: Logic Complexity Mismatch**
- **Condition**: High-performance logic (AI/ML) but only L1/L2 resources
- **Action**: Use L2 for orchestration + L3 microservice for complex logic

**Rule 9: No Operations Commitment**
- **Condition**: No clear capability-platform-operations combination
- **Action**: Block project until L2 or L3 commitment is secured

### Attachment Rules (Auto-Applied)

**L1 RPA for Legacy Systems**
- **Condition**: Q4 = legacy_involved OR mix
- **Action**: Auto-add L1 RPA component (BluePrism)
- **Purpose**: Handle legacy system interactions without APIs

---

## 🎯 Capability Levels Explained

### Level 1: Business/Rule Expert
- **Skills**: Can define business rules and requirements
- **Limitations**: Cannot code or maintain automation processes
- **Platform**: None (defines requirements for others to implement)
- **Use Case**: Defining business logic, requirements gathering

### Level 2: Citizen Developer + LCAP/BPA
- **Skills**: Can use Power Platform or Bizagi
- **Capabilities**: Build and maintain processes, commit to ongoing operations
- **Platforms**: Power Platform (LCAP), Bizagi (BPA)
- **Use Case**: Most business processes, tactical applications

### Level 3: Professional Development Team
- **Skills**: Professional developers with professional platforms
- **Capabilities**: Build complex, high-performance solutions with DevOps
- **Platforms**: Java/K8s, microservices, professional platforms
- **Use Case**: Complex, high-performance, enterprise-grade solutions

---

## 📊 Recommendation Types

Both selectors use consistent recommendation types:

| Type | Meaning | Color |
|------|---------|-------|
| **matched** | Perfect alignment between problem and resources | Green |
| **downgrade** | Over-engineering detected, simpler solution recommended | Blue |
| **warning** | Capability mismatch or high risk, proceed with caution | Yellow |
| **blocked** | Critical issue, cannot proceed without resolution | Red |
| **info** | Additional information or cost-benefit review needed | Gray |

---

## 🔄 Evaluation Flow

### Data Ingestion Selector Flow
```
Q1 (Strategic Choice)
  ├─ Yes → Shift-Left (STOP)
  └─ No → Q2 (Tactical Diagnosis)
      ├─ Mapping → Template-Based (STOP)
      └─ Interpretation → Q3 (AI Diagnosis)
          └─ Q3.1 + Q3.2 + Q3.3 + Q3.4 → Rule Engine (9 rules)
```

### Process Orchestration Selector Flow
```
Q1 (Process Scope)
  ├─ New → Q2 (Business Nature) → Q3
  └─ Modify/Replace → Q3 (Integration Requirement)
      ├─ Integrate → Q3.5 (Integration Strategy) → Q4
      └─ Standalone → Q4 (Integration Footprint)
          → Q5 (Logic Complexity)
          → Q6 (Capability Match)
          → Rule Engine (11 rules)
```

---

## 🚀 Key Design Principles

1. **Progressive Disclosure**: Questions are shown conditionally based on previous answers
2. **Early Exit**: Fast-path rules stop evaluation early when clear recommendations exist
3. **Capability-Centric**: Both selectors emphasize matching team capability with solution complexity
4. **Risk Awareness**: Warning and blocked types prevent mismatched implementations
5. **Practical Guidance**: Each recommendation includes technology, next steps, and warnings

---

**Document Version**: 1.0
**Implementation Status**: Production
**Last Verified**: 2025-12-15


