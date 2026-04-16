ALTER TABLE `messages` ADD `parent_id` text;--> statement-breakpoint
ALTER TABLE `messages` ADD `is_from_admin` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE INDEX `messages_parent_id_idx` ON `messages` (`parent_id`);