
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
	"coach_id" INT
); 

CREATE TABLE "user_type" (
	"id" SERIAL PRIMARY KEY,
	"role" VARCHAR (80) NOT NULL
);

CREATE TABLE "user_blocks"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"building_block_id" INT NOT NULL,
	"is_recommended" BOOLEAN
);

CREATE TABLE "attachments"(
	"id" SERIAL PRIMARY KEY,
	"user_text" VARCHAR (300),
	"picture" VARCHAR (80),
	"user_blocks_id" INT NOT NULL,
	"coach_comments" VARCHAR (300),
	"is_completed" BOOLEAN
);

CREATE TABLE "building_block"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"description" VARCHAR (80) NOT NULL,
	"tier_id" INT NOT NULL
);

CREATE TABLE "competency"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
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

INSERT INTO "user" ("email", "password", "first_name", "last_name", "phone_number", "city", "authorization", "coach_id")
VALUES ('test1', 'test1', 'Test', 'PA', '123', 'Minneapolis', 1, 0),
('test2', 'test2', 'Test', 'Coach', '123', 'Minneapolis', 2, 0),
('test3', 'test3', 'Test', 'User', '123', 'Minneapolis', 3, 2);
