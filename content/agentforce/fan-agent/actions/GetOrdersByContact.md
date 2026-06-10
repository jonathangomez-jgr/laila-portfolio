# Action — Get Orders By Contact

> Reusable. Used by 2 of the 12 [Fan_Agent](../README.md) topics.

## Identity

| Field | Value |
|---|---|
| Master label | `Get Orders By Contact` |
| Local developer name | `GetOrdersByContact` |
| Source template | `SvcCopilotTmpl__GetOrdersByContact` |
| Invocation target | `SvcCopilotTmpl__GetOrdersByContact` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |

## Purpose

Returns a list of orders associated with a given contact record.

## Used by

- [OrderInquiries](../subagents/OrderInquiries.md) — `GetOrdersByContact_179KY0000000OtL`
- [DeliveryIssues](../subagents/DeliveryIssues.md) — `GetOrdersByContact_179KY0000000OtR`

## Prerequisites

- `contactRecord` typically comes from [`IdentifyCustomerByEmail`](IdentifyCustomerByEmail.md) or from the verified session.

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `contactRecord` | recordInfo (Contact) | **Yes** | No (planner-piped) | No | Contact record associated with the identified customer. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `ContactOrders` | text | Yes | Yes | List of orders associated with the contact record (rendered as text — the flow formats it into something the agent can read aloud). |

## Dependencies

- Flow `SvcCopilotTmpl__GetOrdersByContact` installed.
- Read access on `Order` for the bot user.
