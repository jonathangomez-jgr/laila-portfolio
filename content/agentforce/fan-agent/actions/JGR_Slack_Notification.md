# Action — JGR Slack Notification

> Custom Laila action. Step 3 of the [Premium Experience](../subagents/Premium_Experience.md) flow.

## Identity

| Field | Value |
|---|---|
| Master label | `JGR Slack Notification` |
| Local developer name | `JGR_Slack_Notification` |
| Invocation target | `JGR_Send_Slack_Message_Premium_Experience` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `false` |

## Purpose

Send a message to the Premium Experience Slack channel to notify the fan transaction.

## Used by

- [Premium_Experience](../subagents/Premium_Experience.md) — `JGR_Slack_Notification_179KY0000000OtK`

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `inputExperienceAttendeeId` | text | **Yes** | No (planner-piped from `JGR_Experience_Validation.outputAttendeeId`) | No | Premium Experience Attendee record Id. |
| `inputPremiumExperienceId` | text | **Yes** | No (planner-piped from `JGR_Experience_Validation.outputPremiumExperienceId`) | No | Premium Experience record Id. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `outputMessage` | text | Yes | Yes | Result message from the action (e.g. "Slack notification posted"). |

## Dependencies

- Flow `JGR_Send_Slack_Message_Premium_Experience` deployed.
- Slack integration: a configured Slack named credential / Slack app with permission to post to the Premium Experience channel.
- Read access on Premium Experience and Attendee records the flow reads to compose the message.

## Reuse notes

This is the only action in the agent that touches an external system (Slack). When porting, configure the Slack named credential / app **before** deploying the flow, otherwise the flow will compile but fail at runtime. The Slack channel ID and message template typically live inside the flow — review and replace per environment.
