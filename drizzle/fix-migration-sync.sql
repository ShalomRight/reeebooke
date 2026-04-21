-- Fix wrangler migration tracking: seed d1_migrations with records for
-- migrations that already exist in the database so wrangler won't replay them.
-- Then create the gallery_images table (migration 0007) which is missing.

-- Step 1: Ensure d1_migrations table exists (wrangler creates this automatically
-- but if the DB was bootstrapped manually it may be missing)
CREATE TABLE IF NOT EXISTS d1_migrations (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    UNIQUE,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Step 2: Mark existing migrations as applied (ignore if already there)
INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0000_ancient_hemingway.sql');
INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0001_ancient_shinko_yamashiro.sql');
INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0002_service_description_media.sql');
INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0003_bookings_active_slot_unique.sql');
INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0004_workable_wilson_fisk.sql');
INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0005_zippy_whirlwind.sql');
INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0006_slimy_tomas.sql');
INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0007_tan_human_torch.sql');

-- Step 3: Create the gallery_images table (migration 0007)
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id`         text    PRIMARY KEY NOT NULL,
  `section`    text    NOT NULL,
  `slot_index` integer NOT NULL DEFAULT 0,
  `url`        text    NOT NULL,
  `alt`        text    NOT NULL DEFAULT '',
  `created_at` text    NOT NULL DEFAULT (datetime('now')),
  `updated_at` text    NOT NULL DEFAULT (datetime('now'))
);

-- Step 4: Indexes for gallery_images
CREATE INDEX IF NOT EXISTS `gallery_images_section_idx`      ON `gallery_images` (`section`);
CREATE INDEX IF NOT EXISTS `gallery_images_section_slot_idx` ON `gallery_images` (`section`, `slot_index`);
