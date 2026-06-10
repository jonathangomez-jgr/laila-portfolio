# Action — Add Case Comment

## Identity

| Field | Value |
|---|---|
| Master label | `Add Case Comment` |
| Local developer name | `AddCaseComment` |
| Source template | `SvcCopilotTmpl__AddCaseComment` |
| Invocation target | `SvcCopilotTmpl__AddCaseComment` |
| Invocation target type | `flow` |
| Confirmation required | **`true`** |
| Show in progress indicator | `true` |

## Purpose

Let a customer add a comment to an existing case.

## Used by

- [CaseManagement](../subagents/CaseManagement.md) — `AddCaseComment_179KY0000000OtT`

## Prerequisites

- The case record must be loaded via [`GetCaseByVerifiedCaseNumber`](GetCaseByVerifiedCaseNumber.md) or [`GetCasesForVerifiedContact`](GetCasesForVerifiedContact.md), which both require [Service Customer Verification](../subagents/ServiceCustomerVerification.md).
- Explicit user confirmation required before posting the comment.

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `caseRecord` | recordInfo (Case) | **Yes** | No (planner-piped) | No | Case record to be updated with a comment. |
| `caseComment` | text | **Yes** | **Yes** | No | Text of the comment to add to the case. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `outcomeMessage` | text | Yes | Yes | Result message that confirms whether the comment was successfully added. |

## Dependencies

- Flow `SvcCopilotTmpl__AddCaseComment` installed.
- `CaseComment` create permission for the bot user.
