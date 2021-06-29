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
	"industry_pyramid" INT,
	"organization_name" VARCHAR (80),
	"is_registered" BOOLEAN DEFAULT FALSE,
	"is_active" BOOLEAN DEFAULT TRUE
); 

CREATE TABLE "user_blocks"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"building_block_id" INT NOT NULL,
	"is_recommended" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "critical_experience"(
	"id" SERIAL PRIMARY KEY,
	"user_text" VARCHAR (300),
	"attachment" VARCHAR (80),
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