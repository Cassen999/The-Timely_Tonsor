
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) ,
    "password" VARCHAR (1000),
    "first_name" VARCHAR (20),
    "last_name" VARCHAR (20),
    "phone_number" bigint,
    "is_barber" boolean,
    "notes" VARCHAR (1000)
);

CREATE TABLE "user_appointment" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"barber_id" INT REFERENCES "user",
	"date" DATE,
	"dotw" varchar,
	"time" TIME
);

CREATE TABLE appointment_slots (
	"id" SERIAL PRIMARY KEY,
	"dotw" varchar,
	"start_time" int,
	"end_time" int
);


INSERT INTO "user_appointment" ("user_id", "barber_id", "date", "dotw", "time")
VALUES (5, 4, '2021-01-13', 'Wednesday', 9);
INSERT INTO "user_appointment" ("user_id", "barber_id", "date", "dotw", "time")
VALUES (6, 3, '2021-01-13', 'Wednesday', 9);
INSERT INTO "user_appointment" ("user_id", "barber_id", "date", "dotw", "time")
VALUES (4, 2, '2021-01-13', 'Wednesday', 9);

-- Each of these are done 3 times for each day of the week
-- in order to create one available slot for each of the 3
-- barbers for each day of the week
INSERT INTO appointment_slots ("dotw", "start_time", "end_time")
VALUES ('Friday', 9, 10);

INSERT INTO appointment_slots ("dotw", "start_time", "end_time")
VALUES ('Friday', 10, 11);

INSERT INTO appointment_slots ("dotw", "start_time", "end_time")
VALUES ('Friday', 11, 12);

INSERT INTO appointment_slots ("dotw", "start_time", "end_time")
VALUES ('Friday', 12, 1);

INSERT INTO appointment_slots ("dotw", "start_time", "end_time")
VALUES ('Friday', 1, 2);

INSERT INTO appointment_slots ("dotw", "start_time", "end_time")
VALUES ('Friday', 2, 3);

INSERT INTO appointment_slots ("dotw", "start_time", "end_time")
VALUES ('Friday', 3, 4);

INSERT INTO appointment_slots ("dotw", "start_time", "end_time")
VALUES ('Friday', 4, 5);