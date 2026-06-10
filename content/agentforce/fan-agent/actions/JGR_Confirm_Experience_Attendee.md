# Action — JGR Confirm Experience Attendee

> Custom Laila action. Step 2 of the [Premium Experience](../subagents/Premium_Experience.md) flow.

## Identity

| Field | Value |
|---|---|
| Master label | `JGR Confirm Experience Attendee` |
| Local developer name | `JGR_Confirm_Experience_Attendee` |
| Invocation target | `JGR_Confirm_Premium_Experience_Attendee` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `false` |

## Purpose

Confirm that the fan has confirmed to redeem the offer to get better seats. The flow updates the Premium Experience Attendee record to a confirmed state and returns a transaction confirmation code.

> **Important**: this action does **not** have `isConfirmationRequired = true` at the planner level. The flow itself is the source of truth for any business validation (idempotency on duplicate confirms, point-balance debit, attendee-state transition guards). When porting, audit the flow to keep that contract intact.

## Used by

- [Premium_Experience](../subagents/Premium_Experience.md) — `JGR_Confirm_Experience_Attendee_179KY0000000OtK`

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `inputAttendeeId` | text | **Yes** | No (planner-piped from `JGR_Experience_Validation.outputAttendeeId`) | No | Premium Experience Attendee record Id. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `OutputConfirmationCode` | text | Yes | Yes | Transaction confirmation code shown to the fan. |

## Dependencies

- Flow `JGR_Confirm_Premium_Experience_Attendee` deployed.
- Edit permission on the Attendee object (or whatever record the flow updates).

## Sequence

```
JGR_Experience_Validation  ──outputAttendeeId──▶  JGR_Confirm_Experience_Attendee  ──OutputConfirmationCode──▶  user
                           ──outputAttendeeId────────────┐
                           ──outputPremiumExperienceId──▶  JGR_Slack_Notification
```
