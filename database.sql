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

INSERT INTO industry_pyramid ("name")
VALUES ('Generic'),
('Nurse'),
('Truck Driver'),
('Software Developer'),
('Food and Beverage Services'),
('Residental Construction');

DROP TABLE "user";
DROP TABLE "building_block";
DROP TABLE "competency";
DROP TABLE "industry_pyramid_building_block";
DROP TABLE "industry_pyramid";
DROP TABLE "user_blocks";
DROP TABLE "critical_experience";

SELECT building_block.id FROM building_block
    JOIN career_path_building_block ON building_block.id = career_path_building_block.building_block_id
    WHERE career_path_building_block.career_path_id = 1;
    
    
SELECT is_recommended, building_block.name, building_block.description, building_block.tier_id, building_block.id FROM "user_blocks"
    JOIN building_block ON user_blocks.building_block_id = building_block.id               
    WHERE user_id = $1;
    
SELECT * FROM user_blocks
JOIN building_block ON building_block.id = user_blocks.building_block_id
LEFT JOIN attachments ON user_blocks.id = attachments.user_blocks_id
JOIN competency ON building_block.id = competency.building_block_id
WHERE user_blocks.user_id = 5 
AND user_blocks.building_block_id = 1;

SELECT building_block.id, building_block.name FROM building_block
	JOIN industry_pyramid_building_block ON industry_pyramid_building_block.building_block_id = building_block.id
	JOIN industry_pyramid ON industry_pyramid.id = industry_pyramid_building_block.industry_pyramid_id
	WHERE building_block.tier_id = 3 AND industry_pyramid.id = 1
	ORDER BY building_block."name" ASC;
	
SELECT building_block.id, building_block.name, is_recommended FROM building_block
	JOIN industry_pyramid_building_block ON industry_pyramid_building_block.building_block_id = building_block.id
	JOIN industry_pyramid ON industry_pyramid.id = industry_pyramid_building_block.industry_pyramid_id
	LEFT OUTER JOIN user_blocks ON user_blocks.building_block_id = building_block.id
	WHERE building_block.tier_id = 1 AND industry_pyramid.id = 1 AND user_blocks.user_id = 2
	ORDER BY building_block."name" ASC;
	
SELECT * FROM user_blocks
JOIN building_block ON user_blocks.building_block_id = building_block.id
WHERE user_blocks.is_recommended = TRUE;
