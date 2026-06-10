# Action — Finalize Reservation

## Identity

| Field | Value |
|---|---|
| Master label | `Finalize Reservation` |
| Local developer name | `FinalizeReservation` |
| Source template | `SvcCopilotTmpl__FinalizeReservation` |
| Invocation target | `SvcCopilotTmpl__FinalizeReservation` |
| Invocation target type | `flow` |
| Confirmation required | **`true`** |
| Show in progress indicator | `true` |

## Purpose

Books and finalizes a reservation for the time designated by the customer.

## Used by

- [ReservationManagement](../subagents/ReservationManagement.md) — `FinalizeReservation_179KY0000000OtN`

## Prerequisites

- Customer must be verified through [Service Customer Verification](../subagents/ServiceCustomerVerification.md).
- A slot must have been displayed via [`GetReservationTimeSlots`](GetReservationTimeSlots.md) and selected by the user.
- Explicit user confirmation required.

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `contactRecord` | recordInfo (Contact) | No | No (planner-piped) | No | Contact record associated with the identified customer. |
| `dateTime` | dateTimeString | **Yes** | No (planner-piped from slot selection) | No | Date and time of the customer's reservation. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `outcomeMessage` | text | Yes | Yes | Result message confirming whether the reservation was successfully finalized. |

## Dependencies

- Flow `SvcCopilotTmpl__FinalizeReservation` installed.
- Whatever booking object/service backs the flow.
