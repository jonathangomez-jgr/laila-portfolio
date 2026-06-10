# Action — Create Case with Enhanced Data

## Identity

| Field | Value |
|---|---|
| Master label | `Create Case with Enhanced Data` |
| Local developer name | `CreateCaseEnhancedData` |
| Source template | `SvcCopilotTmpl__CreateCaseEnhancedData` |
| Invocation target | `SvcCopilotTmpl__CreateCaseEnhancedData` |
| Invocation target type | `flow` |
| Confirmation required | **`true`** |
| Show in progress indicator | `true` |

## Purpose

Create a case for the customer that's transferred from the AI agent to a service rep. The case includes all information gathered from the customer, a summary of the progress made by the AI agent, a link to the conversation, and any attachments.

This is the **recommended pre-escalation step** when the agent cannot resolve the request on its own — it leaves the human a complete paper trail before [`escalation`](../subagents/escalation.md) hands off the conversation.

## Used by

- [CaseManagement](../subagents/CaseManagement.md) — `CreateCaseEnhancedData_179KY0000000OtT`

## Prerequisites

- Customer must be verified through [Service Customer Verification](../subagents/ServiceCustomerVerification.md). `verifiedCustomerID` is planner-piped.
- Explicit user confirmation required.

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `verifiedCustomerID` | text | **Yes** | No (planner-piped) | **Yes** | Contact ID associated with the newly created Case. |
| `messagingSessionID` | text | No | No | No | Session ID from the chat conversation (used to attach a transcript link to the case). |
| `caseSubject` | text | No | Yes | No | Subject of the case to create. |
| `caseDescription` | text | No | Yes | No | Details of the user issue to be used for the case. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `caseRecord` | recordInfo (Case) | Yes | Yes | The newly created Case record. |

## Dependencies

- Flow `SvcCopilotTmpl__CreateCaseEnhancedData` installed.
- `Case` create permission for the bot user; access to MessagingSession lookups for transcript linking.
