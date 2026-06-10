# Subagent — General FAQ

> Part of [Fan_Agent](../README.md). Knowledge-only; never mutates data; verification not required.

## Identity

| Field | Value |
|---|---|
| API name | `GeneralFAQ_16jKY000000CeFO` |
| Local developer name | `GeneralFAQ` |
| Master label | `General FAQ` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

This topic is for helping answer customer's questions by searching through the knowledge articles and providing information from those articles. The questions can be about the company and its products, policies or business procedures.

## Trigger

The planner enters this topic when the user asks an open-ended company/product question that does not target their personal data and does not match a more specific topic (orders, cases, reservations, etc.).

## Instructions

> **`instruction0_179KY0000000OtP`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

| Action | Confirmation | Mutates data | Doc |
|---|---|---|---|
| `AnswerQuestionsWithKnowledge_179KY0000000OtP` | No | No | [AnswerQuestionsWithKnowledge.md](../actions/AnswerQuestionsWithKnowledge.md) |

The action streams a knowledge-base RAG response with citations.
