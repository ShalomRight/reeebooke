CREATE TABLE `gallery_images` (
	`id` text PRIMARY KEY NOT NULL,
	`section` text NOT NULL,
	`slot_index` integer DEFAULT 0 NOT NULL,
	`url` text NOT NULL,
	`alt` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `gallery_images_section_idx` ON `gallery_images` (`section`);--> statement-breakpoint
CREATE INDEX `gallery_images_section_slot_idx` ON `gallery_images` (`section`,`slot_index`);