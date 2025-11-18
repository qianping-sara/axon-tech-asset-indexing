---
name: Straight-Through Processing (STP) Automation Pattern
description: Architecture pattern for automating insurance claims and revivals processing with STP-first approach, microservices, and orchestration
category: ARCHITECTURE_GOVERNANCE
assetType: Solution Patterns
version: 1.0.0
status: PUBLISHED
owner: Architecture Team
sourceSystem: Internal
sourceLink: https://axon-tech-asset-indexing.vercel.app/assets/arch_stp_automation_pattern
bizDomain: CLAIM
---

# Automation Pattern (to be evolved)

## Context & Problem Statement

### Background
In modernizing insurance and financial services (e.g., Underwriting, Claims), there is a need to shift from manual-heavy workflows to automated, data-driven processes.

### Problems
- **High Manual Effort**: Traditional processes rely heavily on human intervention for standard transactions
- **Swivel Chair Effect**: Agents act as "human middleware," switching between multiple fragmented UIs to gather data
- **Siloed Systems**: Legacy Policy Administration Systems (PAS) often lack direct integration, preventing end-to-end automation

## Pattern Diagram

The following logic flow illustrates the standard Happy Path for STP and the exception handling for manual intervention:

```
Start → Initiation → Documents Received?
  ├─ Yes → Validation & Enrichment (Service Call)
  │         ├─ Compliance Check Successful?
  │         │  ├─ Yes → Fraud Check Successful?
  │         │  │        ├─ Yes → STP Qualification?
  │         │  │        │        ├─ Yes → Transaction Processing (via API/RPA) → End
  │         │  │        │        └─ No → Manual Processing → End
  │         │  │        └─ No → Manual Processing → End
  │         │  └─ No → Manual Processing → End
  └─ No → Diarise → End
```

## Core Design Principles

### 3.1 Automation First & STP
- Redesign business processes with the explicit goal of achieving Straight-Through Processing (STP)
- Manual intervention should be treated as an exception, not the default

### 3.2 User Centricity (UI refactor)
- **Eliminate "Swivel Chair"**: UIs must be redesigned to aggregate relevant information into a single view for the agent
- **Contextual Data**: Present only necessary data to the agent to facilitate quick decision-making for non-STP cases

### 3.3 API First Strategy
- Prioritize API-based integration with modern Policy Administration Systems (PAS)
- Aim for End-to-End (E2E) automation by exposing core functions as services rather than relying on UI scraping

### 3.4 Decoupling & Modularity
- Avoid monolithic process logic
- Break down the solution into reusable components that create a library of functions and rules

## Technical Architecture Components

Based on the decoupling principle, the solution consists of the following key building blocks:

| Component | Description & Responsibilities |
|-----------|--------------------------------|
| **Micro-UIs** | Modular user interface components that can be embedded in various agent portals to display specific task data |
| **Validation & Enrichment Services** | Independent services responsible for data quality checks (e.g., 3rd party data lookup, internal data validation) |
| **Orchestration APIs** | The "glue" layer that manages the sequence of service calls and state transitions |
| **Process Orchestration Engine** | The engine responsible for executing the flow. Options include: 1) Traditional BPM/Workflow tools, 2) A new, lightweight orchestration component |
| **Transaction Processor** | The execution unit (via API or RPA) that commits the final transaction to the core system (PAS) |

## Roadmap & Evolution

This pattern is designed to be iterative. The current version focuses on the foundational pattern.

### Current Scope
- Initial definition of the generic STP flow

### Target Use Cases
- **Underwriting Automation** (Initial focus)
- **Claims Processing** (To be refined)
- **Revivals Automation** (To be refined)

### Next Steps
- Select the specific Process Orchestration technology (BPM vs. Custom)
- Refine the architecture specifically for the Claims and Revivals domains

