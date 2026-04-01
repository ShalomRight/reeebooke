CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_provider_account_idx` ON `accounts` (`provider`,`provider_account_id`);--> statement-breakpoint
CREATE INDEX `accounts_user_id_idx` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`service_id` text NOT NULL,
	`user_id` text,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`payment_method` text NOT NULL,
	`mobile_provider` text,
	`email` text,
	`user_name` text NOT NULL,
	`phone` text NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `bookings_service_id_idx` ON `bookings` (`service_id`);--> statement-breakpoint
CREATE INDEX `bookings_user_id_idx` ON `bookings` (`user_id`);--> statement-breakpoint
CREATE INDEX `bookings_status_idx` ON `bookings` (`status`);--> statement-breakpoint
CREATE INDEX `bookings_date_idx` ON `bookings` (`date`);--> statement-breakpoint
CREATE INDEX `bookings_service_id_status_idx` ON `bookings` (`service_id`,`status`);--> statement-breakpoint
CREATE TABLE `cart_emails` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`email` text NOT NULL,
	`cart_items` text NOT NULL,
	`sent` integer DEFAULT false NOT NULL,
	`sent_at` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `cart_emails_user_id_idx` ON `cart_emails` (`user_id`);--> statement-breakpoint
CREATE INDEX `cart_emails_email_idx` ON `cart_emails` (`email`);--> statement-breakpoint
CREATE INDEX `cart_emails_sent_expires_idx` ON `cart_emails` (`sent`,`expires_at`);--> statement-breakpoint
CREATE TABLE `carts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`service_id` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL,
	`expires_at` text DEFAULT (datetime('now', '+24 hours')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `carts_user_id_idx` ON `carts` (`user_id`);--> statement-breakpoint
CREATE INDEX `carts_service_id_idx` ON `carts` (`service_id`);--> statement-breakpoint
CREATE INDEX `carts_expires_at_idx` ON `carts` (`expires_at`);--> statement-breakpoint
CREATE TABLE `discount_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`type` text NOT NULL,
	`value` integer NOT NULL,
	`min_amount` integer,
	`max_uses` integer,
	`used_count` integer DEFAULT 0 NOT NULL,
	`expires_at` text,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `discount_codes_code_unique` ON `discount_codes` (`code`);--> statement-breakpoint
CREATE INDEX `discount_codes_code_idx` ON `discount_codes` (`code`);--> statement-breakpoint
CREATE INDEX `discount_codes_active_idx` ON `discount_codes` (`active`);--> statement-breakpoint
CREATE TABLE `discount_usages` (
	`id` text PRIMARY KEY NOT NULL,
	`discount_code_id` text NOT NULL,
	`user_id` text,
	`email` text,
	`user_name` text,
	`phone` text,
	`discount_amount` integer NOT NULL,
	`cart_total` integer NOT NULL,
	`final_total` integer NOT NULL,
	`booking_id` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `discount_usages_discount_code_id_idx` ON `discount_usages` (`discount_code_id`);--> statement-breakpoint
CREATE INDEX `discount_usages_user_id_idx` ON `discount_usages` (`user_id`);--> statement-breakpoint
CREATE INDEX `discount_usages_email_idx` ON `discount_usages` (`email`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`service_id` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorites_user_id_service_id_idx` ON `favorites` (`user_id`,`service_id`);--> statement-breakpoint
CREATE INDEX `favorites_user_id_idx` ON `favorites` (`user_id`);--> statement-breakpoint
CREATE INDEX `favorites_service_id_idx` ON `favorites` (`service_id`);--> statement-breakpoint
CREATE TABLE `photos` (
	`id` text PRIMARY KEY NOT NULL,
	`booking_id` text NOT NULL,
	`url` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `photos_booking_id_idx` ON `photos` (`booking_id`);--> statement-breakpoint
CREATE TABLE `points_redemptions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`points` integer NOT NULL,
	`discount_amount` integer NOT NULL,
	`booking_id` text,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `points_redemptions_user_id_idx` ON `points_redemptions` (`user_id`);--> statement-breakpoint
CREATE INDEX `points_redemptions_status_expires_idx` ON `points_redemptions` (`status`,`expires_at`);--> statement-breakpoint
CREATE TABLE `promotion_subscribers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`phone` text,
	`user_id` text,
	`subscribed` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `promotion_subscribers_email_unique` ON `promotion_subscribers` (`email`);--> statement-breakpoint
CREATE INDEX `promotion_subscribers_user_id_idx` ON `promotion_subscribers` (`user_id`);--> statement-breakpoint
CREATE INDEX `promotion_subscribers_subscribed_idx` ON `promotion_subscribers` (`subscribed`);--> statement-breakpoint
CREATE TABLE `ratings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`service_id` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ratings_user_id_service_id_idx` ON `ratings` (`user_id`,`service_id`);--> statement-breakpoint
CREATE INDEX `ratings_service_id_idx` ON `ratings` (`service_id`);--> statement-breakpoint
CREATE INDEX `ratings_user_id_idx` ON `ratings` (`user_id`);--> statement-breakpoint
CREATE INDEX `ratings_status_idx` ON `ratings` (`status`);--> statement-breakpoint
CREATE INDEX `ratings_service_id_status_idx` ON `ratings` (`service_id`,`status`);--> statement-breakpoint
CREATE TABLE `referral_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`user_id` text NOT NULL,
	`points_per_referral` integer DEFAULT 100 NOT NULL,
	`usage_count` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `referral_codes_code_unique` ON `referral_codes` (`code`);--> statement-breakpoint
CREATE INDEX `referral_codes_user_id_idx` ON `referral_codes` (`user_id`);--> statement-breakpoint
CREATE TABLE `referral_rewards` (
	`id` text PRIMARY KEY NOT NULL,
	`referrer_id` text NOT NULL,
	`referred_id` text NOT NULL,
	`user_id` text,
	`points` integer NOT NULL,
	`booking_id` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `referral_rewards_referrer_id_idx` ON `referral_rewards` (`referrer_id`);--> statement-breakpoint
CREATE INDEX `referral_rewards_referred_id_idx` ON `referral_rewards` (`referred_id`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` integer NOT NULL,
	`stripe_price_id` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`session_token` text NOT NULL,
	`user_id` text NOT NULL,
	`expires` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_session_token_unique` ON `sessions` (`session_token`);--> statement-breakpoint
CREATE INDEX `sessions_user_id_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`email_verified` text,
	`password` text,
	`role` text DEFAULT 'CLIENT' NOT NULL,
	`phone` text,
	`image` text,
	`reset_token` text,
	`reset_token_expiry` text,
	`referral_code` text,
	`referred_by_id` text,
	`referral_points` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_referral_code_unique` ON `users` (`referral_code`);--> statement-breakpoint
CREATE INDEX `users_role_idx` ON `users` (`role`);--> statement-breakpoint
CREATE INDEX `users_referred_by_id_idx` ON `users` (`referred_by_id`);--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens_token_unique` ON `verification_tokens` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens_identifier_token_idx` ON `verification_tokens` (`identifier`,`token`);