-- Database name is our_economic_lives
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "industry_pyramid"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL
);

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"email" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"first_name" VARCHAR (80),
	"last_name" VARCHAR (80),
	"phone_number" VARCHAR (80),
	"city" VARCHAR (80),
	"authorization" INT NOT NULL,
	"coach_id" INT REFERENCES "user",
	"current_profession" VARCHAR (80),
	"industry_pyramid" INT REFERENCES "industry_pyramid",
	"organization_name" VARCHAR (200),
	"is_registered" BOOLEAN DEFAULT FALSE,
	"is_active" BOOLEAN DEFAULT TRUE
);

CREATE TABLE "building_block"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (200) NOT NULL,
	"description" VARCHAR (1000) NOT NULL,
	"tier_id" INT NOT NULL
);

CREATE TABLE "competency"(
	"id" SERIAL PRIMARY KEY,
	"value" VARCHAR (1000) NOT NULL,
	"building_block_id" INT NOT NULL REFERENCES "building_block"
);

CREATE TABLE "user_blocks"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user",
	"building_block_id" INT NOT NULL REFERENCES "building_block",
	"is_recommended" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "critical_experience"(
	"id" SERIAL PRIMARY KEY,
	"user_text" VARCHAR (3000),
	"user_blocks_id" INT NOT NULL REFERENCES "user_blocks",
	"coach_comments" VARCHAR (3000),
	"is_approved" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "industry_pyramid_building_block"(
	"id" SERIAL PRIMARY KEY,
	"building_block_id" INT NOT NULL REFERENCES "building_block",
	"industry_pyramid_id" INT NOT NULL REFERENCES "industry_pyramid"
);

CREATE TABLE "messages"(
	"id" SERIAL PRIMARY KEY,
	"id_sender" INT NOT NULL REFERENCES "user",
	"send_date" TIMESTAMP DEFAULT clock_timestamp(),
	"text" VARCHAR
);

CREATE TABLE "users_messages"(
	"id" SERIAL PRIMARY KEY,
	"id_recipient" INT REFERENCES "user",
	"id_message" INT REFERENCES "messages",
	"is_read" BOOLEAN DEFAULT FALSE 
);
