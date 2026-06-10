# Action — Answer Questions with Knowledge

> Reusable. Used by 6 of the 12 [Fan_Agent](../README.md) topics.

## Identity

| Field | Value |
|---|---|
| Master label | `Answer Questions with Knowledge` |
| Local developer name | `AnswerQuestionsWithKnowledge` |
| Source template | `EmployeeCopilot__AnswerQuestionsWithKnowledge` |
| Invocation target | `streamKnowledgeSearch` |
| Invocation target type | `standardInvocableAction` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |
| Progress message | `Getting answers` |

## Purpose

Answers questions about company policies and procedures, troubleshooting steps, or product information.

Examples:
- *"What is your return policy?"*
- *"How do I fix an issue?"*
- *"What features does a product have?"*

The action streams a RAG response generated from Salesforce Knowledge articles and returns the summary plus citation sources.

## Used by

- [AccountManagement](../subagents/AccountManagement.md) — `AnswerQuestionsWithKnowledge_179KY0000000OtV`
- [CaseManagement](../subagents/CaseManagement.md) — `AnswerQuestionsWithKnowledge_179KY0000000OtT`
- [OrderInquiries](../subagents/OrderInquiries.md) — `AnswerQuestionsWithKnowledge_179KY0000000OtL`
- [DeliveryIssues](../subagents/DeliveryIssues.md) — `AnswerQuestionsWithKnowledge_179KY0000000OtR`
- [ReservationManagement](../subagents/ReservationManagement.md) — `AnswerQuestionsWithKnowledge_179KY0000000OtN`
- [GeneralFAQ](../subagents/GeneralFAQ.md) — `AnswerQuestionsWithKnowledge_179KY0000000OtP`

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `query` | text | **Yes** | Yes | No | A string created by generative AI to be used in the knowledge article search. |
| `citationsUrl` | text (const `""`) | No | Yes | No | The URL to use for citations for custom Agents. Always empty in this bundle. |
| `ragFeatureConfigId` | text (const `""`) | No | Yes | No | The RAG Feature ID to use for grounding this copilot action invocation. Always empty in this bundle. |
| `citationsEnabled` | boolean (const `false`) | No | Yes | No | Whether or not citations are enabled. Always `false` in this bundle. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `knowledgeSummary` | richText (max 100000) | Yes | Yes (`useHydratedPrompt = true`) | Rich-text summary of the information retrieved from the knowledge articles, with inline citations to those articles. |
| `citationSources` | `@apexClassType/AiCopilot__GenAiCitationInput` | No | Yes | Source links for the chunks in the hydrated prompt that's used by the planner service. |

## Dependencies

- Salesforce Knowledge enabled in the org.
- A knowledge index covering the topics the agent must answer (orders, deliveries, account, FAQ, etc.).

## Reuse notes

This action is the canonical "ask a knowledge-base question" tool — drop it into any new topic that needs RAG. Same input/output shape regardless of topic.
