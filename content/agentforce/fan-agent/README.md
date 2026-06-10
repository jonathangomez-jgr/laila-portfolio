# Fan Agent (Nacho Fan Agent)

> Reusable documentation for the **`Fan_Agent`** Agentforce Service Agent deployed in the Laila org.
>
> Source of truth: `force-app/main/default/bots/Fan_Agent/` and `force-app/main/default/genAiPlannerBundles/Fan_Agent_v4/`.

## Overview

| Field | Value |
|---|---|
| Bot API name | `Fan_Agent` |
| Bot label | `Nacho Fan Agent` |
| Active version | `v4` (planner bundle `Fan_Agent_v4`) |
| Bot type | `EinsteinServiceAgent` (`type = ExternalCopilot`) |
| Agent DSL | Enabled |
| Bot user | `laila-asa@laila.demo` |
| Planner type | `Atlas__ConcurrentMultiAgentOrchestration` |
| Surface | Messaging (`SurfaceAction__Messaging`) |
| Adaptive responses | Enabled |
| Call recording | Disabled |
| Rich content | Enabled |
| Private conversation logging | Disabled |
| Session timeout | `0` (no idle expiry — driven by channel) |
| Default language | `en_US` |

**Description**: Deliver personalized customer interactions with an autonomous AI agent. Agentforce Service Agent intelligently supports your customers with common inquiries and escalates complex issues. The Laila instance is themed around fans of an event — its differentiator from a stock Service Agent is the **Premium Experience** topic, which lets a fan redeem points for better seats and notifies the operations team via Slack.

## Architecture

The agent follows the standard Concurrent Multi-Agent Orchestration ("Atlas") pattern: the planner reads the user's turn, picks one or more topics (subagents), and each topic exposes a small set of actions (`localActions`) that the planner can call. Topics with `pluginType = Topic` are functional subagents. Three control topics (`topic_selector`, `ambiguous_question`, `off_topic`) and one handoff topic (`escalation`) shape the routing.

```
                                 ┌─────────────────────────────┐
                                 │   topic_selector (router)   │
                                 └──────────────┬──────────────┘
                                                │
   ┌────────────────────┬───────────────────────┼───────────────────────┬─────────────────────┐
   ▼                    ▼                       ▼                       ▼                     ▼
ServiceCustomer    AccountMgmt            CaseMgmt              OrderInquiries          GeneralFAQ
Verification       (3 actions)            (5 actions)           (5 actions)             (1 action)
(2 actions)
   │
   ▼
DeliveryIssues  ReservationMgmt  Premium_Experience   ambiguous_question  off_topic  escalation
(6 actions)     (4 actions)      (3 actions, custom)  (control)            (control)  (handoff)
```

> Verification gate: `ServiceCustomerVerification` MUST run before any topic that returns or mutates customer-bound data (orders, deliveries, reservations, password reset, contact updates, cases).

## Topics / Subagents

Each subagent has its own document under `subagents/` describing purpose, trigger conditions, instructions, and the actions it exposes.

| # | Topic API name | Label | Plugin type | Actions | Doc |
|---|---|---|---|---|---|
| 1 | `topic_selector_16jKY000000CeFO` | Topic Selector | Topic | 0 (router) | [topic_selector.md](subagents/topic_selector.md) |
| 2 | `ServiceCustomerVerification_16jKY000000CeFO` | Service Customer Verification | Topic | 2 | [ServiceCustomerVerification.md](subagents/ServiceCustomerVerification.md) |
| 3 | `AccountManagement_16jKY000000CeFO` | Account Management | Topic | 3 | [AccountManagement.md](subagents/AccountManagement.md) |
| 4 | `CaseManagement_16jKY000000CeFO` | Case Management | Topic | 5 | [CaseManagement.md](subagents/CaseManagement.md) |
| 5 | `OrderInquiries_16jKY000000CeFO` | Order Inquiries | Topic | 5 | [OrderInquiries.md](subagents/OrderInquiries.md) |
| 6 | `DeliveryIssues_16jKY000000CeFO` | Delivery Issues | Topic | 6 | [DeliveryIssues.md](subagents/DeliveryIssues.md) |
| 7 | `ReservationManagement_16jKY000000CeFO` | Reservation Management | Topic | 4 | [ReservationManagement.md](subagents/ReservationManagement.md) |
| 8 | `GeneralFAQ_16jKY000000CeFO` | General FAQ | Topic | 1 | [GeneralFAQ.md](subagents/GeneralFAQ.md) |
| 9 | `Premium_Experience_16jKY000000CeFO` | Premium Experience | Topic | 3 (custom) | [Premium_Experience.md](subagents/Premium_Experience.md) |
| 10 | `ambiguous_question_16jKY000000CeFO` | Ambiguous Question | Topic | 0 (control) | [ambiguous_question.md](subagents/ambiguous_question.md) |
| 11 | `off_topic_16jKY000000CeFO` | Off Topic | Topic | 0 (control) | [off_topic.md](subagents/off_topic.md) |
| 12 | `escalation_16jKY000000CeFO` | Escalation | Topic | 0 (handoff) | [escalation.md](subagents/escalation.md) |

