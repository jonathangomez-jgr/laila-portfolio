# Subagent — Case Management

> Part of [Fan_Agent](../README.md). Every action consumes the `verifiedContactID` produced by [Service Customer Verification](ServiceCustomerVerification.md).

## Identity

| Field | Value |
|---|---|
| API name | `CaseManagement_16jKY000000CeFO` |
| Local developer name | `CaseManagement` |
| Master label | `Case Management` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Handles customer inquiries and actions related to support cases, including providing case information, updating existing cases, and creating new cases.

## Trigger

The planner enters this topic when the user wants to:
- See their open/closed cases.
- Pull up a specific case by case number.
- Add a comment to a case.
- Open a new case (typically as part of an escalation off-ramp).
- Ask knowledge questions about cases (return policy, etc.).

## Instructions

> **`instruction0_179KY0000000OtT`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

| Action | Confirmation | Mutates data | Doc |
|---|---|---|---|
| `AnswerQuestionsWithKnowledge_179KY0000000OtT` | No | No | [AnswerQuestionsWithKnowledge.md](../actions/AnswerQuestionsWithKnowledge.md) |
| `GetCasesForVerifiedContact_179KY0000000OtT` | No | No | [GetCasesForVerifiedContact.md](../actions/GetCasesForVerifiedContact.md) |
| `GetCaseByVerifiedCaseNumber_179KY0000000OtT` | No | No | [GetCaseByVerifiedCaseNumber.md](../actions/GetCaseByVerifiedCaseNumber.md) |
| `AddCaseComment_179KY0000000OtT` | **Yes** | Yes | [AddCaseComment.md](../actions/AddCaseComment.md) |
| `CreateCaseEnhancedData_179KY0000000OtT` | **Yes** | Yes | [CreateCaseEnhancedData.md](../actions/CreateCaseEnhancedData.md) |

`CreateCaseEnhancedData` is the recommended action when the agent has gathered enough context but cannot resolve the issue and needs to leave a paper trail before [escalating](escalation.md) — the resulting case includes a transcript link and any attachments.
