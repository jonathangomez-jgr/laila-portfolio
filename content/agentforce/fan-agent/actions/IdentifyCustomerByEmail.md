# Action — Identify Customer By Email

> Reusable. Used by 3 of the 12 [Fan_Agent](../README.md) topics.

## Identity

| Field | Value |
|---|---|
| Master label | `Identify Customer By Email` |
| Local developer name | `IdentifyCustomerByEmail` |
| Source template | `SvcCopilotTmpl__IdentifyCustomerByEmail` |
| Invocation target | `SvcCopilotTmpl__IdentifyCustomer` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |

## Purpose

Identify a customer by their email address and return their contact record. Used to anchor a conversation to a specific contact for read-only flows that don't need full verification.

> ⚠️ This is **not** a verification — it is a lookup. Anything that mutates contact-bound data must go through [Service Customer Verification](../subagents/ServiceCustomerVerification.md) first.

## Used by

- [OrderInquiries](../subagents/OrderInquiries.md) — `IdentifyCustomerByEmail_179KY0000000OtL`
- [DeliveryIssues](../subagents/DeliveryIssues.md) — `IdentifyCustomerByEmail_179KY0000000OtR`
- [ReservationManagement](../subagents/ReservationManagement.md) — `IdentifyCustomerByEmail_179KY0000000OtN`

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `emailAddress` | text | **Yes** | Yes | **Yes** | Stores the email address provided by the customer. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `contactRecord` | recordInfo (Contact) | Yes | Yes | The Contact record associated with the identified customer. |

## Dependencies

- Flow `SvcCopilotTmpl__IdentifyCustomer` must be installed (Service Agent template package).
- Read access to `Contact` for the agent's bot user.

## Reuse notes

The output `contactRecord` (a record reference, not just an ID) is consumed directly by:
- [`GetOrdersByContact`](GetOrdersByContact.md)
- [`GetOrderByOrderNumber`](GetOrderByOrderNumber.md)
- [`FinalizeReservation`](FinalizeReservation.md)
- [`FinalizeNewDeliveryTime`](FinalizeNewDeliveryTime.md)
