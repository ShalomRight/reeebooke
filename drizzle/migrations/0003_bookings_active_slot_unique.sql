-- Prevent two non-cancelled bookings for the same service, calendar day, and start time.
-- Apply with: pnpm db:migrate (drizzle-kit) or wrangler d1 execute for D1.
CREATE UNIQUE INDEX IF NOT EXISTS `bookings_service_date_time_active_uidx`
ON `bookings` (`service_id`, `date`, `time`)
WHERE `status` != 'CANCELLED';
