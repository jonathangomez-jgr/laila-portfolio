# Action — Get Order By Order Number

## Identity

| Field | Value |
|---|---|
| Master label | `Get Order By Order Number` |
| Local developer name | `GetOrderByOrderNumber` |
| Source template | `SvcCopilotTmpl__GetOrderByOrderNumber` |
| Invocation target | `SvcCopilotTmpl__GetOrderByOrderNumber` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |

## Purpose

Returns the order information associated with a given contact ID and order number.

## Used by

- [OrderInquiries](../subagents/OrderInquiries.md) — `GetOrderByOrderNumber_179KY0000000OtL`

## Prerequisites

- `contactRecord` typically comes from [`IdentifyCustomerByEmail`](IdentifyCustomerByEmail.md) or from the verified session.

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `contactRecord` | recordInfo (Contact) | **Yes** | No (planner-piped) | No | Contact record associated with the identified customer. |
| `orderNumber` | text | **Yes** | No (planner extracts) | No | Order number provided by the customer. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `orderDetails` | text | Yes | Yes | Information about the order number, status, and delivery date for the identified order. |

## Dependencies

- Flow `SvcCopilotTmpl__GetOrderByOrderNumber` installed.
- Read access on `Order` (or whatever order object the flow targets) for the bot user.
