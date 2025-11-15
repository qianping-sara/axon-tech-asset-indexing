/**
 * Data Ingestion Dimension Overview
 */

export const DATA_INGESTION_OVERVIEW = {
  title: 'Dimension 1: Data Ingestion',
  description:
    'This dimension guides you through selecting the right data ingestion approach for your automation use case. It helps you decide whether to eliminate unstructured data at the source, use template-based extraction, or leverage AI capabilities.',
  whenToUse:
    'Use this dimension when your automation use case involves ingesting data from external sources (documents, images, APIs, emails, etc.). If your use case does not require data ingestion, you can skip this dimension and proceed to other selector.',
};

export const DATA_INGESTION_MERMAID_DIAGRAM = `
graph TD
    A["Q1: Strategic Choice<br/>Can input be digitized at source?"]

    A -->|Yes| SHIFT_LEFT["✓ Shift-Left Strategy<br/>Channel-side Transformation<br/>Eliminate unstructured data at source"]
    A -->|No| Q2["Q2: Tactical Diagnosis<br/>What is the main challenge?"]

    Q2 -->|Mapping| TEMPLATE["✓ Template-based Extraction<br/>RPA / Script Extraction<br/>Structured data, predictable fields"]
    Q2 -->|Interpretation| Q3_1["Q3.1: Problem Type Diagnosis<br/>Common / New Pattern / New Cognitive?"]

    Q3_1 -->|Common| COMMON_CHECK{"Rule 1 & 8:<br/>Business Criticality?"}
    Q3_1 -->|New Pattern| Q3_2["Q3.2: Capability Match<br/>L1 / L2 / L3 / None?"]
    Q3_1 -->|New Cognitive| Q3_2

    COMMON_CHECK -->|Efficiency| DOWNGRADE1["⬇ Use Existing Model<br/>Platform General Model API<br/>Over-design detected"]
    COMMON_CHECK -->|Critical| WARNING1["⚠ High Risk Warning<br/>General model may not meet >99% SLA<br/>Must conduct strict PoC testing"]

    Q3_2 -->|Level 1| LEVEL1_CHECK{"Rule 5:<br/>Problem Type?"}
    Q3_2 -->|Level 2| LEVEL2_CHECK{"Rule 2, 6:<br/>Problem Type?"}
    Q3_2 -->|Level 3| LEVEL3_CHECK{"Rule 3, 9:<br/>Problem Type?"}
    Q3_2 -->|None| WARNING_NONE["⚠ Capability Assessment Required<br/>No clear capability-platform-operations<br/>combination yet"]

    LEVEL1_CHECK -->|New Pattern/Cognitive| WARNING2["⚠ Severe Capability Mismatch<br/>L2/L3 problem + L1 resources<br/>Options: Upgrade L2 / Submit CoE / Simplify"]

    LEVEL2_CHECK -->|New Pattern| Q3_3_L2["Q3.3: Business Criticality<br/>Efficiency / Critical?"]
    LEVEL2_CHECK -->|New Cognitive| WARNING3["⚠ Capability Mismatch<br/>L3 problem + L2 resources<br/>AutoML cannot handle complex reasoning"]

    Q3_3_L2 -->|Efficiency| Q3_4_L2["Q3.4: Data Readiness<br/>Ready / Partial / Not Ready?"]
    Q3_3_L2 -->|Critical| WARNING4["⚠ High Accuracy Requirement<br/>AutoML + Level 2 can work<br/>but needs careful tuning & professional support"]

    Q3_4_L2 -->|Not Ready| BLOCKED["✗ Project Blocked<br/>Data Not Ready<br/>Must focus on data collection & governance<br/>Estimated: 1-3 months"]
    Q3_4_L2 -->|Partial| MATCHED1["✓ AutoML Model Training<br/>Level 2 + New Pattern + Efficiency<br/>Data Preparation: 2-4 weeks"]
    Q3_4_L2 -->|Ready| MATCHED1

    LEVEL3_CHECK -->|New Pattern| MATCHED2["✓ Custom Model Development<br/>Level 3 + New Pattern<br/>Professional AI/ML team"]
    LEVEL3_CHECK -->|New Cognitive| Q3_3_L3["Q3.3: Business Criticality<br/>Efficiency / Critical?"]

    Q3_3_L3 -->|Efficiency| WARNING5["⚠ Cost-Benefit Review<br/>L3 resources for efficiency gain<br/>Confirm TCO & ROI before start"]
    Q3_3_L3 -->|Critical| MATCHED3["✓ Custom Model Development<br/>Level 3 + New Cognitive + Critical<br/>Professional AI/ML team"]

    WARNING5 --> MATCHED3_INFO["✓ Custom Model Development<br/>with Cost-Benefit Review"]

    SHIFT_LEFT --> END["Proceed to Phase 3:<br/>Process Orchestration"]
    TEMPLATE --> END
    DOWNGRADE1 --> END
    WARNING1 --> END
    WARNING2 --> END
    WARNING3 --> END
    WARNING4 --> END
    WARNING_NONE --> END
    BLOCKED --> END
    MATCHED1 --> END
    MATCHED2 --> END
    MATCHED3 --> END
    MATCHED3_INFO --> END

    style A fill:#e1f5ff
    style Q2 fill:#e1f5ff
    style Q3_1 fill:#fff3e0
    style Q3_2 fill:#fff3e0
    style Q3_3_L2 fill:#fff3e0
    style Q3_3_L3 fill:#fff3e0
    style Q3_4_L2 fill:#fff3e0
    style COMMON_CHECK fill:#fff3e0
    style LEVEL1_CHECK fill:#fff3e0
    style LEVEL2_CHECK fill:#fff3e0
    style LEVEL3_CHECK fill:#fff3e0

    style SHIFT_LEFT fill:#c8e6c9
    style TEMPLATE fill:#c8e6c9
    style DOWNGRADE1 fill:#c8e6c9
    style MATCHED1 fill:#c8e6c9
    style MATCHED2 fill:#c8e6c9
    style MATCHED3 fill:#c8e6c9
    style MATCHED3_INFO fill:#c8e6c9

    style WARNING1 fill:#ffccbc
    style WARNING2 fill:#ffccbc
    style WARNING3 fill:#ffccbc
    style WARNING4 fill:#ffccbc
    style WARNING5 fill:#ffccbc
    style WARNING_NONE fill:#ffccbc

    style BLOCKED fill:#ffcdd2

    style END fill:#b2dfdb
`;

