# Action — JGR Experience Validation

> Custom Laila action. Step 1 of the [Premium Experience](../subagents/Premium_Experience.md) flow.

## Identity

| Field | Value |
|---|---|
| Master label | `JGR Experience Validation` |
| Local developer name | `JGR_Experience_Validation` |
| Invocation target | `JGR_Experience_validation` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `false` |

## Purpose

Validate if there still are seats available and if the fan has enough points to redeem.

The flow uses the active **MessagingSession ID** to find the fan's current Premium Experience attendance record and apply two checks:
1. Seats are still available on the target Premium Experience.
2. The attendee has enough points to redeem.

## Used by

- [Premium_Experience](../subagents/Premium_Experience.md) — `JGR_Experience_Validation_179KY0000000OtK`

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `inputMessagingSessionID` | text | **Yes** | No (planner-piped from `RoutableId` context variable) | No | Messaging Session Id. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `outputAttendeeId` | text | No | Yes | Premium Experience Attendee record Id — fed into [`JGR_Confirm_Experience_Attendee`](JGR_Confirm_Experience_Attendee.md) and [`JGR_Slack_Notification`](JGR_Slack_Notification.md). |
| `outputPremiumExperienceId` | text | No | Yes | Premium Experience record Id — fed into [`JGR_Slack_Notification`](JGR_Slack_Notification.md). |
| `outputMessage` | text | Yes | Yes | Result message from the action (e.g. "You have enough points and X seats remain"). |

## Dependencies

- Flow `JGR_Experience_validation` deployed.
- Custom objects backing the flow: `Premium_Experience__c` and `Premium_Experience_Attendee__c` (or whatever the flow queries — verify by reading the flow on port).
- Read access on those objects for the bot user.

## Reuse notes

The contract is "given a Messaging Session, find the right attendee + experience and validate". When porting to another org you must:
1. Recreate the data model — Premium Experience and its Attendees, plus a link from MessagingSession to the active attendee row.
2. Re-deploy the flow `JGR_Experience_validation`.
3. Bind the bot's `RoutableId` context variable (already part of the standard bot template).
