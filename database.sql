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
	"Organization" VARCHAR (80),
	"is_registered" BOOLEAN DEFAULT FALSE
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

CREATE TABLE "critical_experience"(
	"id" SERIAL PRIMARY KEY,
	"user_text" VARCHAR (500),
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

CREATE TABLE "industry_pyramid_building_block"(
	"id" SERIAL PRIMARY KEY,
	"building_block_id" INT NOT NULL,
	"industry_pyramid_id" INT NOT NULL
);

CREATE TABLE "industry_pyramid"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL
);