> All topic API names carry the parent planner bundle ID suffix `_16jKY000000CeFO`. When porting to another org, the suffix is regenerated — only the `localDeveloperName` (`AccountManagement`, `CaseManagement`, etc.) is stable.

## Actions

20 unique actions (a few — `AnswerQuestionsWithKnowledge`, `IdentifyCustomerByEmail`, `CancelOrder`, `GetOrdersByContact` — are duplicated across topics with the same implementation but a topic-scoped suffix). Each action has its own document under `actions/`.

### Standard actions (Service Agent template)

| Action | Source / template | Invocation | Doc |
|---|---|---|---|
| Answer Questions with Knowledge | `EmployeeCopilot__AnswerQuestionsWithKnowledge` | `streamKnowledgeSearch` (standardInvocableAction) | [AnswerQuestionsWithKnowledge.md](actions/AnswerQuestionsWithKnowledge.md) |
| Identify Customer By Email | `SvcCopilotTmpl__IdentifyCustomerByEmail` | flow `SvcCopilotTmpl__IdentifyCustomer` | [IdentifyCustomerByEmail.md](actions/IdentifyCustomerByEmail.md) |
| Send Email Verification Code | `SvcCopilotTmpl__SendEmailVerificationCode` | flow `SvcCopilotTmpl__SendVerificationCode` | [SendEmailVerificationCode.md](actions/SendEmailVerificationCode.md) |
| Verify Customer | `SvcCopilotTmpl__VerifyCustomer` | flow `SvcCopilotTmpl__VerifyCode` | [VerifyCustomer.md](actions/VerifyCustomer.md) |
| Reset Secure Password | `SvcCopilotTmpl__ResetSecurePassword` | flow `SvcCopilotTmpl__ResetScrPassword` | [ResetSecurePassword.md](actions/ResetSecurePassword.md) |
| Update Verified Contact | `SvcCopilotTmpl__UpdateVerifiedContact` | flow `SvcCopilotTmpl__UpdateVrfyCtct` | [UpdateVerifiedContact.md](actions/UpdateVerifiedContact.md) |
| Add Case Comment | `SvcCopilotTmpl__AddCaseComment` | flow `SvcCopilotTmpl__AddCaseComment` | [AddCaseComment.md](actions/AddCaseComment.md) |
| Create Case with Enhanced Data | `SvcCopilotTmpl__CreateCaseEnhancedData` | flow `SvcCopilotTmpl__CreateCaseEnhancedData` | [CreateCaseEnhancedData.md](actions/CreateCaseEnhancedData.md) |
| Get Case By Verified Case Number | `SvcCopilotTmpl__GetCaseByVerifiedCaseNumber` | flow `SvcCopilotTmpl__GetCaseByVrfyCaseNbr` | [GetCaseByVerifiedCaseNumber.md](actions/GetCaseByVerifiedCaseNumber.md) |
| Get Cases For Verified Contact | `SvcCopilotTmpl__GetCasesForVerifiedContact` | flow `SvcCopilotTmpl__GetCasesVrfyCtct` | [GetCasesForVerifiedContact.md](actions/GetCasesForVerifiedContact.md) |
| Get Order By Order Number | `SvcCopilotTmpl__GetOrderByOrderNumber` | flow `SvcCopilotTmpl__GetOrderByOrderNumber` | [GetOrderByOrderNumber.md](actions/GetOrderByOrderNumber.md) |
| Get Orders By Contact | `SvcCopilotTmpl__GetOrdersByContact` | flow `SvcCopilotTmpl__GetOrdersByContact` | [GetOrdersByContact.md](actions/GetOrdersByContact.md) |
| Cancel Order | `SvcCopilotTmpl__CancelOrder` | flow `SvcCopilotTmpl__CancelOrder` | [CancelOrder.md](actions/CancelOrder.md) |
| Get Delivery Time Slots | `SvcCopilotTmpl__GetDeliveryTimeSlots` | flow `SvcCopilotTmpl__GetDeliveryTimeSlots` | [GetDeliveryTimeSlots.md](actions/GetDeliveryTimeSlots.md) |
| Finalize New Delivery Time | `SvcCopilotTmpl__FinalizeNewDeliveryTime` | flow `SvcCopilotTmpl__FinalizeDeliveryTime` | [FinalizeNewDeliveryTime.md](actions/FinalizeNewDeliveryTime.md) |
| Get Reservation Time Slots | `SvcCopilotTmpl__GetReservationTimeSlots` | flow `SvcCopilotTmpl__GetAvailableTimeSlots` | [GetReservationTimeSlots.md](actions/GetReservationTimeSlots.md) |
| Finalize Reservation | `SvcCopilotTmpl__FinalizeReservation` | flow `SvcCopilotTmpl__FinalizeReservation` | [FinalizeReservation.md](actions/FinalizeReservation.md) |

### Custom actions (Premium Experience — Laila-specific)

