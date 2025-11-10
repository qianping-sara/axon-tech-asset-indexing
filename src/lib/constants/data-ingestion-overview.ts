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

    A -->|Yes| SHIFT_LEFT["Recommendation: Shift-Left<br/>Channel-side Transformation"]
    A -->|No| Q2["Q2: Tactical Diagnosis<br/>What is the main challenge?"]

    Q2 -->|Mapping| TEMPLATE["Recommendation: Template-based<br/>RPA / Script Extraction"]
    Q2 -->|Interpretation| Q3["Q3: AI Capability & Resource Diagnosis"]

    Q3 --> Q3_1["Q3.1: Problem Type<br/>Common / New Pattern / New Cognitive"]

    Q3_1 -->|Common| DOWNGRADE["Recommendation: Use Existing Model<br/>Downgrade to Level 1"]
    Q3_1 -->|New Pattern| Q3_2["Q3.2: Capability Match<br/>Level 1 / 2 / 3 / None"]
    Q3_1 -->|New Cognitive| Q3_2

    Q3_2 --> Q3_3["Q3.3: Business Criticality<br/>Efficiency / Critical"]

    Q3_3 --> Q3_4_CHECK{Q3.1 is<br/>New Pattern or<br/>New Cognitive?}

    Q3_4_CHECK -->|Yes| Q3_4["Q3.4: Data Readiness<br/>Ready / Partial / Not Ready"]
    Q3_4_CHECK -->|No| RECOMMEND["Generate Recommendation<br/>Based on Profile Matching"]

    Q3_4 --> RECOMMEND

    RECOMMEND --> MATCHED["Recommendation: Matched<br/>Perfect Alignment"]
    RECOMMEND --> WARNING["Recommendation: Warning<br/>Capability Mismatch"]
    RECOMMEND --> DOWNGRADE2["Recommendation: Downgrade<br/>Over-engineering Detected"]

    SHIFT_LEFT --> END["Proceed to Phase 3"]
    TEMPLATE --> END
    DOWNGRADE --> END
    DOWNGRADE2 --> END
    MATCHED --> END
    WARNING --> END

    style A fill:#e1f5ff
    style Q2 fill:#e1f5ff
    style Q3 fill:#fff3e0
    style Q3_1 fill:#fff3e0
    style Q3_2 fill:#fff3e0
    style Q3_3 fill:#fff3e0
    style Q3_4 fill:#fff3e0
    style Q3_4_CHECK fill:#fff3e0
    style SHIFT_LEFT fill:#c8e6c9
    style TEMPLATE fill:#c8e6c9
    style DOWNGRADE fill:#c8e6c9
    style DOWNGRADE2 fill:#c8e6c9
    style MATCHED fill:#c8e6c9
    style WARNING fill:#ffccbc
    style RECOMMEND fill:#fff9c4
    style END fill:#b2dfdb
`;

