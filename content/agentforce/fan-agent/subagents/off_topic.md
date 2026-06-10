# Subagent — Off Topic

> Part of [Fan_Agent](../README.md). Control topic; no actions.

## Identity

| Field | Value |
|---|---|
| API name | `off_topic_16jKY000000CeFO` |
| Local developer name | `off_topic` |
| Master label | `Off Topic` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Redirect conversation to relevant topics when user request goes off-topic.

## Trigger

Selected when the user's message is clearly outside of the agent's supported scope (anything unrelated to account, cases, orders, deliveries, reservations, premium experience, or general FAQ). The agent politely declines and lists what it *can* help with.

## Instructions

> **`instruction0_179KY0000000OtQ`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

None. Conversational-only.

## See also

- [ambiguous_question](ambiguous_question.md) — for vague but in-scope messages.
- [escalation](escalation.md) — when the user explicitly wants a human regardless of topic.
