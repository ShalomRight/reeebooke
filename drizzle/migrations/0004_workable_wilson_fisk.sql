PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sessions` (
	`session_token` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_sessions`("session_token", "user_id", "expires") SELECT "session_token", "user_id", "expires" FROM `sessions`;--> statement-breakpoint
DROP TABLE `sessions`;--> statement-breakpoint
ALTER TABLE `__new_sessions` RENAME TO `sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `sessions_user_id_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`email_verified` integer,
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
INSERT INTO `__new_users`("id", "name", "email", "email_verified", "password", "role", "phone", "image", "reset_token", "reset_token_expiry", "referral_code", "referred_by_id", "referral_points", "created_at", "updated_at") SELECT "id", "name", "email", "email_verified", "password", "role", "phone", "image", "reset_token", "reset_token_expiry", "referral_code", "referred_by_id", "referral_points", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_referral_code_unique` ON `users` (`referral_code`);--> statement-breakpoint
CREATE INDEX `users_role_idx` ON `users` (`role`);--> statement-breakpoint
CREATE INDEX `users_referred_by_id_idx` ON `users` (`referred_by_id`);--> statement-breakpoint
CREATE TABLE `__new_verification_tokens` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_verification_tokens`("identifier", "token", "expires") SELECT "identifier", "token", "expires" FROM `verification_tokens`;--> statement-breakpoint
DROP TABLE `verification_tokens`;--> statement-breakpoint
ALTER TABLE `__new_verification_tokens` RENAME TO `verification_tokens`;--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens_token_unique` ON `verification_tokens` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens_identifier_token_idx` ON `verification_tokens` (`identifier`,`token`);--> statement-breakpoint
ALTER TABLE `services` ADD `category` text;