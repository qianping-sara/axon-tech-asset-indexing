# Asset Classification System Design

**Version**: 2.0  
**Last Updated**: 2025-11-05  
**Status**: Active

---

## 📋 Overview

This document defines the comprehensive asset classification system for Axon, including:
- 7 primary categories (L1)
- 34 asset types (L2)
- Classification hierarchy and relationships
- Migration guide from v1.0 to v2.0

---

## 🏗️ Classification Hierarchy

### Level 1: Categories (7 total)

| # | Category ID | Display Name | Description | Asset Count |
|---|---|---|---|---|
| 1 | `CODE_COMPONENTS` | Code & Components | Reusable code modules, libraries, frameworks, and UI components | - |
| 2 | `SERVICES_APIS` | Services & APIs | Microservices, REST/GraphQL APIs, and integration services | - |
| 3 | `AI_ML_SERVICES` | AI/ML Services | Machine learning models, LLM services, and AI agents | - |
| 4 | `AUTOMATION_WORKFLOWS` | Automation & Workflows | RPA bots, no-code workflows, and business processes | - |
| 5 | `DATA_ANALYTICS` | Data & Analytics | Datasets, data pipelines, schemas, and data products | - |
| 6 | `ARCHITECTURE_GOVERNANCE` | Architecture & Governance | Architecture designs, standards, policies, and governance documents | - |
| 7 | `KNOWLEDGE_PRACTICES` | Knowledge & Practices | SOPs, playbooks, tutorials, and best practices | - |

---

## 📊 Complete Asset Classification Table

| Category | Asset Type | Description | Example |
|---|---|---|---|
| **CODE_COMPONENTS** | Scripts | Reusable automation scripts (Shell, Python, etc.) | "Deployment automation script" |
| | Frontend Components | Reusable UI components (React, Vue, etc.) | "Shared Date Picker component" |
| | Backend Libraries | Reusable backend modules and packages | "Shared Java library for policyholder verification" |
| | Development Frameworks | SDKs, scaffolding, and development toolkits | "Development Framework, SDK" |
| | Open Source Projects | Curated and approved open-source tools | "Curated list of approved Python libraries" |
| **SERVICES_APIS** | REST APIs | HTTP-based services for system-to-system interaction | "Policy Basic Info API, Banking Detail Check API" |
| | GraphQL APIs | Flexible query language APIs | "Mobile App Gateway API" |
| | Microservices | Domain-driven services oriented to business scenarios | "Scenario driven domain API" |
| | Integration Services | Middleware components connecting disparate systems | "ETL services" |
| **AI_ML_SERVICES** ⭐ | ML Models | Trained machine learning models for prediction/classification | "Fraud Detection Model", "Risk Scoring Model" |
| | LLM Services | Large Language Model services and APIs | "Document Classification LLM", "Chatbot Service" |
| | AI Agents | Autonomous AI agents for specific tasks | "Customer Service Agent", "Data Analysis Agent" |
| | ML Pipelines | End-to-end ML workflows (training, evaluation, deployment) | "Model Training Pipeline", "Feature Engineering Pipeline" |
| | Feature Stores | Centralized repositories for ML features | "Customer Features Store", "Transaction Features Store" |
| **AUTOMATION_WORKFLOWS** | RPA Bots | Robotic Process Automation components | "RPA Bot" |
| | No-Code Workflows | Low-code/no-code automation platforms | "Front-end Widget, No-code App, Plugin" |
| | Business Processes | Business logic and process definitions (BPMN) | "Process/Subprocess module inventory (Bizagi)", "Revival Qualification rules" |
| | Scheduled Jobs | Batch processing tasks | "Synchronizing data from Bancs to PVB+" |
| **DATA_ANALYTICS** | Data Products | Standardized, governed datasets for business scenarios | "Data/Data product" |
| | Data Schemas | Formal data structure definitions (JSON, Avro, etc.) | "Data Template, Data platform schema" |
| | Datasets | Cleansed, curated foundational data collections | "Data Set" |
| | Data Pipelines | ETL/ELT workflows for data movement and transformation | "Nightly pipeline from core systems to data warehouse" |
| | Data Dictionaries | Centralized data element definitions and relationships | "Enterprise Data Dictionary for customer domain" |
| **ARCHITECTURE_GOVERNANCE** | Reference Architectures | High-level technical architecture designs | "Automation CoE Blueprint" |
| | Solution Patterns | Standardized designs for recurring business problems | "Revival Qualification Service Design, Partial STP Report (UI Design)" |
| | Technology Stacks | Approved technology combinations for project types | "Standard Java Spring Boot stack" |
| | Standards | Mandatory rules and specifications | "API Service Catalog, Data Schemas" |
| | Principles | High-level direction statements | "Cloud-First", "CoE Vision Guiding Principles" |
| | Checklists | Verifiable quality assurance lists | "Deployment Readiness Checklist", "Security Review Checklist" |
| | Policies | Governance documents defining operating models | "CoE Governance Charter" |
| | Decision Records | Immutable logs of architectural decisions | "ADR record" |
| **KNOWLEDGE_PRACTICES** | SOPs | Step-by-step operational procedures | "SOP for new API deployment" |
| | Playbooks | Strategic guides for complex tasks | "Process Optimization Playbook", "Opportunity Assessment Framework" |
| | Best Practices | Curated principles and successful patterns | "Tool Selection Guide", "Selection criteria for Bizagi, Rule engine..." |
| | Tutorials | Hands-on learning materials | "How to connect to the Policy API tutorial" |
| | Quick Start Guides | Concise actionable instructions | "5-minute quick start for the development framework" |

