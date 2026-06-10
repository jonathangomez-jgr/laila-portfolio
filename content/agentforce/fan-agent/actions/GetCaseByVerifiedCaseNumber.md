# Action — Get Case By Verified Case Number

## Identity

| Field | Value |
|---|---|
| Master label | `Get Case By Verified Case Number` |
| Local developer name | `GetCaseByVerifiedCaseNumber` |
| Source template | `SvcCopilotTmpl__GetCaseByVerifiedCaseNumber` |
| Invocation target | `SvcCopilotTmpl__GetCaseByVrfyCaseNbr` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |

## Purpose

Returns a case associated with a given contact ID and case number.

## Used by

- [CaseManagement](../subagents/CaseManagement.md) — `GetCaseByVerifiedCaseNumber_179KY0000000OtT`

## Prerequisites

- `verifiedContactID` must come from [Service Customer Verification](../subagents/ServiceCustomerVerification.md).

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `verifiedContactID` | text | **Yes** | No (planner-piped) | No | Verified contact record ID. |
| `caseNumber` | text | **Yes** | No (planner extracts from conversation) | No | Case number provided by the customer. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `caseRecord` | recordInfo | Yes | Yes | Case record matching the contact + case number combination. |

## Dependencies

- Flow `SvcCopilotTmpl__GetCaseByVrfyCaseNbr` installed.
- Read access on `Case` for the bot user, sharing scoped to the contact's cases.
