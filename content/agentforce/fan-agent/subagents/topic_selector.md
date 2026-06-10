# Subagent — Topic Selector

> Part of [Fan_Agent](../README.md). This is a **routing-only** topic; it has no actions.

## Identity

| Field | Value |
|---|---|
| API name | `topic_selector_16jKY000000CeFO` |
| Local developer name | `topic_selector` |
| Master label | `Topic Selector` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Welcome the user and determine the appropriate topic based on user input.

## Trigger

The planner enters this topic at the start of every conversation and whenever the user's intent is unclear enough to require explicit topic re-selection. Implicit "front-door" — the planner uses topic descriptions across all sibling topics to dispatch.

## Instructions

> **`instruction0_179KY0000000OtM`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

(Same boilerplate instruction is applied to every topic in the bundle.)

## Inputs / context

Reads the `Welcome_Message` context variable (mapped from `MessagingSession.Welcome_Message__c`) to render the opening greeting on session start.

## Actions

None. Routing-only topic.

## Outgoing transitions

Routes to one of:
- [ServiceCustomerVerification](ServiceCustomerVerification.md) — when the next intent requires verified PII access.
- [AccountManagement](AccountManagement.md) / [CaseManagement](CaseManagement.md) / [OrderInquiries](OrderInquiries.md) / [DeliveryIssues](DeliveryIssues.md) / [ReservationManagement](ReservationManagement.md) / [GeneralFAQ](GeneralFAQ.md) / [Premium_Experience](Premium_Experience.md) — by intent classification.
- [ambiguous_question](ambiguous_question.md) — when the request is too vague to classify.
- [off_topic](off_topic.md) — when the request is outside the agent's scope.
- [escalation](escalation.md) — when the user explicitly asks for a human.
