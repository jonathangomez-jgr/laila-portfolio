# Subagent — Delivery Issues

> Part of [Fan_Agent](../README.md). Mutation paths (cancel, reschedule) require [Service Customer Verification](ServiceCustomerVerification.md).

## Identity

| Field | Value |
|---|---|
| API name | `DeliveryIssues_16jKY000000CeFO` |
| Local developer name | `DeliveryIssues` |
| Master label | `Delivery Issues` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Addresses customer concerns related to delivery problems with an order, including late deliveries or scheduling changes.

## Trigger

The planner enters this topic when the user reports:
- A late or missed delivery.
- Wants to reschedule the delivery time.
- Wants to cancel an order due to a delivery problem.
- Asks a delivery-policy question.

## Instructions

> **`instruction0_179KY0000000OtR`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

| Action | Confirmation | Mutates data | Doc |
|---|---|---|---|
| `AnswerQuestionsWithKnowledge_179KY0000000OtR` | No | No | [AnswerQuestionsWithKnowledge.md](../actions/AnswerQuestionsWithKnowledge.md) |
| `IdentifyCustomerByEmail_179KY0000000OtR` | No | No | [IdentifyCustomerByEmail.md](../actions/IdentifyCustomerByEmail.md) |
| `GetOrdersByContact_179KY0000000OtR` | No | No | [GetOrdersByContact.md](../actions/GetOrdersByContact.md) |
| `GetDeliveryTimeSlots_179KY0000000OtR` | No | No | [GetDeliveryTimeSlots.md](../actions/GetDeliveryTimeSlots.md) |
| `FinalizeNewDeliveryTime_179KY0000000OtR` | **Yes** | Yes | [FinalizeNewDeliveryTime.md](../actions/FinalizeNewDeliveryTime.md) |
| `CancelOrder_179KY0000000OtR` | **Yes** | Yes | [CancelOrder.md](../actions/CancelOrder.md) |

## Typical reschedule flow

1. Identify the customer (`IdentifyCustomerByEmail`) or carry over a verified contact.
2. Pull their orders (`GetOrdersByContact`) and select the affected one with the user.
3. Pull available delivery slots for the desired date (`GetDeliveryTimeSlots`).
4. After explicit confirmation, commit with `FinalizeNewDeliveryTime`.
