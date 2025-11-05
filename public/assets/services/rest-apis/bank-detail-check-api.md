---
id: api-bank-detail-check
name: Bank Detail Check API
description: Validates banking details and mandate status including CDV and AVSR checks for policy revival qualification in partial STP scenario
category: SERVICES_APIS
assetType: REST APIs
version: 1.0.0
status: DRAFT
owner: AutomationCoE Team
sourceSystem: Insurance API Suite
---

# Bank Detail Check API

## Overview

The Bank Detail Check API validates banking details and mandate status, including CDV (Card Data Verification) and AVSR (Address Verification Service Request) checks. This API is essential for the partial STP (Straight Through Processing) qualification check in the revival scenario.

## Purpose

This API is used to:
- Validate banking details against CMOS (Customer Master Operating System)
- Check mandate status (ACTIVE, INACTIVE, PENDING, EXPIRED, SUSPENDED)
- Perform CDV and AVSR verification
- Support the qualification report requirements for policy revival

## Endpoint

```
POST /{follow existing banking api base url}/bank-detail-check/bank-detail-check
```

**Base URL**: `https://localhost:8080/dpct`

## Authentication

All requests require Bearer token authentication:

```
Authorization: Bearer {JWT_TOKEN}
```

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
| clientIdentifier | string | Yes | Client identifier for getMandates/AVSR request |
| idNumber | string | Yes | ID number for verification |
| bankName | string | Yes | Bank name (e.g., National Bank) |
| bankBranchCode | string | Yes | Branch code (e.g., BRNCH123) |
| bankAccountNumber | string | Yes | Account number |
| bankAccountType | string | Yes | Account type (e.g., Savings) |
| accountHolder | string | Yes | Account holder name |
| deductDay | integer | Yes | Deduction day (1-31) |
| avsrCheckResult | boolean | No | AVSR check result (true if passed) |
| cdvCheckResult | boolean | No | CDV check result (true if passed) |

### Example Request

```json
{
  "clientIdentifier": "CLIENT123",
  "clientReference": "REF456",
  "transactionNumber": "TXN789",
  "idNumber": "ID1234567890123",
  "identityType": "RSA_ID",
  "contractReference": "CONTRACT456",
  "quotationInstance": "QINST001",
  "quotationNumber": "QUOTE123",
  "numberInvalid": false,
  "numberReplaced": false,
  "bankName": "National Bank",
  "bankBranchCode": "BRNCH123",
  "bankAccountNumber": "123456789",
  "bankAccountType": "Savings",
  "accountHolder": "John Doe",
  "deductDay": 15,
  "avsrCheckResult": true,
  "cdvCheckResult": true
}
```

## Response

### Success Response (200)

```json
{
  "bankName": "National Bank",
  "branchCode": "BRNCH123",
  "accountType": "Savings",
  "accountNumber": "****1234",
  "accountHolder": "John Doe",
  "deductDay": 15,
  "bankMandateStatus": "ACTIVE",
  "effectiveDate": "2025-10-29",
  "checkResult": {
    "resultType": "CHECK_PASSED",
    "failedOn": []
  }
}
```

### Check Result Types

- `CHECK_PASSED`: All validations passed
- `CHECK_FAILED`: One or more validations failed
- `CAN_NOT_CHECK`: Unable to perform check (service unavailable)

### Error Response

| Status | Description |
|--------|-------------|
| 400 | Bad Request - Missing or invalid parameters |
| 401 | Unauthorized - Invalid authentication |
| 404 | Resource not found |
| 500 | Internal server error |

## Mandate Status Values

| Status | Description |
|--------|-------------|
| ACTIVE | Mandate is active and valid |
| INACTIVE | Mandate is inactive |
| PENDING | Mandate is pending activation |
| EXPIRED | Mandate has expired |
| SUSPENDED | Mandate is suspended |

## Related APIs

- [Policy Basic Info API](./policy-basic-info-api.md)
- [Revival Qualification Summary API](./revival-qualification-api.md)

## Use Cases

### Revival Qualification Check
Used as part of the partial STP qualification check to validate banking details before policy revival.

### Mandate Verification
Verifies that the bank mandate is active and valid for debit order processing.

## Error Handling

The API returns detailed error information:

```json
{
  "error": "Invalid request parameters",
  "code": "VALIDATION_ERROR",
  "timestamp": "2023-10-05T14:30:00Z",
  "details": [
    {
      "field": "bankAccountNumber",
      "message": "Account number does not match bank records"
    }
  ]
}
```

## Version History

- **v1.0.0** (2023-10-05): Initial draft release
  - Bank detail validation
  - Mandate status check
  - CDV and AVSR verification support

