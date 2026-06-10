# Subagent — Premium Experience

> Part of [Fan_Agent](../README.md). **The Laila-specific differentiator** — lets a fan redeem points for better seats and notifies operations on Slack. All three actions are custom (not from the Service Agent template).

## Identity

| Field | Value |
|---|---|
| API name | `Premium_Experience_16jKY000000CeFO` |
| Local developer name | `Premium_Experience` |
| Master label | `Premium Experience` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Validate Premium Experience, confirm Attendee and solve inquiries.

## Trigger

The planner enters this topic when the fan asks to:
- "Upgrade my seats."
- "Redeem points for the premium experience."
- "Confirm my premium experience seat."

The topic relies on the active **MessagingSession ID** (the `RoutableId` context variable) to resolve which Premium Experience the fan is currently entitled to.

## Instructions

> **`instruction0_179KY0000000OtK`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions (executed in this order)

| Order | Action | Confirmation | Mutates data | Doc |
|---|---|---|---|---|
| 1 | `JGR_Experience_Validation_179KY0000000OtK` | No | No (read) | [JGR_Experience_Validation.md](../actions/JGR_Experience_Validation.md) |
| 2 | `JGR_Confirm_Experience_Attendee_179KY0000000OtK` | No | Yes | [JGR_Confirm_Experience_Attendee.md](../actions/JGR_Confirm_Experience_Attendee.md) |
| 3 | `JGR_Slack_Notification_179KY0000000OtK` | No | Yes (sends Slack message) | [JGR_Slack_Notification.md](../actions/JGR_Slack_Notification.md) |

## End-to-end flow

1. **Validate** — `JGR_Experience_Validation` is called with the current `MessagingSession.Id` (`RoutableId`). The flow checks (a) seats still available and (b) the fan has enough points; it returns the matching `outputAttendeeId`, `outputPremiumExperienceId`, and a user-facing `outputMessage`.
2. **Confirm attendee** — `JGR_Confirm_Experience_Attendee` is called with `outputAttendeeId` and returns an `OutputConfirmationCode` to display to the fan.
3. **Notify ops** — `JGR_Slack_Notification` is called with both `outputAttendeeId` and `outputPremiumExperienceId` to post a notification to the Premium Experience Slack channel.

> Note: none of the three custom actions has `isConfirmationRequired = true`. The flows themselves are responsible for any business validation (seat count, points balance, idempotency on duplicate confirms). When porting, audit the flows to keep that contract.

## External dependencies

- Flow `JGR_Experience_validation` — reads Premium Experience + Attendee data based on Messaging Session.
- Flow `JGR_Confirm_Premium_Experience_Attendee` — updates the attendee record to a confirmed state.
- Flow `JGR_Send_Slack_Message_Premium_Experience` — sends a Slack message via a Slack named credential / connected app.
- Custom objects expected: `Premium_Experience__c` and `Premium_Experience_Attendee__c` (or whatever objects the flows query — verify on port).
