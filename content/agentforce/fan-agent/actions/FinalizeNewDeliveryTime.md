# Action — Finalize New Delivery Time

## Identity

| Field | Value |
|---|---|
| Master label | `Finalize New Delivery Time` |
| Local developer name | `FinalizeNewDeliveryTime` |
| Source template | `SvcCopilotTmpl__FinalizeNewDeliveryTime` |
| Invocation target | `SvcCopilotTmpl__FinalizeDeliveryTime` |
| Invocation target type | `flow` |
| Confirmation required | **`true`** |
| Show in progress indicator | `true` |

## Purpose

Updates the scheduled delivery time to the time slot selected by the customer.

## Used by

- [DeliveryIssues](../subagents/DeliveryIssues.md) — `FinalizeNewDeliveryTime_179KY0000000OtR`

## Prerequisites

- Customer must be verified through [Service Customer Verification](../subagents/ServiceCustomerVerification.md).
- A slot must have been displayed via [`GetDeliveryTimeSlots`](GetDeliveryTimeSlots.md) and selected by the user.
- Explicit user confirmation required.

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `contactRecord` | recordInfo (Contact) | No | No (planner-piped) | No | Contact record associated with the identified customer. |
| `dateTime` | dateTimeString | **Yes** | No (planner-piped from slot selection) | No | Order delivery time slot selected by the customer. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `outcomeMessage` | text | Yes | Yes | Result message confirming whether the delivery time was successfully finalized. |

## Dependencies

- Flow `SvcCopilotTmpl__FinalizeDeliveryTime` installed.
- Edit permission on the order/delivery scheduling record for the bot user.
