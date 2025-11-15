/**
 * Process Orchestration Dimension Overview
 */

export const PROCESS_ORCHESTRATION_OVERVIEW = {
  title: 'Dimension 2: Process Orchestration',
  description:
    'This dimension guides you through designing a standardized and architecturally sound "technology stack" for your automation use case. It helps you decide between integrating existing workbenches or building new tactical/strategic applications, and matches you with the right capability level (L1: RPA/iPaaS, L2: BPA/LCAP, or L3: Custom Code).',
  whenToUse:
    'Use this dimension when you need to design the orchestration and technology architecture for your automation process. This includes deciding whether to leverage existing platforms, build new applications, and determining the appropriate technology stack (L1, L2, or L3) based on your integration footprint, logic complexity, and team capabilities.',
};

export const PROCESS_ORCHESTRATION_MERMAID_DIAGRAM = `
graph TD
    A["Q1: Process Scope<br/>New / Modify / Replace?"]

    A -->|New| Q2["Q2: Business Nature<br/>Strategic / Tactical?"]
    A -->|Modify| Q3["Q3: Integration Requirement<br/>Integrate / Standalone?"]
    A -->|Replace| Q3

    Q2 -->|Strategic| Q3
    Q2 -->|Tactical| Q3

    Q3 -->|Integrate to Workbench| Q3_5["Q3.5: Integration Strategy<br/>Backend Engine / Atomic Task?"]
    Q3 -->|Standalone| Q4["Q4: Integration Footprint<br/>Modern / Legacy / Mix?"]

    Q3_5 -->|Backend Engine| Q4
    Q3_5 -->|Atomic Task| Q4

    Q4 --> Q5["Q5: Logic Complexity<br/>Standard Rules / High-Performance?"]

    Q5 --> Q6["Q6: Capability Match<br/>L1 / L2 / L3 / None?"]

    Q6 --> RULE_ENGINE["Rule Engine Evaluation"]

    RULE_ENGINE --> R1{"Rule 1-4.7, 7:<br/>Matched Conditions?"}

    R1 -->|Rule 1: Integrate+Backend+L2| R1_MATCH["✓ Bizagi BPA<br/>Backend Engine Integration"]
    R1 -->|Rule 2: Integrate+Atomic| R2_MATCH["✓ L1 Task API<br/>Atomic Task Integration"]
    R1 -->|Rule 3: New+Strategic+Standalone+L2| R3_MATCH["✓ Bizagi BPA<br/>New Strategic Process"]
    R1 -->|Rule 4: New+Tactical+Standalone+L2| R4_MATCH["✓ Power Platform LCAP<br/>New Tactical App"]
    R1 -->|Rule 4.5: Modify/Replace+Backend+L2| R45_MATCH["✓ Bizagi BPA<br/>Modify/Replace Backend"]
    R1 -->|Rule 4.6: Modify/Replace+Atomic| R46_MATCH["✓ L1 Task API<br/>Modify/Replace Atomic"]
    R1 -->|Rule 4.7: Modify/Replace+Standalone+L2| R47_MATCH["✓ Bizagi BPA<br/>Modify/Replace Standalone"]
    R1 -->|Rule 7: L3| R7_MATCH["✓ Custom Microservice<br/>L3 Professional Dev"]

    R1 -->|No Match| R5{"Rule 5, 6, 11:<br/>Warning Conditions?"}

    R5 -->|Rule 5: L2Problem+L1| R5_WARN["⚠ Severe Mismatch<br/>Upgrade L2 / Submit CoE / Simplify"]
    R5 -->|Rule 6: Atomic+L2/L3| R6_WARN["⚠ Over-Engineering<br/>Submit to CoE as L1 API"]
    R5 -->|Rule 11: HighPerf+L1/L2| R11_WARN["⚠ L3 Logic Mismatch<br/>L2 Orchestration + L3 Logic"]

    R5 -->|No Match| R9{"Rule 9:<br/>Q6 = none?"}

    R9 -->|Yes| R9_BLOCK["✗ Missing Commitment<br/>Ensure L2 or L3 Commitment"]
    R9 -->|No| DEFAULT["No Matching Rule<br/>Review Inputs"]

    R1_MATCH --> ATTACH{"Check Attachment<br/>Q4=Legacy/Mix?"}
    R2_MATCH --> ATTACH
    R3_MATCH --> ATTACH
    R4_MATCH --> ATTACH
    R45_MATCH --> ATTACH
    R46_MATCH --> ATTACH
    R47_MATCH --> ATTACH
    R7_MATCH --> ATTACH

    ATTACH -->|Yes| ADD_RPA["Add L1_RPA Component"]
    ATTACH -->|No| END["Proceed to Implementation"]
    ADD_RPA --> END

    R5_WARN --> END
    R6_WARN --> END
    R11_WARN --> END
    R9_BLOCK --> END
    DEFAULT --> END

    style A fill:#e1f5ff
    style Q2 fill:#e1f5ff
    style Q3 fill:#e1f5ff
    style Q3_5 fill:#e1f5ff
    style Q4 fill:#fff3e0
    style Q5 fill:#fff3e0
    style Q6 fill:#fff3e0
    style RULE_ENGINE fill:#fff9c4
    style R1 fill:#fff9c4
    style R5 fill:#fff9c4
    style R9 fill:#fff9c4
    style ATTACH fill:#fff9c4

    style R1_MATCH fill:#c8e6c9
    style R2_MATCH fill:#c8e6c9
    style R3_MATCH fill:#c8e6c9
    style R4_MATCH fill:#c8e6c9
    style R45_MATCH fill:#c8e6c9
    style R46_MATCH fill:#c8e6c9
    style R47_MATCH fill:#c8e6c9
    style R7_MATCH fill:#c8e6c9

    style R5_WARN fill:#ffccbc
    style R6_WARN fill:#ffccbc
    style R11_WARN fill:#ffccbc

    style R9_BLOCK fill:#ffcdd2

    style ADD_RPA fill:#fff9c4
    style DEFAULT fill:#e0e0e0
    style END fill:#b2dfdb
`;

