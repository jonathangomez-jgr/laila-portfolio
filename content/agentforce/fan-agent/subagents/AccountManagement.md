# Subagent — Account Management

> Part of [Fan_Agent](../README.md). Requires prior [Service Customer Verification](ServiceCustomerVerification.md) for the data-mutating actions.

## Identity

| Field | Value |
|---|---|
| API name | `AccountManagement_16jKY000000CeFO` |
| Local developer name | `AccountManagement` |
| Master label | `Account Management` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Handles customer inquiries about changing their contact information and resetting their password.

## Trigger

The planner enters this topic when the user asks to:
- Update their email, phone, or address.
- Reset their password.
- Ask a knowledge-base question scoped to account topics.

## Instructions

> **`instruction0_179KY0000000OtV`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

| Action | Confirmation | Mutates data | Doc |
|---|---|---|---|
| `AnswerQuestionsWithKnowledge_179KY0000000OtV` | No | No | [AnswerQuestionsWithKnowledge.md](../actions/AnswerQuestionsWithKnowledge.md) |
| `ResetSecurePassword_179KY0000000OtV` | **Yes** | Yes | [ResetSecurePassword.md](../actions/ResetSecurePassword.md) |
| `UpdateVerifiedContact_179KY0000000OtV` | **Yes** | Yes | [UpdateVerifiedContact.md](../actions/UpdateVerifiedContact.md) |

Both data-mutating actions take the `verifiedContactID` produced by [ServiceCustomerVerification](ServiceCustomerVerification.md) and have `isConfirmationRequired = true` — the planner must replay the change to the user before executing.
