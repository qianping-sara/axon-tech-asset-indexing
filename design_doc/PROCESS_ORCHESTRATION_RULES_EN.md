# Process Orchestration - Complete Rules Summary

## 📋 Question Flow (7 Questions)

### Q1: Process Scope
**Question**: What type of process are you building?
- **New**: Building a completely new process
- **Modify**: Enhancing an existing process
- **Replace**: Replacing an existing process with a new solution

### Q2: Business Nature (Only shown when Q1='new')
**Question**: What is the business nature of this new process?
- **Strategic**: Long-term, core business process
- **Tactical**: Temporary/urgent application with limited lifespan

### Q3: Integration Requirement
**Question**: Does this process need to integrate into an existing workbench?
- **Integrate to Workbench**: Integrate into existing workbench (e.g., UAW-T1)
- **Standalone**: Run independently, no integration needed

### Q3.5: Integration Strategy (Only shown when Q3='integrate_to_workbench')
**Question**: What type of automation capability does the workbench need?
- **Backend Engine**: Backend process management (SLA, approvals, etc.)
- **Atomic Task**: Single, repeatable automation task

### Q4: Integration Footprint
**Question**: Which systems does this process need to interact with?
- **Modern Only**: Only REST APIs from modern systems
- **Legacy Involved**: Must interact with legacy systems (no API)
- **Mix**: Both modern and legacy systems

### Q5: Logic Complexity
**Question**: How complex is the decision logic?
- **Standard Rules**: Configurable business rules
- **High-Performance**: AI/ML models or complex algorithms

### Q6: Capability Match (Most Critical)
**Question**: What capability does your team have?
- **Level 1**: Business/rule experts, cannot code
- **Level 2**: Citizen developers + LCAP/BPA platform
- **Level 3**: Professional developers + professional platforms
- **None**: No clear capability-platform-operations combination

---

## 🎯 Rule Engine (11 Rules)

### ✅ Matched Rules (Perfect Alignment)

| Rule | Condition | Recommendation | Description |
|------|-----------|-----------------|-------------|
| **Rule 1** | Q3=integrate_to_workbench AND Q3_5=backend_engine AND Q6=level2 | Bizagi (BPA) | Backend engine integration with L2 team |
| **Rule 2** | Q3=integrate_to_workbench AND Q3_5=atomic_task | L1 Task API | Atomic task integration (any Q6) |
| **Rule 3** | Q1=new AND Q2=strategic AND Q3=standalone AND Q6=level2 | Bizagi (BPA) | New strategic process with L2 team |
| **Rule 4** | Q1=new AND Q2=tactical AND Q3=standalone AND Q6=level2 | Power Platform (LCAP) | New tactical application with L2 team |
| **Rule 4.5** | (Q1=modify OR Q1=replace) AND Q3=integrate_to_workbench AND Q3_5=backend_engine AND Q6=level2 | Bizagi (BPA) | Modify/replace backend engine with L2 |
| **Rule 4.6** | (Q1=modify OR Q1=replace) AND Q3=integrate_to_workbench AND Q3_5=atomic_task | L1 Task API | Modify/replace atomic task (any Q6) |
| **Rule 4.7** | (Q1=modify OR Q1=replace) AND Q3=standalone AND Q6=level2 | Bizagi (BPA) | Modify/replace standalone process with L2 |
| **Rule 7** | Q6=level3 | Custom Microservice | L3 professional development |

### ⚠️ Warning Rules (Capability Mismatch)

| Rule | Condition | Issue | Suggestion |
|------|-----------|-------|-----------|
| **Rule 5** | (L2 problem) AND Q6=level1 | Severe capability mismatch | Upgrade to L2 / Submit to CoE / Simplify scope |
| **Rule 6** | Q3=integrate_to_workbench AND Q3_5=atomic_task AND (Q6=level2 OR Q6=level3) | Over-engineering | Submit to CoE as L1 API |
| **Rule 11** | Q5=high_performance AND (Q6=level1 OR Q6=level2) | L3 logic capability mismatch | L2 orchestration + L3 logic microservice |

### ✗ Blocked Rules

| Rule | Condition | Issue | Suggestion |
|------|-----------|-------|-----------|
| **Rule 9** | Q6=none | Missing operations commitment | Ensure L2 or L3 commitment before proceeding |

---

## 🔧 Attachment Rules (Auto-Applied)

### L1 RPA (Legacy Systems)
```
Condition: Q4=legacy_involved OR Q4=mix
Auto-Add: L1_RPA component
Description: Process needs legacy system interaction, should call generic L1 RPA robot (BluePrism)
```

---

## 📊 Rule Evaluation Order

The rule engine evaluates conditions in this order. **The first matching rule returns the result**:

1. **Phase 1**: Matched Rules (Rule 1-4.7, Rule 7)
2. **Phase 2**: Warning Rules (Rule 5, 6, 11)
3. **Phase 3**: Blocked Rules (Rule 9)
4. **Default**: No matching rule found

---

## 💡 Key Decision Points

1. **Q1 (Process Scope)**: Determines if Q2 is shown
   - new → show Q2
   - modify/replace → skip Q2

2. **Q3 (Integration Requirement)**: Determines if Q3.5 is shown
   - integrate_to_workbench → show Q3.5
   - standalone → skip Q3.5

3. **Q6 (Capability Match)**: Most critical decision point
   - level1: Can only define rules, cannot build
   - level2: Can build and maintain with LCAP/BPA
   - level3: Can build professional solutions
   - none: Cannot proceed without commitment

4. **Q5 (Logic Complexity)**: Determines if L3 is needed
   - standard_rules: L1/L2 can handle
   - high_performance: Requires L3 professional team

---

## 🚀 Three Capability Levels

### Level 1: Business/Rule Expert
- Can define business rules and requirements
- Cannot code or maintain automation processes
- Suitable for: Defining requirements, business logic
- Platform: None (rules defined for others to implement)

### Level 2: Citizen Developer + LCAP/BPA
- Can use Power Platform or Bizagi
- Can build and maintain processes
- Commits to ongoing operations and support
- Platforms: Power Platform (LCAP), Bizagi (BPA)
- Suitable for: Most business processes, tactical applications

### Level 3: Professional Development Team
- Professional developers with professional platforms
- Can build complex, high-performance solutions
- Professional DevOps and infrastructure support
- Platforms: Java/K8s, microservices, professional platforms
- Suitable for: Complex, high-performance, enterprise-grade solutions

