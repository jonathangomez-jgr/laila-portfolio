# Action — Cancel Order

> Reusable. Used by 2 of the 12 [Fan_Agent](../README.md) topics.

## Identity

| Field | Value |
|---|---|
| Master label | `Cancel Order` |
| Local developer name | `CancelOrder` |
| Source template | `SvcCopilotTmpl__CancelOrder` |
| Invocation target | `SvcCopilotTmpl__CancelOrder` |
| Invocation target type | `flow` |
| Confirmation required | **`true`** |
| Show in progress indicator | `true` |

## Purpose

Cancels a customer's order.

## Used by

- [OrderInquiries](../subagents/OrderInquiries.md) — `CancelOrder_179KY0000000OtL`
- [DeliveryIssues](../subagents/DeliveryIssues.md) — `CancelOrder_179KY0000000OtR`

## Prerequisites

- Customer must be verified through [Service Customer Verification](../subagents/ServiceCustomerVerification.md) before this action runs.
- Explicit user confirmation required.

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `orderNumber` | text | **Yes** | No (planner extracts from conversation) | No | Order number provided by the customer to cancel. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `outcomeMessage` | text | Yes | Yes | Message that lets the customer know whether the order was successfully cancelled. |

## Dependencies

- Flow `SvcCopilotTmpl__CancelOrder` installed.
- Edit permission on `Order` (status field at minimum) for the bot user.
