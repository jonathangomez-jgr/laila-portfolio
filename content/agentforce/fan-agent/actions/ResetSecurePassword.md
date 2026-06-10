# Action — Reset Secure Password

## Identity

| Field | Value |
|---|---|
| Master label | `Reset Secure Password` |
| Local developer name | `ResetSecurePassword` |
| Source template | `SvcCopilotTmpl__ResetSecurePassword` |
| Invocation target | `SvcCopilotTmpl__ResetScrPassword` |
| Invocation target type | `flow` |
| Confirmation required | **`true`** |
| Show in progress indicator | `true` |

## Purpose

Send a password reset link to the email address associated with the given Contact ID.

## Used by

- [AccountManagement](../subagents/AccountManagement.md) — `ResetSecurePassword_179KY0000000OtV`

## Prerequisites

- The customer **must be verified** by [Service Customer Verification](../subagents/ServiceCustomerVerification.md). The `verifiedContactID` input is intentionally not user-supplied — it must come from the verified session.
- The planner must obtain explicit user confirmation before invoking (`isConfirmationRequired = true`).

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `verifiedContactID` | text | **Yes** | No (planner-piped from verification) | No | Contact record ID for which to reset the password. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `outcomeMessage` | text | Yes | Yes | Message that lets the customer know whether the password was successfully reset. |

## Dependencies

- Flow `SvcCopilotTmpl__ResetScrPassword` installed.
- Experience Cloud / community user provisioning aligned with the contact (the flow typically calls the standard reset-password mechanism).
