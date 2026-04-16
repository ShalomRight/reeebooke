-- Abby Hair Studio — Service Availability Schedules
-- Generated: 2026-04-16T10:02:23.012Z
-- 
-- Natural Hair & Color & Chemical: Mon–Thu 09:00–17:00
-- Locs: Fri 09:00–17:00 + Sat 09:00–15:00
--
-- Apply locally:  pnpm wrangler d1 execute reebooking-db --local  --file=drizzle/schedule-data-migration.sql
-- Apply remotely: pnpm wrangler d1 execute reebooking-db --remote --file=drizzle/schedule-data-migration.sql

DELETE FROM schedule_periods;
DELETE FROM schedules;

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('20f17163-76ad-412c-a1b4-2527bc1297fa', 'Color Consultation — Mon–Thu', 'availability', 'service', 'fcc89073-c0af-47ce-b28e-6e8396ac1fb2', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('85613264-9152-4a90-8820-2a07dd3ab530', '20f17163-76ad-412c-a1b4-2527bc1297fa', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('4a2605b7-98df-4719-87d7-cc1cb3bb08fe', 'Cut or Trim — Mon–Thu', 'availability', 'service', 'b7edf782-7148-4ccb-839b-34c55e360888', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('e898e5b9-c6a3-4ce7-aaae-371ef6f4d281', '4a2605b7-98df-4719-87d7-cc1cb3bb08fe', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('5f229b62-81fc-4cb6-bba3-58388209dda5', 'Double Process Colour (Bleach + Color) — Mon–Thu', 'availability', 'service', '21bc0712-dd5d-4d29-82c4-fca1a4da09d3', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('0c92540e-41c9-4ca9-86d2-831e7efde8a4', '5f229b62-81fc-4cb6-bba3-58388209dda5', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('07d26102-46cf-4b08-ba1f-30d5435016c6', 'Highlights — Mon–Thu', 'availability', 'service', '0781a49b-b5b9-488f-b03a-d690bb71eb70', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('44c24e04-04cc-46ce-a2ea-dc2f0222118c', '07d26102-46cf-4b08-ba1f-30d5435016c6', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('7674a9eb-2b73-4187-bec3-176bc44b0050', 'Relaxer Retouch & Style — Mon–Thu', 'availability', 'service', '04088bef-3d55-4d01-8679-9b7a088ce90d', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('cf8223ec-53d6-4ebd-985e-e2eb0549a5d6', '7674a9eb-2b73-4187-bec3-176bc44b0050', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('710e2806-d5f1-4126-910d-3842fa7a1646', 'Relaxer Retouch, Treatment & Style — Mon–Thu', 'availability', 'service', 'cc701d3e-6ea7-43ec-8e91-88e19aa632f2', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('fa43f5dc-ef35-45d0-a306-b9344aa958e9', '710e2806-d5f1-4126-910d-3842fa7a1646', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('7eeed86b-e76e-437e-894c-1c0c549bd83b', 'Single Process Colour / Grey Retouch — Mon–Thu', 'availability', 'service', '789ac68d-976c-4fe1-8e0f-8701f6f6d14d', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('350c3948-eee4-4279-9ebe-6fe20eb9d965', '7eeed86b-e76e-437e-894c-1c0c549bd83b', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('2a708d40-69dc-446a-bdd3-0aa5ae5b8d94', 'Virgin Relaxer — Mon–Thu', 'availability', 'service', '3359d6d3-5dfe-48cb-b8c0-815abf1d5292', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('79b7b734-2273-4878-82df-e391234f14a4', '2a708d40-69dc-446a-bdd3-0aa5ae5b8d94', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('6c1b5b27-5e97-4449-8a02-f3cccdde1e25', 'Wash, Treat & Style (Previously Relaxed Hair) — Mon–Thu', 'availability', 'service', 'b65f3510-6c83-4aee-90f8-c818705e2bc0', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('c4b4f410-81b8-4dec-9331-f285f55537c2', '6c1b5b27-5e97-4449-8a02-f3cccdde1e25', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('d8840d90-80e3-4be5-806b-39778f0bfa2c', '➕ Luxe Treatment Upgrade (Steam) — Mon–Thu', 'availability', 'service', 'ef53e423-1e19-4617-9486-fcd2ecf37c75', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('9d772c19-b4e0-462e-8e31-2578f26dbb6e', 'd8840d90-80e3-4be5-806b-39778f0bfa2c', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('0715956c-793a-4daf-bd8a-d89c872ecf44', 'Cut / Trim — Friday', 'availability', 'service', '27bedc38-d606-4463-9626-c2452849c853', 'weekly', '{"days":["friday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('a00c0caa-d717-4beb-8e66-c1d7b17852f6', '0715956c-793a-4daf-bd8a-d89c872ecf44', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('407ac5a9-4530-4275-8bfc-0e7bd506ef19', 'Cut / Trim — Saturday', 'availability', 'service', '27bedc38-d606-4463-9626-c2452849c853', 'weekly', '{"days":["saturday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('8e578cbd-df92-43c8-8905-548513a38696', '407ac5a9-4530-4275-8bfc-0e7bd506ef19', '09:00', '15:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('851f08a4-d48c-4888-800b-60073759e0b3', 'Loc Detox — Friday', 'availability', 'service', '3a6598b6-ca83-495b-a129-a417ca44775b', 'weekly', '{"days":["friday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('329aadc2-1048-4116-a826-cd8e0f0441c2', '851f08a4-d48c-4888-800b-60073759e0b3', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('bda080cd-4271-4ceb-a59b-39c97db8a3e5', 'Loc Detox — Saturday', 'availability', 'service', '3a6598b6-ca83-495b-a129-a417ca44775b', 'weekly', '{"days":["saturday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('4b7d1310-785e-459a-a841-a2bb1de25479', 'bda080cd-4271-4ceb-a59b-39c97db8a3e5', '09:00', '15:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('acb3d99c-9972-4e38-97a5-bbd3d1191aea', 'Loc Detox, Retwist & Style — Friday', 'availability', 'service', '5ec107a9-1a43-46ad-a4db-6e983433fae5', 'weekly', '{"days":["friday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('613a56f2-589d-4185-b06c-c5bdda094cf7', 'acb3d99c-9972-4e38-97a5-bbd3d1191aea', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('d371779a-53e9-4726-90eb-394921ddfdd1', 'Loc Detox, Retwist & Style — Saturday', 'availability', 'service', '5ec107a9-1a43-46ad-a4db-6e983433fae5', 'weekly', '{"days":["saturday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('8251ade5-f64d-4d8a-bbb5-d2874abc5e26', 'd371779a-53e9-4726-90eb-394921ddfdd1', '09:00', '15:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('5c755bda-2f23-4473-9dfc-755d6ab88023', 'Loc Retwist & Style (No Wash) — Friday', 'availability', 'service', 'ca016dc3-ab9b-4d45-86d5-3aafa4ed576a', 'weekly', '{"days":["friday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('013442a7-b991-432a-bae3-1f546ad0351c', '5c755bda-2f23-4473-9dfc-755d6ab88023', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('e19b0dd5-a350-45e5-a3f6-11aac4f0967c', 'Loc Retwist & Style (No Wash) — Saturday', 'availability', 'service', 'ca016dc3-ab9b-4d45-86d5-3aafa4ed576a', 'weekly', '{"days":["saturday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('5d67f558-2c52-4bcc-9e66-7fe19025bc86', 'e19b0dd5-a350-45e5-a3f6-11aac4f0967c', '09:00', '15:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('4c3a49b4-5cf0-4763-b84a-889958ba9482', 'Loc Wash, Retwist & Style — Friday', 'availability', 'service', 'ee1ce950-a9f0-433c-ad9e-aac7c442e3fb', 'weekly', '{"days":["friday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('55479daa-6f26-4762-a7a5-8317137e5337', '4c3a49b4-5cf0-4763-b84a-889958ba9482', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('4c58563a-c2da-4995-8e23-85f2f8307d44', 'Loc Wash, Retwist & Style — Saturday', 'availability', 'service', 'ee1ce950-a9f0-433c-ad9e-aac7c442e3fb', 'weekly', '{"days":["saturday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('d749bf41-0c0d-4604-887b-1e197164cd78', '4c58563a-c2da-4995-8e23-85f2f8307d44', '09:00', '15:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('aca719ff-4dad-4035-b67b-dbfb15655995', 'Loc Wash, Retwist & Style (w/ High Fade) — Friday', 'availability', 'service', 'da00c61a-0769-4930-b5ed-26a1d82109bc', 'weekly', '{"days":["friday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('5a3ba1dc-2dae-4ab3-898d-223320a6bded', 'aca719ff-4dad-4035-b67b-dbfb15655995', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('3347d976-4271-40b6-89aa-66c0cb161cc3', 'Loc Wash, Retwist & Style (w/ High Fade) — Saturday', 'availability', 'service', 'da00c61a-0769-4930-b5ed-26a1d82109bc', 'weekly', '{"days":["saturday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('760c4a2b-83c2-4bec-ba70-9b37a2cf70ee', '3347d976-4271-40b6-89aa-66c0cb161cc3', '09:00', '15:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('474d43ee-789e-44a4-89a2-3ba2f832d2da', 'Starter Locs w/ Coils or Twists — Friday', 'availability', 'service', 'd1a6e565-fe20-49ea-8cf3-1dd9602f2232', 'weekly', '{"days":["friday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('ff16bf49-1df1-4119-8de8-260f54086c49', '474d43ee-789e-44a4-89a2-3ba2f832d2da', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('ed12c206-5293-4c83-9686-d043287bc8d2', 'Starter Locs w/ Coils or Twists — Saturday', 'availability', 'service', 'd1a6e565-fe20-49ea-8cf3-1dd9602f2232', 'weekly', '{"days":["saturday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('dd5b9f71-efb7-4cf2-bff6-9dd1dfa45fde', 'ed12c206-5293-4c83-9686-d043287bc8d2', '09:00', '15:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('51c8ee80-0e0b-4031-bfa9-4cc72aa5e712', 'Wash & Treat (Moisture / Protein / Hot Oil) — Friday', 'availability', 'service', '085ffc1d-acbf-4405-9d8f-c75976461936', 'weekly', '{"days":["friday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('5b0d7624-a99c-4c4b-8011-c41d69529b4b', '51c8ee80-0e0b-4031-bfa9-4cc72aa5e712', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('f9ff9ea1-ac0d-4ced-b4f6-40a3ec20963e', 'Wash & Treat (Moisture / Protein / Hot Oil) — Saturday', 'availability', 'service', '085ffc1d-acbf-4405-9d8f-c75976461936', 'weekly', '{"days":["saturday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('60368a83-6f4f-429a-a1e1-01ccf2f30dd6', 'f9ff9ea1-ac0d-4ced-b4f6-40a3ec20963e', '09:00', '15:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('0d852e5b-bf9f-464b-82b1-2d32b1765eef', '➕ Luxe Treatment Upgrade (Steam) — Friday', 'availability', 'service', '3c1654a1-17e0-48e2-80d2-55a54e4977ab', 'weekly', '{"days":["friday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('72561293-78a6-452a-9a17-3d0466fafd5d', '0d852e5b-bf9f-464b-82b1-2d32b1765eef', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('68143fb1-9b9f-408e-b97b-b9c763014886', '➕ Luxe Treatment Upgrade (Steam) — Saturday', 'availability', 'service', '3c1654a1-17e0-48e2-80d2-55a54e4977ab', 'weekly', '{"days":["saturday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('e4ba5feb-b7b9-4936-9972-578a00ec109e', '68143fb1-9b9f-408e-b97b-b9c763014886', '09:00', '15:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('704c65c9-4f2b-49e9-aebb-3279b278f68a', 'Curl Defining Service (Wash & Go / Finger Curls) — Mon–Thu', 'availability', 'service', 'b6191f10-3c0a-409e-be9a-015c9a979fd4', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('d2ed9103-86bc-4289-a188-54699f1f08e3', '704c65c9-4f2b-49e9-aebb-3279b278f68a', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('1f7445ed-a89e-4d4e-a824-2c3e8713aae8', 'Flat Twists, Single Plaits or Twists — Mon–Thu', 'availability', 'service', '98672a23-e3cc-4577-a31e-ed710a8a6e3f', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('fe31cbde-6636-4627-926a-4cb6ffa0750d', '1f7445ed-a89e-4d4e-a824-2c3e8713aae8', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('088b14f5-9c1d-428f-8ae6-ad240d9a1697', 'Hair Cut / Trim / Shaping — Mon–Thu', 'availability', 'service', '484272bf-bbcc-431e-a269-c449325c1ab3', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('1e57f3fe-56e0-48fa-81b3-fee6b2716a5b', '088b14f5-9c1d-428f-8ae6-ad240d9a1697', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('9c921846-d6fa-4010-9bfe-f98d373b188b', 'Keratin Smoothing Treatment — Mon–Thu', 'availability', 'service', '13fed565-f58b-4178-9574-df6aa0c73c8e', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('ca9f0843-8bd2-4cdb-82e1-40b2cdacf18e', '9c921846-d6fa-4010-9bfe-f98d373b188b', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('f6168a1b-8a6f-4fe5-9e36-bd111f94411c', 'Ponytail or Updo (Hair Provided by Client) — Mon–Thu', 'availability', 'service', 'd161a275-27fc-44b3-a5a3-f8ce9294a882', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('242b9fb7-d8f2-48ce-a505-473fec1846eb', 'f6168a1b-8a6f-4fe5-9e36-bd111f94411c', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('4b2cfd02-fa69-44f3-8fa7-c4b771f59a18', 'Rod Set (Dried & Separated in Salon) — Mon–Thu', 'availability', 'service', '33cd3838-e01a-4b41-bdaf-c6cc65c104a8', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('d3d5d992-5fdb-4e84-9eb8-bbe0e7055b6c', '4b2cfd02-fa69-44f3-8fa7-c4b771f59a18', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('3e500901-cbb5-4ac4-8846-ee6ade56d6f8', 'Silk Press (Includes Trim & Treatment) — Mon–Thu', 'availability', 'service', 'c2d21b14-91d4-4242-9dfb-2540693f6924', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('98b76084-550b-4bb0-8bfa-cf36adaadc48', '3e500901-cbb5-4ac4-8846-ee6ade56d6f8', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('13be2b54-563a-48dd-95da-b3938107b675', 'Twist-Out (Dried & Separated in Salon) — Mon–Thu', 'availability', 'service', '1407d176-7332-4ec9-8258-45e80fc04f4f', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('aec67c6b-4648-4bb2-9e65-af63c59f98d7', '13be2b54-563a-48dd-95da-b3938107b675', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('0df3ae16-23e0-4127-a621-1a7412273fb8', 'Wash & Treatment — Mon–Thu', 'availability', 'service', 'e5a95672-15b3-4523-bcd4-a8addc1bc782', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('265e105c-d284-4b3b-ad7e-5ef28e236463', '0df3ae16-23e0-4127-a621-1a7412273fb8', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('d1b44020-7b28-413a-bfab-f8a87dc5d504', 'Wash, Treat & Style Combo — Mon–Thu', 'availability', 'service', 'b08d7eaf-7e48-476c-bfab-e846f1650e84', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('d42a6b6f-3f6d-4e52-b576-f738ceff2912', 'd1b44020-7b28-413a-bfab-f8a87dc5d504', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('f7b6c4c5-3a25-447d-ac73-945be44da698', '➕ Luxe Treatment Upgrade (Steam) — Mon–Thu', 'availability', 'service', 'a631d79f-77d1-44c6-9809-dc98b6a377ef', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('155e33dd-92e9-49cc-9202-c405a913f2ba', 'f7b6c4c5-3a25-447d-ac73-945be44da698', '09:00', '17:00');

INSERT INTO schedules (id, name, type, resource_type, resource_id, frequency, frequency_data, active, allow_overlap, no_weekends, created_at, updated_at) VALUES ('192d5d67-3845-4052-b4fc-9474d11a9793', '➕ Take Down & Detangling — Mon–Thu', 'availability', 'service', '54ab8121-8efa-4f22-9bed-a572d99bfa59', 'weekly', '{"days":["monday","tuesday","wednesday","thursday"]}', 1, 1, 0, '2026-04-16T10:02:23.012Z', '2026-04-16T10:02:23.012Z');
INSERT INTO schedule_periods (id, schedule_id, start_time, end_time) VALUES ('5e41ed13-1ca4-405b-b757-db97c85865e8', '192d5d67-3845-4052-b4fc-9474d11a9793', '09:00', '17:00');

