---
id: api-revival-qualification
name: Revival Qualification Summary API
description: Orchestrates comprehensive partial STP qualification checks for policy revival including cover eligibility, underwriting, and banking verification
category: SERVICES_APIS
assetType: REST APIs
version: 1.0.0
status: DRAFT
owner: AutomationCoE Team
sourceSystem: Servicing Layer
---

# Revival Qualification Summary API

## Overview

The Revival Qualification Summary API orchestrates the comprehensive partial STP (Straight Through Processing) qualification check for policy revival. This is the main orchestration API that coordinates multiple checks and returns a complete qualification summary.

## Purpose

This API is used to:
- Orchestrate the complete revival qualification process
- Perform partial STP qualification checks
- Generate comprehensive qualification reports
- Support the qualification report requirements for policy revival
- Coordinate multiple validation checks (cover revival, underwriting, simple revival, banking)

## Endpoint

```
POST /api/revival/policies/{policyNumber}/qualification-summary
```

**Base URL**: `https://localhost:8080/dpct`

## Authentication

All requests require Bearer token authentication:

```
Authorization: Bearer {JWT_TOKEN}
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| policyNumber | string | Yes | Policy number identifier (e.g., 202400468) |

## Required Headers

| Header | Type | Required | Example |
|--------|------|----------|---------|
| applicationID | string | Yes | APP001 |
| applicationName | string | Yes | PaymentPortal |
| applicationVersion | string | Yes | 1.2.0 |
| auth | string | Yes | Bearer xyz123abc456 |
| correlationID | string | Yes | corr-123e4567-e89b-12d3-a456-426614174000 |

## Request Body

### Key Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| salesCode | string | Yes | Sales code for advisor verification |
| beneficialBankDetails | object | No | Banking details for verification |

### Example Request

```json
{
  "salesCode": "SALES001",
  "beneficialBankDetails": {
    "clientIdentifier": "CLIENT123",
    "bankName": "National Bank",
    "bankBranchCode": "BRNCH123",
    "bankAccountNumber": "123456789",
    "bankAccountType": "Savings",
    "accountHolder": "John Doe",
    "deductDay": 15
  }
}
```

## Response

### Success Response (200)

```json
{
  "coverRevivalQualification": {
    "eligibleForRevival": true,
    "premiumPaymentRecord": true,
    "checkResult": {
      "resultType": "CHECK_PASSED",
      "failedOn": []
    }
  },
  "underwritingCheck": {
    "coverAmount": 100000.00,
    "lapseTime": 30,
    "checkResult": {
      "resultType": "CHECK_PASSED",
      "failedOn": []
    }
  },
  "simpleRevivalCheck": {
    "brand": "OMP",
    "countryOfPolicy": "South Africa",
    "futureEffectiveDays": 7,
    "paymentMethod": "DEBIT_ORDER",
    "bankMandateStatus": "ACTIVE",
    "checkResult": {
      "resultType": "CHECK_PASSED",
      "failedOn": []
    }
  },
  "policyInformation": {
    "policyNumber": "202400468",
    "productName": "OMP Life Insurance - Death Benefit",
    "policyStatus": "Lapsed",
    "premiumCollectionDate": "2023-10-15",
    "noDealings": false,
    "primaryAdvisorCode": "A12345678",
    "salesCode": "A12345678",
    "checkResult": {
      "resultType": "CHECK_PASSED",
      "failedOn": []
    }
  },
  "bankingDetailAndAvsrResult": {
    "bankingDetailInput": {
      "bankName": "ABSA Bank",
      "branchCode": "470010",
      "accountType": "Savings",
      "accountNumber": "9876543210",
      "accountHolder": "John Doe",
      "deductDay": 15
    },
    "bankingDetailOfCMOS": {
      "bankName": "ABSA Bank",
      "branchCode": "470010",
      "accountType": "Savings",
      "accountNumber": "9876543210",
      "accountHolder": "John Doe",
      "deductDay": 15
    },
    "checkResult": {
      "resultType": "CHECK_PASSED",
      "failedOn": []
    }
  }
}
```

## Response Components

### 1. Cover Revival Qualification
- **eligibleForRevival**: Whether policy is eligible for revival
- **premiumPaymentRecord**: Whether premium payment record meets requirements (≥6 payments before lapse)

### 2. Underwriting Check
- **coverAmount**: Cover amount (if >50k, escalates to underwriting)
- **lapseTime**: Days overdue (if >30 days, re-underwriting required)

### 3. Simple Revival Check
- **brand**: Policy type (OMP or GL)
- **countryOfPolicy**: Country of policy (South Africa)
- **futureEffectiveDays**: Days until next deduction (>5 days passes)
- **paymentMethod**: Payment method (DEBIT_ORDER)
- **bankMandateStatus**: Bank mandate status (ACTIVE, INACTIVE, etc.)

### 4. Policy Information
- **policyNumber**: Policy number
- **productName**: Product name
- **policyStatus**: Current policy status
- **premiumCollectionDate**: Premium collection date
- **noDealings**: No dealings flag
- **primaryAdvisorCode**: Primary advisor code
- **salesCode**: Sales code for verification

### 5. Banking Detail and AVSR Result
- **bankingDetailInput**: Banking details provided in request
- **bankingDetailOfCMOS**: Banking details from CMOS system
- **checkResult**: Verification result

## Check Result Types

| Type | Description |
|------|-------------|
| CHECK_PASSED | All checks passed |
| CHECK_FAILED | One or more checks failed |
| CAN_NOT_CHECK | Unable to perform check |

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid request parameters",
  "code": "VALIDATION_ERROR",
  "timestamp": "2023-10-05T14:30:00Z",
  "details": [
    {
      "field": "salesCode",
      "message": "Sales code is required"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "error": "Invalid authentication",
  "code": "AUTH_ERROR",
  "timestamp": "2023-10-05T14:30:00Z"
}
```

### 404 Not Found

```json
{
  "error": "Policy not found",
  "code": "POLICY_NOT_FOUND",
  "timestamp": "2023-10-05T14:30:00Z"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error",
  "code": "SERVER_ERROR",
  "timestamp": "2023-10-05T14:30:00Z"
}
```

## Related APIs

- [Bank Detail Check API](./bank-detail-check-api.md)
- [Policy Basic Info API](./policy-basic-info-api.md)

## Workflow

```
1. Receive policy number and sales code
2. Retrieve policy basic information
3. Perform cover revival qualification check
4. Perform underwriting check
5. Perform simple revival check
6. Validate banking details and AVSR
7. Return comprehensive qualification summary
```

## Use Cases

### Policy Revival Qualification
Main use case for determining if a lapsed policy can be revived through partial STP process.

### Qualification Report Generation
Generates comprehensive qualification report for manual review if needed.

## Version History

- **v1.0.0** (2023-10-05): Initial draft release
  - Orchestration of partial STP qualification checks
  - Comprehensive qualification summary
  - Support for revival qualification reports

