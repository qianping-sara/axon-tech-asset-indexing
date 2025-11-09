/**
 * Data Ingestion Dimension Overview
 */

export const DATA_INGESTION_OVERVIEW = {
  title: 'Dimension 1: Data Ingestion',
  description:
    'This dimension guides you through selecting the right data ingestion approach for your automation use case. It helps you decide whether to eliminate unstructured data at the source, use template-based extraction, or leverage AI capabilities.',
  whenToUse:
    'Use this dimension when your automation use case involves ingesting data from external sources (documents, images, APIs, emails, etc.). If your use case does not require data ingestion, you can skip this dimension and proceed to Phase 3.',
};

export const DATA_INGESTION_MERMAID_DIAGRAM = `
graph TD
    A["Dimension 1: Data Ingestion<br/>Does your use case involve data ingestion?"] 
    
    A -->|No| SKIP["Skip to Phase 3<br/>Process Orchestration"]
    A -->|Yes| Q1_1["Q1.1: Strategic Choice<br/>Can input be digitized at source?"]
    
    Q1_1 -->|Yes| SHIFT_LEFT["Result: Shift-Left<br/>Channel-side Transformation"]
    Q1_1 -->|No| Q1_2["Q1.2: Data Characteristics<br/>What is the data type?"]
    
    Q1_2 -->|Structured| TEMPLATE["Result: Template-based<br/>RPA / Script Extraction"]
    Q1_2 -->|Unstructured| Q1_3a["Q1.3a: Reusable Capability<br/>Existing general capability?"]
    
    Q1_3a -->|Yes| Q1_3b["Q1.3b: Precision Check<br/>Does it meet requirements?"]
    Q1_3a -->|No| Q1_3c["Q1.3c: Build/Improve<br/>What approach?"]
    
    Q1_3b -->|Yes| USE_EXISTING["Result: Use Existing<br/>General Model API"]
    Q1_3b -->|No| Q1_3c
    
    Q1_3c -->|Config| CONFIG["Result: Configuration<br/>Parameter Tuning"]
    Q1_3c -->|Training| Q1_3d["Q1.3d: Data & Tools<br/>Have data + tools?"]
    Q1_3c -->|Specialized| CUSTOM["Result: Custom Model<br/>Professional Team"]
    
    Q1_3d -->|Yes| AUTOML["Result: AutoML Training<br/>Self-service Training"]
    Q1_3d -->|No| CUSTOM
    
    SHIFT_LEFT --> PHASE3["Proceed to Phase 3"]
    TEMPLATE --> PHASE3
    USE_EXISTING --> PHASE3
    CONFIG --> PHASE3
    AUTOML --> PHASE3
    CUSTOM --> PHASE3
    SKIP --> PHASE3
    
    style A fill:#e1f5e1
    style Q1_1 fill:#e1f5e1
    style Q1_2 fill:#e1f5e1
    style Q1_3a fill:#e1f5e1
    style Q1_3b fill:#e1f5e1
    style Q1_3c fill:#e1f5e1
    style Q1_3d fill:#e1f5e1
    style SHIFT_LEFT fill:#c8e6c9
    style TEMPLATE fill:#c8e6c9
    style USE_EXISTING fill:#c8e6c9
    style CONFIG fill:#c8e6c9
    style AUTOML fill:#c8e6c9
    style CUSTOM fill:#c8e6c9
    style PHASE3 fill:#fff9c4
    style SKIP fill:#fff9c4
`;

