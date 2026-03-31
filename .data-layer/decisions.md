# Decisions Log — Data Layer Intelligence

## 1. Tenancy Model

- **Decision:** Single-Tenant
- **Reasoning:** Based on the existing `schema.prisma` definitions, there is no `Organization` model and all users, services, carts, and bookings exist in a unified namespace. This is ideal for a single business entity offering services.

## 2. Monetary Fields

- **Decision:** Integer Representation (Cents)
- **Reasoning:** Standardized on storing all monetary values (`price`, `discountAmount`, `cartTotal`, `finalTotal`) as `Int` natively, representing USD Cents (e.g., $10.00 is `1000`). This avoids IEEE 754 floating-point errors inherent to JavaScript Math operations and strict precision standards in financial systems like Stripe.

## 3. Date & Time Approach

- **Decision:** UTC DateTime Objects only
- **Reasoning:** Replaced split `date: DateTime` and `time: String` with merged UTC standard `startsAt: DateTime` and `endsAt: DateTime?`. A single date-time column supports better timezone shifting on the client and is infinitely more queryable computationally.

## 4. Lifecycle & Status Standardization

- **Decision:** Enum + Timestamp pairs
- **Reasoning:** Changed statuses like "PENDING" and roles to Enums (`BookingStatus`, `UserRole`, `RatingStatus`, etc.) to provide strict runtime safety. Additionally, added state timestamps to tracking models (e.g. `confirmedAt`, `cancelledAt` in `Booking`) rather than relying on `updatedAt` alone.

## 5. Soft Delete Strategy

- **Decision:** Nullable `deletedAt` Fields
- **Reasoning:** Core entities like `User`, `Booking`, and `Service` carry historical data significance (referrals, financial ties). In lieu of a hard CASCADE delete removing all trace of records, a set `deletedAt` field establishes safer user-facing deletion without losing accounting ties.
