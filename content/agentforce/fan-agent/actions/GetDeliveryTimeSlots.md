# Action — Get Delivery Time Slots

## Identity

| Field | Value |
|---|---|
| Master label | `Get Delivery Time Slots` |
| Local developer name | `GetDeliveryTimeSlots` |
| Source template | `SvcCopilotTmpl__GetDeliveryTimeSlots` |
| Invocation target | `SvcCopilotTmpl__GetDeliveryTimeSlots` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |

## Purpose

Returns a list of available time slots to schedule a delivery.

## Used by

- [DeliveryIssues](../subagents/DeliveryIssues.md) — `GetDeliveryTimeSlots_179KY0000000OtR`

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `date` | date | **Yes** | No (planner extracts) | No | Desired date identified by the customer to schedule a delivery. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `AvailableTimeSlots` | text | Yes | Yes | Time slots available on the date identified by the customer. |

## Downstream

The selected slot is consumed by [`FinalizeNewDeliveryTime`](FinalizeNewDeliveryTime.md).

## Dependencies

- Flow `SvcCopilotTmpl__GetDeliveryTimeSlots` installed.
- Whatever scheduling object/service backs the flow (Field Service / custom slot model).
