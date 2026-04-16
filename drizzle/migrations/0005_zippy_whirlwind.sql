CREATE TABLE `message_notes` (
	`id` text PRIMARY KEY NOT NULL,
	`message_id` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `message_notes_message_id_idx` ON `message_notes` (`message_id`);--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`user_id` text,
	`source` text NOT NULL,
	`intent` text DEFAULT 'general' NOT NULL,
	`subject` text,
	`body` text NOT NULL,
	`requested_service_id` text,
	`requested_date` text,
	`requested_time_range` text,
	`status` text DEFAULT 'unread' NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `messages_user_id_idx` ON `messages` (`user_id`);--> statement-breakpoint
CREATE INDEX `messages_email_idx` ON `messages` (`email`);--> statement-breakpoint
CREATE INDEX `messages_status_idx` ON `messages` (`status`);--> statement-breakpoint
CREATE INDEX `messages_intent_idx` ON `messages` (`intent`);--> statement-breakpoint
CREATE INDEX `messages_source_idx` ON `messages` (`source`);--> statement-breakpoint
CREATE INDEX `messages_requested_service_id_idx` ON `messages` (`requested_service_id`);--> statement-breakpoint
CREATE INDEX `messages_status_created_at_idx` ON `messages` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `messages_intent_status_idx` ON `messages` (`intent`,`status`);