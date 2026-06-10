# Subagent — Reservation Management

> Part of [Fan_Agent](../README.md). The booking step (`FinalizeReservation`) requires [Service Customer Verification](ServiceCustomerVerification.md).

## Identity

| Field | Value |
|---|---|
| API name | `ReservationManagement_16jKY000000CeFO` |
| Local developer name | `ReservationManagement` |
| Master label | `Reservation Management` |
| Plugin type | `Topic` |
| Language | `en_US` |
| Can escalate | `false` |

## Purpose

Handles requests to create new reservations for customers at their desired time slots.

## Trigger

The planner enters this topic when the user wants to:
- Check available times to make a reservation.
- Book a new reservation.
- Ask a reservation-policy question.

## Instructions

> **`instruction0_179KY0000000OtN`** — *You are an AI Agent and your Job is to help customers redeem to better seats.*

## Actions

| Action | Confirmation | Mutates data | Doc |
|---|---|---|---|
| `AnswerQuestionsWithKnowledge_179KY0000000OtN` | No | No | [AnswerQuestionsWithKnowledge.md](../actions/AnswerQuestionsWithKnowledge.md) |
| `IdentifyCustomerByEmail_179KY0000000OtN` | No | No | [IdentifyCustomerByEmail.md](../actions/IdentifyCustomerByEmail.md) |
| `GetReservationTimeSlots_179KY0000000OtN` | No | No | [GetReservationTimeSlots.md](../actions/GetReservationTimeSlots.md) |
| `FinalizeReservation_179KY0000000OtN` | **Yes** | Yes | [FinalizeReservation.md](../actions/FinalizeReservation.md) |

## Typical booking flow

1. `IdentifyCustomerByEmail` to anchor the contact.
2. `GetReservationTimeSlots` for the desired date.
3. User picks a slot.
4. After verification + explicit confirmation, `FinalizeReservation` books it.
