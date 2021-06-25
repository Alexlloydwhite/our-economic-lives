-- Database name is our_economic_lives
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"first_name" VARCHAR (80),
	"last_name" VARCHAR (80),
	"phone_number" VARCHAR (80),
	"city" VARCHAR (80),
	"authorization" INT NOT NULL,
	"coach_id" INT,
	"current_profession" VARCHAR (80),
	"desired_career" INT,
	"is_registered" BOOLEAN DEFAULT FALSE,
	"is_active" BOOLEAN DEFAULT TRUE
); 

CREATE TABLE "user_type" (
	"id" SERIAL PRIMARY KEY,
	"role" VARCHAR (80) NOT NULL
);

CREATE TABLE "user_blocks"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"building_block_id" INT NOT NULL,
	"is_recommended" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "attachments"(
	"id" SERIAL PRIMARY KEY,
	"user_text" VARCHAR (300),
	"picture" VARCHAR (80),
	"user_blocks_id" INT NOT NULL,
	"coach_comments" VARCHAR (300),
	"is_completed" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "building_block"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL,
	"description" VARCHAR (200) NOT NULL,
	"tier_id" INT NOT NULL
);

CREATE TABLE "competency"(
	"id" SERIAL PRIMARY KEY,
	"value" VARCHAR (80) NOT NULL,
	"building_block_id" INT NOT NULL
);

CREATE TABLE "career_path_building_block"(
	"id" SERIAL PRIMARY KEY,
	"building_block_id" INT NOT NULL,
	"career_path_id" INT NOT NULL
);

CREATE TABLE "career_path"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL
);

INSERT INTO "user" ("email", "password", "first_name", "last_name", "phone_number", "city", "authorization", "coach_id", "current_profession", "desired_career")
VALUES ('test1', 'test1', 'Test', 'PA', '123', 'Minneapolis', 1, NULL, NULL, NULL),
('test2', 'test2', 'Test', 'Coach', '123', 'Minneapolis', 2, NULL, NULL, NULL),
('test3', 'test3', 'Test', 'User', '123', 'Minneapolis', 3, 2, 'Cashier', 2); 

INSERT INTO "career_path" ("name")
VALUES ('Generic'),
('Plumber'),
('Store Manager'),
('Pilot');

INSERT INTO "building_block" ("name", "description", "tier_id")
VALUES ('Integrity', 'Displaying strong moral principles and work ethic.', 1),
('Professionalism', 'Maintaining a professional presence.', 1),
('Initaitive', 'Demonstrating a commitment to effective job performance by taking action on one’s own and following through to get the job done.', 1);

INSERT INTO "competency" ("value", "building_block_id")
VALUES ('Behaving ethically', 1),
('Acting fairly', 1),
('Taking responsibility', 1),
('Demonstrating self-control', 2),
('Professional appearance', 2),
('Social responsibility', 2),
('Maintaining a positive attitiude', 2),
('Persisting', 3),
('Taking initiative', 3),
('Setting challenging goals', 3),
('Working independently', 3),
('Achievement motivation', 3);

INSERT INTO "career_path_building_block" ("building_block_id", "career_path_id")
VALUES (1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3),
(3, 1),
(3, 2),
(3, 3);

INSERT INTO "user_blocks" ("user_id", "building_block_id", "is_recommended")
VALUES (3, 1, FALSE),
(3, 2, FALSE),
(3, 3, TRUE);