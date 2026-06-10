# Action — Update Verified Contact

## Identity

| Field | Value |
|---|---|
| Master label | `Update Verified Contact` |
| Local developer name | `UpdateVerifiedContact` |
| Source template | `SvcCopilotTmpl__UpdateVerifiedContact` |
| Invocation target | `SvcCopilotTmpl__UpdateVrfyCtct` |
| Invocation target type | `flow` |
| Confirmation required | **`true`** |
| Show in progress indicator | `true` |

## Purpose

Updates fields on a customer's contact record, such as the email address, phone number, or postal address.

## Used by

- [AccountManagement](../subagents/AccountManagement.md) — `UpdateVerifiedContact_179KY0000000OtV`

## Prerequisites

- Customer must be verified through [Service Customer Verification](../subagents/ServiceCustomerVerification.md). `verifiedContactID` is planner-piped from the verified session.
- Explicit user confirmation required.
- Inputs are differential: only the fields the user wants to change should be populated; the rest are left empty (the flow treats empty as "no change").

## Inputs

| Name | Type | Required | User input | PII | Description |
|---|---|---|---|---|---|
| `verifiedContactID` | text | **Yes** | No (planner-piped) | No | Contact record ID to update. |
| `newCity` | text | No | Yes | No | New city. Empty if not changing. |
| `newEmailAddress` | text | No | Yes | **Yes** | New email address. Empty if not changing. |
| `newPhoneNumber` | text | No | Yes | **Yes** | New phone number. Empty if not changing. |
| `newPostalCode` | text | No | Yes | No | New postal code. Empty if not changing. |
| `newState` | text | No | Yes | No | New state. Empty if not changing. |
| `newStreetAddress` | text | No | Yes | No | New street address. Empty if not changing. |

## Outputs

| Name | Type | Displayable | Used by planner | Description |
|---|---|---|---|---|
| `contactRecord` | recordInfo (Contact) | Yes | Yes | The updated contact record. |

## Dependencies

- Flow `SvcCopilotTmpl__UpdateVrfyCtct` installed.
- Field-level edit permissions on `Contact` for the agent bot user across the 6 mutable fields above.
