---
id: api-policy-basic-info
name: Policy Basic Info API
description: Retrieves basic policy information including status, dates, and product details for policy revival qualification checks
category: SERVICES_APIS
assetType: REST APIs
version: 1.0.0
status: DRAFT
owner: Revival Team
sourceSystem: Insurance API Suite
---

# Policy Basic Info API

## Overview

The Policy Basic Info API retrieves basic information for a specific policy. This API is a core component of the revival qualification process, providing essential policy details needed for the partial STP (Straight Through Processing) qualification check.

## Purpose

This API is used to:
- Retrieve policy basic information (status, dates, product details)
- Support the qualification report requirements for policy revival
- Provide policy context for the revival decision process
- Enable advisor code verification

## Endpoint

```
POST /api/policies/{policyNumber}/basic-info
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
| policyNumber | string | Yes | Policy number identifier (e.g., POL123456789) |

## Required Headers

| Header | Type | Required | Example |
|--------|------|----------|---------|
| applicationID | string | Yes | APP001 |
| applicationName | string | Yes | PaymentPortal |
| applicationVersion | string | Yes | 1.2.0 |
| auth | string | Yes | Bearer xyz123abc456 |
| correlationID | string | Yes | corr-123e4567-e89b-12d3-a456-426614174000 |

## Request

### Example Request

```bash
curl -X POST "https://localhost:8080/dpct/api/policies/POL123456789/basic-info" \
  -H "applicationID: APP001" \
  -H "applicationName: PaymentPortal" \
  -H "applicationVersion: 1.2.0" \
  -H "auth: Bearer xyz123abc456" \
  -H "correlationID: corr-123e4567-e89b-12d3-a456-426614174000"
```

## Response

### Success Response (200)

```json
{
  "policyNumber": "POL123456789",
  "productName": "Life Insurance Premium",
  "policyStatus": "ACTIVE",
  "premiumCollectionDate": "2023-10-15",
  "noDealings": false,
  "advisorCode": "ADV001",
  "policyStartDate": "2020-01-01"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| policyNumber | string | Policy number identifier |
| productName | string | Product name (e.g., Life Insurance Premium) |
| policyStatus | string | Current policy status (ACTIVE, LAPSED, EXPIRED, etc.) |
| premiumCollectionDate | date | Date of premium collection (YYYY-MM-DD) |
| noDealings | boolean | Flag indicating no dealings status |
| advisorCode | string | Advisor code associated with the policy |
| policyStartDate | date | Policy start date (YYYY-MM-DD) |

## Policy Status Values

| Status | Description |
|--------|-------------|
| ACTIVE | Policy is currently active |
| LAPSED | Policy has lapsed (premium not paid) |
| EXPIRED | Policy has expired |
| CANCELLED | Policy has been cancelled |
| SUSPENDED | Policy is suspended |
| PENDING | Policy is pending activation |

## Error Responses

### 400 Bad Request

```json
{
  "error": "Invalid request parameters",
  "code": "VALIDATION_ERROR",
  "timestamp": "2023-10-05T14:30:00Z",
  "details": [
    {
      "field": "policyNumber",
      "message": "Policy number is required"
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
- [Revival Qualification Summary API](./revival-qualification-api.md)

## Use Cases

### Revival Qualification Check
Retrieves policy information as part of the partial STP qualification check for policy revival.

### Policy Status Verification
Verifies the current status of a policy before processing revival requests.

### Advisor Code Verification
Provides advisor code information for verification against sales code in revival requests.

## Response Headers

| Header | Description |
|--------|-------------|
| requestId | Unique request identifier (e.g., req-123e4567-e89b-12d3-a456-426614174000) |
| responseAt | Timestamp when response was generated (ISO 8601 format) |

## Version History

- **v1.0.0** (2023-10-05): Initial draft release
  - Basic policy information retrieval
  - Support for revival qualification checks

