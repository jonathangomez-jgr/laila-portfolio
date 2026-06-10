# Action — Get Cases For Verified Contact

## Identity

| Field | Value |
|---|---|
| Master label | `Get Cases For Verified Contact` |
| Local developer name | `GetCasesForVerifiedContact` |
| Source template | `SvcCopilotTmpl__GetCasesForVerifiedContact` |
| Invocation target | `SvcCopilotTmpl__GetCasesVrfyCtct` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |

## Purpose

Returns a list of cases related to a given Contact ID.

## Used by

- [CaseManagement](../subagents/CaseManagement.md) — `GetCasesForVerifiedContact_179KY0000000OtT`

## Prerequisites

- `verifiedContactID` must come from [Service Customer Verification](../subagents/ServiceCustomerVerification.md).

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `verifiedContactID` | text | **Yes** | No (planner-piped) | No | Verified contact record ID. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `caseList` | list of recordInfo (max 2000) | Yes | Yes | ID, Subject, Description, Status, CreatedDate, CaseNumber, LastModifiedDate, and ClosedDate for case records related to the specified contact. |

## Dependencies

- Flow `SvcCopilotTmpl__GetCasesVrfyCtct` installed.
- Read access on `Case` for the bot user.
