# Subagent — Escalation

> Part of [Fan_Agent](../README.md). Hand-off topic; no actions inside the topic — escalation is wired at the planner-surface level.

## Identity

| Field | Value |
|---|---|
| API name | `escalation_16jKY000000CeFO` |
| Local developer name | `escalation` |
| Master label | `Escalation` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` (the action is performed by the surface route, not the topic) |

## Purpose

Handles requests from users who want to transfer or escalate their conversation to a live human agent.

## Trigger

The planner enters this topic when the user explicitly asks to talk to a human, agent, supervisor, or representative — or when an agent-led recovery (e.g. multiple failed verifications) decides to hand off.

## Instructions

> **`instruction0_179KY0000000OtS`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

None at the topic level. The hand-off is performed by the bot's **outbound route** (configured in `<plannerSurfaces>` of the planner bundle):

```xml
<outboundRouteConfigs>
    <escalationMessage>One moment, I'm transferring our conversation to get you more help.</escalationMessage>
    <outboundRouteName>JGR_Route_to_ASA_Laila</outboundRouteName>
    <outboundRouteType>OmniChannelFlow</outboundRouteType>
</outboundRouteConfigs>
```

The OmniChannel flow `JGR_Route_to_ASA_Laila` is invoked with the user-facing escalation message and routes the conversation to the live human queue.

## Recommended pre-escalation step

When the agent has gathered useful context, call [`CreateCaseEnhancedData`](../actions/CreateCaseEnhancedData.md) from [CaseManagement](CaseManagement.md) before triggering the escalation — this leaves the human a case with the conversation summary, transcript link, and any attachments.

## External dependencies

- OmniChannel flow `JGR_Route_to_ASA_Laila` — must exist in the destination org.