---

## 🔄 Migration Guide: v1.0 → v2.0

### Changes Summary

| Change Type | Details |
|---|---|
| **New Category** | `AI_ML_SERVICES` added as Category L1 |
| **Moved Asset Types** | `AI/ML Services` moved from `SERVICES_APIS` to `AI_ML_SERVICES` |
| **New Asset Types** | ML Models, LLM Services, AI Agents, ML Pipelines, Feature Stores |
| **Total Categories** | 6 → 7 |
| **Total Asset Types** | 32 → 34 |

### Migration Steps

1. **Database Schema Update**
   - Add `AI_ML_SERVICES` to `Category` enum in Prisma schema
   - Create migration script to update existing assets

2. **Code Updates**
   - Update `ASSET_TYPES_BY_CATEGORY` in `src/lib/constants/categories.ts`
   - Update `CATEGORIES` array with new category definition
   - Update all related constants and types

3. **Data Migration**
   - Identify all assets with `assetType = 'AI/ML Services'`
   - Update their `category` from `SERVICES_APIS` to `AI_ML_SERVICES`
   - Verify data integrity

4. **UI/UX Updates**
   - Update category filters and dropdowns
   - Update asset type filters
   - Update category display names and icons
   - Update search and discovery pages

---

## 📐 Design Principles

1. **Business-Driven**: Categories reflect business domains and use cases
2. **Scalable**: Easy to add new asset types within categories
3. **Clear Boundaries**: Minimal overlap between categories
4. **User-Friendly**: Intuitive naming and organization
5. **Governance-Ready**: Supports compliance and audit requirements

---

## 🔗 Related Documents

- `CLASSIFICATION_INTEGRATION_DESIGN.md` - Technical implementation details
- `TASK_3_REVIEW_COMPLETE.md` - Previous classification implementation
- `TASK_3_READY_TO_START.md` - Initial classification design

---

## ✅ Implementation Checklist

- [ ] Update Prisma schema with new Category enum
- [ ] Create and run database migration
- [ ] Update frontend constants (`categories.ts`)
- [ ] Update API endpoints and filters
- [ ] Update UI components (filters, dropdowns, displays)
- [ ] Migrate existing asset data
- [ ] Update tests and test data
- [ ] Update documentation and help text
- [ ] Deploy to staging environment
- [ ] Verify data integrity and UI functionality
- [ ] Deploy to production

---

## 📞 Questions & Support

For questions about this classification system, please refer to the implementation team or the Axon documentation.

