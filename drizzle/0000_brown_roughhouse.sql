CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`external_id` text NOT NULL,
	`first_name` text DEFAULT '',
	`lat_name` text DEFAULT '',
	`email` text DEFAULT '',
	`photo_url` text DEFAULT '',
	`attributes` text DEFAULT '{}',
	`created_at` text DEFAULT CURRENT_TIME,
	`updated_at` text DEFAULT CURRENT_TIME
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_external_id_unique` ON `user` (`external_id`);