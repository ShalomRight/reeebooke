## API Contract: Bookings

### GET /api/bookings

List bookings. Scoped globally because it's single tenant. User scope resolved dynamically via Auth token (Staff+ can view all; Clients view only their own).

Query params:
page: number (default: 1)
limit: number (default: 20, max: 100)
status: BookingStatus (optional filter)
userId: string (optional filter — enforced for Staff / Admin)
from: ISO date string (optional — filter by startsAt >=)
to: ISO date string (optional — filter by startsAt <=)
sort: 'startsAt' | 'createdAt' (default: 'startsAt')
order: 'asc' | 'desc' (default: 'asc')

Response: BookingListResponse
Auth: required
Roles: SUPER_ADMIN, ADMIN, STAFF, CLIENT
Side effects: none

### POST /api/bookings

Create a new booking and schedule a service offering.

Body: CreateBookingInput
Response: BookingDetailResponse (201)
Auth: optional (for guests, but recommended)
Roles: ALL
Side effects:

- Generates confirmation email
- Points computation for referrals
- Creates Audit log tied to creation timestamp

### GET /api/bookings/:id

Fetch single booking entity.

Response: BookingDetailResponse
Auth: required
Roles: ALL (Clients scoped to their own `userId`)

### PATCH /api/bookings/:id

Partial update. Follows established transitions map.

Body: UpdateBookingInput
Response: BookingDetailResponse
Auth: required
Roles: ADMIN, STAFF (cancel) | ADMIN only (status force-override)
Side effects:

- On cancel: sets `cancelledAt`, `cancelledBy`, sends cancellation email
- On confirm: sets `confirmedAt`, sends confirmation email

### DELETE /api/bookings/:id

Soft delete. Admin only. Populates `deletedAt` without severing table relationships.

Response: 204 No Content
Auth: required
Roles: SUPER_ADMIN, ADMIN
Side effects:

- Prevents public display.
- Archival audit logs.
