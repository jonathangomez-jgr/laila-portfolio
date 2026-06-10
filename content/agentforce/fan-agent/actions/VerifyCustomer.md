# Action — Verify Customer

> Step 2 of the [Service Customer Verification](../subagents/ServiceCustomerVerification.md) sequence.

## Identity

| Field | Value |
|---|---|
| Master label | `Verify Customer` |
| Local developer name | `VerifyCustomer` |
| Source template | `SvcCopilotTmpl__VerifyCustomer` |
| Invocation target | `SvcCopilotTmpl__VerifyCode` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |

## Purpose

Verifies whether the verification code entered by the user matches the code sent to the user's email address. On success, downstream topics (Account, Cases, Orders, Deliveries, Reservations) can use the resulting `customerId` as the verified Contact ID.

## Used by

- [ServiceCustomerVerification](../subagents/ServiceCustomerVerification.md) — `VerifyCustomer_179KY0000000OtU`

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `customerCode` | text | **Yes** | **Yes** | No | The verification code the user typed in chat. |
| `authenticationKey` | text | **Yes** | No (planner-piped from [`SendEmailVerificationCode`](SendEmailVerificationCode.md)) | No | Authentication key used to validate the code. |
| `customerId` | text | **Yes** | No (planner-piped) | No | The Salesforce User ID or Contact ID being verified. |
| `customerType` | text | **Yes** | No (planner-piped) | No | Customer ID type (Salesforce user vs. contact). |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `isVerified` | boolean | No | No | Whether the customer code is verified. |
| `customerId` | text | No | No | Verified Salesforce user ID or contact ID. |
| `customerType` | text | No | No | Type of the verified ID. |
| `messageAfterVerification` | text | Yes | No | Generic post-verification message displayed to the user. |

> Note: `isVerified` is **not** marked as `isUsedByPlanner`. Verification state in the conversation is driven by the planner's awareness that this action ran successfully (the boolean is a flow-internal control). Downstream actions consume the `customerId` returned here as their `verifiedContactID` input.

## Dependencies

- Flow `SvcCopilotTmpl__VerifyCode` must be installed.
- Same email-delivery prerequisites as [`SendEmailVerificationCode`](SendEmailVerificationCode.md).
