# Action — Send Email with Verification Code

> Step 1 of the [Service Customer Verification](../subagents/ServiceCustomerVerification.md) sequence.

## Identity

| Field | Value |
|---|---|
| Master label | `Send Email with Verification Code` |
| Local developer name | `SendEmailVerificationCode` |
| Source template | `SvcCopilotTmpl__SendEmailVerificationCode` |
| Invocation target | `SvcCopilotTmpl__SendVerificationCode` |
| Invocation target type | `flow` |
| Confirmation required | `false` |
| Show in progress indicator | `true` |

## Purpose

Sends a generated verification code to the user's email address. The flow generates a random code, persists an authentication key, and emails the code to the customer.

## Used by

- [ServiceCustomerVerification](../subagents/ServiceCustomerVerification.md) — `SendEmailVerificationCode_179KY0000000OtU`

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `customerToVerify` | text | **Yes** | Yes | **Yes** | Email address or username provided by the customer. Initiates the verification process. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `verificationMessage` | text | Yes | Yes | Generic message displayed to the user (e.g. "Code sent to ...@..."). |
| `verificationCode` | text | No | No | The generated verification code. **Internal — never displayed.** |
| `authenticationKey` | text | No | No | Authentication key used to validate the code on the next step. |
| `customerId` | text | No | No | The Salesforce User ID or Contact ID matched to the email. |
| `customerType` | text | No | No | Customer ID type (Salesforce user vs. contact). |

## Downstream contract

The values `authenticationKey`, `customerId`, and `customerType` are passed directly into [`VerifyCustomer`](VerifyCustomer.md) as `isUserInput = false` inputs (planner-piped, not displayed).

## Dependencies

- Flow `SvcCopilotTmpl__SendVerificationCode` must be installed.
- An organisation-wide email address or transactional email setup that can deliver to customer emails.
