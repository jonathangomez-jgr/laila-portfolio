# Subagent — Ambiguous Question

> Part of [Fan_Agent](../README.md). Control topic; no actions.

## Identity

| Field | Value |
|---|---|
| API name | `ambiguous_question_16jKY000000CeFO` |
| Local developer name | `ambiguous_question` |
| Master label | `Ambiguous Question` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Redirect conversation to relevant topics when user request is too ambiguous.

## Trigger

Selected by the planner when the user's message lacks enough signal to pick a substantive topic. The agent should ask a clarifying question that maps the user toward one of the supported topics: account, cases, orders, deliveries, reservations, premium experience, or general FAQ.

## Instructions

> **`instruction0_179KY0000000OtO`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

None. Conversational-only.

## See also

- [off_topic](off_topic.md) — when the message is unambiguous but out of scope.
- [topic_selector](topic_selector.md) — re-routes once the user clarifies.
