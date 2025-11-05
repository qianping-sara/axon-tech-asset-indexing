# Getting Started with Axon

Welcome to Axon, your comprehensive technical asset discovery and management platform.

## 🎯 Platform Positioning

### The Problem

When automation assets are scattered across disconnected systems (Bizagi, Gravitee, EA Platform, RPA Control Room, Confluence), developers waste time searching and often reinvent solutions that already exist. This leads to:

- **Wasted Effort**: "Reinventing the wheel" violates the "Accelerate" objective
- **Increased Costs**: Redundant work and higher maintenance burden
- **Poor Decisions**: Lack of clear references and supporting tools for solution selection
- **Visibility Gaps**: Business teams struggle to track system requirements and technical contributions

### The Solution: Your Unified Discovery Portal

**Axon is the Golden Index for automation assets.** We don't replace your existing systems—we connect them, providing a **single search interface** to discover all automation capabilities across your organization.

### Core Value Proposition

- 🔍 **Contextual Search**: Search across all asset types and discover related assets with one click
- 🛡️ **Trusted Metadata**: Indexed and linked data from your source systems
- 📈 **Accelerate Delivery, Reduce Costs**: Reuse proven assets instead of rebuilding

### Key Differentiators

**Unlike Gravitee (API Portal)**
- Gravitee is the "System of Record" for APIs (publication, security, lifecycle)
- Axon is the "System of Discovery" for automation—it answers "To implement this business process, which API, which RPA Bot, and which AI model should I use?"

**Unlike Bizagi (Process Platform)**
- Bizagi is the "System of Record" for business processes (modeling, execution, monitoring)
- Axon links the "process steps" within Bizagi to the "technical assets" (APIs, Bots) that implement them

**Unlike EA Platform (Architecture Management)**
- EA Platform is the "System of Record" for architecture blueprints (top-down governance, L1-L5 models)
- Axon is a "practical utility" for frontline developers—a bottom-up discovery tool focused on "what's available for reuse today"

## 📦 Asset Categories

Axon manages **7 primary categories** of technical assets, each containing multiple asset types:

### 1. **Code & Components**
Reusable code modules, libraries, frameworks, and UI components
- Scripts (Shell, Python, etc.)
- Frontend Components (React, Vue, etc.)
- Backend Libraries
- Development Frameworks & SDKs
- Open Source Projects

### 2. **Services & APIs**
Microservices, REST/GraphQL APIs, and integration services
- REST APIs
- GraphQL APIs
- Microservices
- Integration Services

### 3. **AI/ML Services** ⭐
Machine learning models, LLM services, and AI agents
- ML Models (Fraud Detection, Risk Scoring, etc.)
- LLM Services (Document Classification, Chatbots, etc.)
- AI Agents
- ML Pipelines
- Feature Stores

### 4. **Automation & Workflows**
RPA bots, no-code workflows, and business processes
- RPA Bots
- No-Code Workflows
- Business Processes (BPMN)
- Scheduled Jobs

### 5. **Data & Analytics**
Datasets, data pipelines, schemas, and data products
- Data Products
- Data Schemas
- Datasets
- Data Pipelines (ETL/ELT)
- Data Dictionaries

### 6. **Architecture & Governance**
Architecture designs, standards, policies, and governance documents
- Reference Architectures
- Solution Patterns
- Technology Stacks
- Standards & Specifications
- Principles & Guidelines
- Checklists
- Policies
- Decision Records (ADRs)

### 7. **Knowledge & Practices**
SOPs, playbooks, tutorials, and best practices
- Standard Operating Procedures (SOPs)
- Playbooks & Guides
- Best Practices
- Tutorials & Learning Materials
- Quick Start Guides

## 🎯 Key Features

### 🔍 Search & Discovery
- **Full-Text Search**: Search assets by name, description, or keywords
- **Category Browsing**: Browse all assets within a specific category
- **Tag Filtering**: Filter assets by tags for precise discovery
- **Recently Updated**: Discover the latest and most recently updated assets
- **Advanced Filtering**: Combine multiple filters for targeted searches

### 📋 Asset Details
Each asset includes:
- **Comprehensive Description**: Full Markdown-formatted documentation
- **Metadata**: Version, status, owner, and creation/update dates
- **Tags**: Categorization tags for easy filtering and discovery
- **Asset Type**: Specific classification within the category
- **Related Assets**: Links to related or dependent assets
- **Version History**: Track changes and updates over time

### 🔄 Content as Code Workflow
- Assets are stored as **Markdown files** with YAML frontmatter
- Changes are **version-controlled** via Git
- Automatic **indexing and sync** via GitHub webhooks
- **GitOps-friendly**: Manage assets through pull requests and code reviews

## 🚀 How to Use Axon

### 1. **Browse by Category**
Start on the home page and explore assets organized by category. Click on any category card to see all assets within that category.

### 2. **Search for Specific Assets**
Use the search bar at the top to find assets by name or keyword. Results are filtered in real-time as you type.

### 3. **Discover New Assets**
Visit the **Discover** page to see recently updated assets and trending content in your organization.

### 4. **View Asset Details**
Click on any asset to view its full details, including:
- Complete documentation
- Associated tags and metadata
- Related assets
- Version information

### 5. **Filter by Tags**
Use tags to narrow down results and find assets relevant to your specific needs (e.g., "Python", "REST API", "Real-time").

## 💡 Tips & Best Practices

- **Use Specific Tags**: Tag assets with technologies, use cases, and business domains for better discoverability
- **Check Regularly**: Visit the Discover page to stay updated with new and improved assets
- **Provide Feedback**: Help improve asset quality by reporting issues or suggesting improvements
- **Link Related Assets**: When creating new assets, link to related or dependent assets for better navigation
- **Keep Metadata Updated**: Ensure asset metadata (version, status, owner) is kept current

## 📝 Asset Metadata

Each asset includes the following metadata:
- **Name**: Asset identifier and display name
- **Description**: Brief summary of the asset
- **Category**: Primary classification (one of 7 categories)
- **Asset Type**: Specific type within the category
- **Version**: Semantic versioning (e.g., 1.0.0)
- **Status**: PUBLISHED, DRAFT, DEPRECATED, or ARCHIVED
- **Owner**: Team or individual responsible for the asset
- **Tags**: Multiple tags for categorization and discovery
- **Created/Updated**: Timestamps for version tracking

## ❓ Need Help?

For more information or support:
- Check the asset documentation for detailed usage instructions
- Contact your team administrator
- Refer to the asset owner listed in the metadata