| Action | Invocation | Doc |
|---|---|---|
| JGR Experience Validation | flow `JGR_Experience_validation` | [JGR_Experience_Validation.md](actions/JGR_Experience_Validation.md) |
| JGR Confirm Experience Attendee | flow `JGR_Confirm_Premium_Experience_Attendee` | [JGR_Confirm_Experience_Attendee.md](actions/JGR_Confirm_Experience_Attendee.md) |
| JGR Slack Notification | flow `JGR_Send_Slack_Message_Premium_Experience` | [JGR_Slack_Notification.md](actions/JGR_Slack_Notification.md) |

## Context variables

The bot exposes 5 messaging context variables. None are injected into the prompt (`includeInPrompt = false`); they are populated by the channel and consumed by the actions.

| Developer name | Label | Data type | Source SObject.Field | Use |
|---|---|---|---|---|
| `ContactId` | Contact Id | Text | `MessagingEndUser.ContactId` | Contact ID of the verified customer; consumed by every `SvcCopilotTmpl__*` flow that takes `verifiedContactID`. |
| `EndUserId` | End User Id | Text | `MessagingSession.MessagingEndUserId` | The MessagingEndUser record ID. |
| `EndUserLanguage` | End User Language | Text | `MessagingSession.EndUserLanguage` | Locale for response generation. |
| `RoutableId` | Routable Id | Text | `MessagingSession.Id` | The MessagingSession ID. **Required by `JGR_Experience_Validation`** to look up the active Premium Experience attendee context. |
| `Welcome_Message` | Welcome Message | Text | `MessagingSession.Welcome_Message__c` | Custom welcome message rendered by `topic_selector`. |

All five mappings cover seven channel `messageType`s: `Text`, `EmbeddedMessaging`, `AppleBusinessChat`, `Custom`, `Line`, `WhatsApp`, `Facebook`.

## Routing & escalation

```xml
<plannerSurfaces>
    <surface>SurfaceAction__Messaging</surface>
    <surfaceType>Messaging</surfaceType>
    <adaptiveResponseAllowed>true</adaptiveResponseAllowed>
    <outboundRouteConfigs>
        <escalationMessage>One moment, I'm transferring our conversation to get you more help.</escalationMessage>
        <outboundRouteName>JGR_Route_to_ASA_Laila</outboundRouteName>
        <outboundRouteType>OmniChannelFlow</outboundRouteType>
    </outboundRouteConfigs>
</plannerSurfaces>
```

Hand-off goes through the OmniChannel flow `JGR_Route_to_ASA_Laila` with the user-facing message above. Triggered exclusively from the [`escalation`](subagents/escalation.md) topic.

## Reuse / port-to-another-org checklist

When cloning this agent into another org:

1. **Retrieve metadata**:
   ```
   sf project retrieve start \
     --metadata "Bot:Fan_Agent" \
     --metadata "GenAiPlannerBundle:Fan_Agent_v4" \
     --target-org <alias>
   ```
2. **Replace the planner-bundle ID suffix** (`_16jKY000000CeFO`) — Salesforce regenerates this on deploy; do not hard-code it in code.
3. **Provision dependencies**:
   - Service Agent permission set licenses.
   - The 3 extra permission sets required for the bot user (per the `EinsteinServiceAgent` deployment pattern; see [feedback memory](../../../.claude/projects/-Users-jonathan-gomez-org-laila/memory/feedback_agentforce_service_agent.md)).
   - `MessagingSession.Welcome_Message__c` custom field.
   - All `SvcCopilotTmpl__*` flows (Service Agent template — installed as a managed package).
   - The 3 custom Premium Experience flows: `JGR_Experience_validation`, `JGR_Confirm_Premium_Experience_Attendee`, `JGR_Send_Slack_Message_Premium_Experience`.
   - The OmniChannel routing flow `JGR_Route_to_ASA_Laila`.
   - Slack named credential / app used by the Slack notification flow.
4. **Update bot user**: change `<botUser>laila-asa@laila.demo</botUser>` to the destination org's bot user.
5. **Channel setup**: configure at least one Messaging channel; the agent expects 7 `messageType` mappings (already declared in the bot metadata).
6. **Premium Experience data model**: the custom topic depends on `Premium_Experience__c` and `Premium_Experience_Attendee__c` (or equivalent objects) read by `JGR_Experience_Validation` via `MessagingSession.Id`.
7. **Activate the bot version** (`v4`) after deploy.

## Related metadata

- `force-app/main/default/bots/Fan_Agent/Fan_Agent.bot-meta.xml` — bot definition + context variables.
- `force-app/main/default/bots/Fan_Agent/v4.botVersion-meta.xml` — version pointer.
- `force-app/main/default/genAiPlannerBundles/Fan_Agent_v4/Fan_Agent_v4.genAiPlannerBundle` — full topic + action definitions.
- `force-app/main/default/genAiPlannerBundles/Fan_Agent_v4/agentScript/Fan_Agent_v4_definition.agent` — empty in current retrieve (planner uses XML metadata).
- `force-app/main/default/genAiPlannerBundles/Fan_Agent_v4/localActions/<topic>/<action>/{input,output}/schema.json` — JSON Schema for every action's IO.

The org also contains older inactive versions: `Fan_Agent_v1`, `Fan_Agent_v2`, `Fan_Agent_v3`. Active deployment is `v4` (last modified 2026-06-01).
