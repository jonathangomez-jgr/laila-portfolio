# Action — Get Reservation Time Slots

## Identity

| Field | Value |
|---|---|
| Master label | `Get Reservation Time Slots` |
| Local developer name | `GetReservationTimeSlots` |
| Source template | `SvcCopilotTmpl__GetReservationTimeSlots` |
| Invocation target | `SvcCopilotTmpl__GetAvailableTimeSlots` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |

## Purpose

Returns a list of available time slots for the date specified by the customer.

## Used by

- [ReservationManagement](../subagents/ReservationManagement.md) — `GetReservationTimeSlots_179KY0000000OtN`

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `date` | date | **Yes** | No (planner extracts) | No | Date identified by the customer to look up available time slots for. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `AvailableTimeSlots` | text | Yes | Yes | Time slots available on the date identified by the customer. |

## Downstream

The selected slot is consumed by [`FinalizeReservation`](FinalizeReservation.md).

## Dependencies

- Flow `SvcCopilotTmpl__GetAvailableTimeSlots` installed.
- Whatever scheduling object/service backs the flow (Field Service / custom slot model).
