# Subagent — Service Customer Verification

> Part of [Fan_Agent](../README.md). **Mandatory verification gate** that runs before any topic that exposes or mutates customer-bound data.

## Identity

| Field | Value |
|---|---|
| API name | `ServiceCustomerVerification_16jKY000000CeFO` |
| Local developer name | `ServiceCustomerVerification` |
| Master label | `Service Customer Verification` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Verifies the customer's identity before granting access to sensitive data. Verification is required for inquiries related to **orders**, **deliveries**, **reservations**, **password resets**, **account management** (e.g. contact information updates), or **cases**. Sensitive data includes confidential, private, or security-protected information, such as business-critical data or personally identifiable information (PII).

## Trigger

Invoked by the planner immediately before any of these topics is allowed to act on customer data:
- [AccountManagement](AccountManagement.md) — `UpdateVerifiedContact`, `ResetSecurePassword`
- [CaseManagement](CaseManagement.md) — every action takes `verifiedContactID`
- [OrderInquiries](OrderInquiries.md) — `GetOrderByOrderNumber`, `CancelOrder`
- [DeliveryIssues](DeliveryIssues.md) — `FinalizeNewDeliveryTime`
- [ReservationManagement](ReservationManagement.md) — `FinalizeReservation`

The verification flow uses email-based one-time codes; once a session is verified, the resulting `customerId` is reused for downstream actions.

## Instructions

> **`instruction0_179KY0000000OtU`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

| Order | Action | Required confirmation | Doc |
|---|---|---|---|
| 1 | `SendEmailVerificationCode_179KY0000000OtU` | No | [SendEmailVerificationCode.md](../actions/SendEmailVerificationCode.md) |
| 2 | `VerifyCustomer_179KY0000000OtU` | No | [VerifyCustomer.md](../actions/VerifyCustomer.md) |

## Typical flow

1. User asks for something requiring verification.
2. Planner calls `SendEmailVerificationCode` with the user-provided email/username → flow `SvcCopilotTmpl__SendVerificationCode`.
3. Customer reads the code from email and types it in chat.
4. Planner calls `VerifyCustomer` with the entered code + the `authenticationKey`/`customerId`/`customerType` returned in step 2 → flow `SvcCopilotTmpl__VerifyCode`.
5. On success, `messageAfterVerification` is shown and the planner continues with the originally requested topic, passing the verified `customerId` (typically the Contact ID) as `verifiedContactID` to downstream actions.

## Inputs / context

`SendEmailVerificationCode` reads its single input (`customerToVerify`) directly from the conversation. `VerifyCustomer` consumes its inputs from the prior step's output (planner pipes them via `copilotAction:isUsedByPlanner = true`).
