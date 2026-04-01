CREATE TABLE `schedule_periods` (
	`id` text PRIMARY KEY NOT NULL,
	`schedule_id` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `schedule_periods_schedule_id_idx` ON `schedule_periods` (`schedule_id`);--> statement-breakpoint
CREATE TABLE `schedules` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`resource_type` text NOT NULL,
	`resource_id` text NOT NULL,
	`start_date` text,
	`end_date` text,
	`frequency` text,
	`frequency_data` text,
	`active` integer DEFAULT true NOT NULL,
	`allow_overlap` integer DEFAULT false NOT NULL,
	`no_weekends` integer DEFAULT false NOT NULL,
	`max_duration_minutes` integer,
	`working_hours_start` text,
	`working_hours_end` text,
	`metadata` text,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `schedules_resource_type_idx` ON `schedules` (`resource_type`);--> statement-breakpoint
CREATE INDEX `schedules_resource_id_idx` ON `schedules` (`resource_id`);--> statement-breakpoint
CREATE INDEX `schedules_active_idx` ON `schedules` (`active`);