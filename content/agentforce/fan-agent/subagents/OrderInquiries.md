# Subagent — Order Inquiries

> Part of [Fan_Agent](../README.md). Read paths use `IdentifyCustomerByEmail`; mutation paths require [Service Customer Verification](ServiceCustomerVerification.md).

## Identity

| Field | Value |
|---|---|
| API name | `OrderInquiries_16jKY000000CeFO` |
| Local developer name | `OrderInquiries` |
| Master label | `Order Inquiries` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Handles questions related to a user's order, order status, or order updates.

## Trigger

The planner enters this topic when the user asks about:
- "Where is my order?" / "What's the status of order #..."
- "Show me my recent orders."
- "Cancel my order."
- A general policy question scoped to orders.

## Instructions

> **`instruction0_179KY0000000OtL`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

| Action | Confirmation | Mutates data | Doc |
|---|---|---|---|
| `AnswerQuestionsWithKnowledge_179KY0000000OtL` | No | No | [AnswerQuestionsWithKnowledge.md](../actions/AnswerQuestionsWithKnowledge.md) |
| `IdentifyCustomerByEmail_179KY0000000OtL` | No | No | [IdentifyCustomerByEmail.md](../actions/IdentifyCustomerByEmail.md) |
| `GetOrdersByContact_179KY0000000OtL` | No | No | [GetOrdersByContact.md](../actions/GetOrdersByContact.md) |
| `GetOrderByOrderNumber_179KY0000000OtL` | No | No | [GetOrderByOrderNumber.md](../actions/GetOrderByOrderNumber.md) |
| `CancelOrder_179KY0000000OtL` | **Yes** | Yes | [CancelOrder.md](../actions/CancelOrder.md) |

## Typical flow

1. `IdentifyCustomerByEmail` (or reuse `verifiedContactID` from a prior verification step).
2. `GetOrdersByContact` (list) **or** `GetOrderByOrderNumber` (single order by number).
3. If the user wants to cancel, route through [ServiceCustomerVerification](ServiceCustomerVerification.md), then `CancelOrder` with explicit confirmation.
