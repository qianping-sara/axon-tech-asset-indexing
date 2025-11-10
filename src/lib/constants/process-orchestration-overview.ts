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
    A["Q1: Strategic Intent<br/>What is your strategic intent?"]

    A -->|Integrate Capability| Q2["Q2: Integration Strategy<br/>What type of integration?"]
    A -->|New Strategic Process| Q3["Q3: Confirmation<br/>Confirm new strategic path"]
    A -->|New Tactical Application| Q3

    Q2 -->|Backend Engine| Q4["Q4: Integration Footprint<br/>Modern / Legacy / Mix?"]
    Q2 -->|Atomic Task| Q4
    Q2 -->|Workbench Enhancement| REDIRECT["Redirect: Contact Core System Team"]

    Q3 --> Q4

    Q4 --> Q5["Q5: Logic Complexity<br/>Standard Rules / High-Performance?"]

    Q5 --> Q6["Q6: Capability Match<br/>L1 / L2 / L3 / None?"]

    Q6 --> RULE_ENGINE["Apply Rule Engine<br/>11 Rules for Recommendation"]

    RULE_ENGINE --> MATCHED["Recommendation: Matched<br/>Perfect Alignment"]
    RULE_ENGINE --> WARNING["Recommendation: Warning<br/>Capability Mismatch"]
    RULE_ENGINE --> BLOCKED["Recommendation: Blocked<br/>Resource Commitment Missing"]
    RULE_ENGINE --> REDIRECT2["Recommendation: Redirect<br/>Escalate to Appropriate Team"]

    MATCHED --> END["Proceed to Implementation"]
    WARNING --> END
    BLOCKED --> END
    REDIRECT --> END
    REDIRECT2 --> END

    style A fill:#e1f5ff
    style Q2 fill:#e1f5ff
    style Q3 fill:#e1f5ff
    style Q4 fill:#fff3e0
    style Q5 fill:#fff3e0
    style Q6 fill:#fff3e0
    style RULE_ENGINE fill:#fff9c4
    style MATCHED fill:#c8e6c9
    style WARNING fill:#ffccbc
    style BLOCKED fill:#ffcdd2
    style REDIRECT fill:#b3e5fc
    style REDIRECT2 fill:#b3e5fc
    style END fill:#b2dfdb
`;

