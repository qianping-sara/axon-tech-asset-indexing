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

## Process Flow

Start → Initiation → Document Received? → Validation & Enrichment → Compliance Check → Fraud Check → STP Qualification → Transaction Processing → End

- Call a service to perform validation and enrichment
- Call a service to check for STP qualification and transaction processing
- Discard (if Document Received = No)
- Manual Processing (if any check fails)

## Key Design Principles

- Redesign processes for automation first & STP
- UIs to be redesigned – to present relevant information to agent & to eliminate swivel chair
- API first to modern PaaS to increase levels of straight through processing, automating processes E2E
- Decouple and create reusable components containing functions and rules
  - Micro-UIs
  - Validation & Enrichment services
  - Orchestration APIs
- Underwriting automation
- Options for process orchestration
  - BPM/workflow
  - New orchestration component

## Next Steps

- Refine the architecture with Claims and Revivals automation

