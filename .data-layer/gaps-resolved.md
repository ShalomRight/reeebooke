# Gaps Resolved — Data Layer

A record of architectural gaps found in the original Prisma schema, and how they were structurally rectified for the new standard.

### 1. `Booking` (DateTime representation)

**Gap Found:** Splitting `date` into a `DateTime` and `time` into a `String` is risky for database index checks and timezone computations.
**Resolution:** Replaced with single UTC `startsAt: DateTime`. Added `endsAt: DateTime?` to indicate duration natively without derivation logic.

### 2. Status Literals (Multiple Models)

**Gap Found:** Properties like `status` in `Booking`, `Rating.status`, `PointsRedemption.status`, and `User.role` were arbitrary `String` variables relying on fragile default assignments.
**Resolution:** Generated and linked native relational Enums (`BookingStatus`, `RatingStatus`, `RedemptionStatus`, `UserRole`). State modifications are now safely typed.

### 3. Record Deletion / Soft Deletes

**Gap Found:** Models deleted the entity permanently or cascaded wildly through critical application histories.
**Resolution:** Added `deletedAt: DateTime?` as explicit fields on core models (`User`, `Service`, `Booking`).

### 4. Lifecycle Tracking

**Gap Found:** Transitions weren't timestamped, meaning finding "When was this booking confirmed?" was relying on application logs.
**Resolution:** Explicit timestamps were mapped on the `Booking` schema (`confirmedAt`, `cancelledAt`, `completedAt`). Information on who triggered the flag `cancelledBy` was also added.

### 5. Index Optimizations

**Gap Found:** Critical fetching endpoints (ex: fetch active bookings for user) did not feature index composites, risking long query lockups over time.
**Resolution:** Explicit indices configured using `@@index` across mapping queries, focusing on `status` and `userId` intersections.
