DROP TABLE IF EXISTS WORKOUT_DATA;
DROP TABLE IF EXISTS WORKOUT;
DROP TABLE IF EXISTS SPORT_USER;
DROP TABLE IF EXISTS SPORT;
DROP TABLE IF EXISTS UNIVERSITY;

create TABLE SPORT_USER(
  userId SERIAL,
  name VARCHAR(255) NOT NULL,

  PRIMARY KEY (userId)
);

create TABLE SPORT(
  sportId SERIAL,
  name VARCHAR(255) NOT NULL,
  unit VARCHAR(255) NOT NULL,

  PRIMARY KEY (sportId)
);

create TABLE UNIVERSITY(
  uniId SERIAL,
  name VARCHAR(255) NOT NULL,

  PRIMARY KEY (uniId)
);

create TABLE WORKOUT (
  workoutId SERIAL,
  date DATE NOT NULL,
--  userId INT NOT NULL,
  userName VARCHAR(255) NOT NULL,
  uniId INT NOT NULL,

  PRIMARY KEY (workoutId),
--  FOREIGN KEY(userId) REFERENCES USER(userid),
  FOREIGN KEY(uniId) REFERENCES UNIVERSITY(uniId)
);

create TABLE WORKOUT_DATA(
  workoutDataId SERIAL,
  workoutId INT NOT NULL,
  sportId INT NOT NULL,
  amount INT NOT NULL,

  PRIMARY KEY (workoutDataId),
  FOREIGN KEY(workoutId) REFERENCES WORKOUT(workoutId) ON DELETE CASCADE,
  FOREIGN KEY(sportId) REFERENCES SPORT(sportId)
);

insert into SPORT ( name, unit ) values ('Push-Ups', '' );
insert into SPORT ( name, unit ) values ('Situps', '' );
insert into SPORT ( name, unit ) values ('Squats', '' );
insert into SPORT ( name, unit ) values ('Planking', 'sec' );

insert into UNIVERSITY(name) values ('Universität Klagenfurt');
insert into UNIVERSITY(name) values ('Donau-Universität Krems');
insert into UNIVERSITY(name) values ('Anton Bruckner Privatuniversität Linz');
insert into UNIVERSITY(name) values ('JKU Linz');
insert into UNIVERSITY(name) values ('KU Linz');
insert into UNIVERSITY(name) values ('Kunstuniversität Linz');
insert into UNIVERSITY(name) values ('PMU Salzburg');
insert into UNIVERSITY(name) values ('Universität Salzburg');
insert into UNIVERSITY(name) values ('Mozarteum');
insert into UNIVERSITY(name) values ('KFU Graz');
insert into UNIVERSITY(name) values ('Medizinische Universität Graz');
insert into UNIVERSITY(name) values ('Montanuniversität Leoben');
insert into UNIVERSITY(name) values ('TU Graz');
insert into UNIVERSITY(name) values ('Kunstuniversität Graz');
insert into UNIVERSITY(name) values ('LFU Innsbruck');
insert into UNIVERSITY(name) values ('Medizinische Universität Innsbruck');
insert into UNIVERSITY(name) values ('Tiroler Privatuniversität UMIT');
insert into UNIVERSITY(name) values ('Akademie der bildenden Künste Wien');
insert into UNIVERSITY(name) values ('CEU');
insert into UNIVERSITY(name) values ('Medizinische Universität Wien');
insert into UNIVERSITY(name) values ('MU Vienna');
insert into UNIVERSITY(name) values ('MUK Wien');
insert into UNIVERSITY(name) values ('SFU Wien');
insert into UNIVERSITY(name) values ('TU Wien');
insert into UNIVERSITY(name) values ('Angewandte Wien');
insert into UNIVERSITY(name) values ('BOKU Wien');
insert into UNIVERSITY(name) values ('MDW');
insert into UNIVERSITY(name) values ('Universität Wien');
insert into UNIVERSITY(name) values ('Vetmeduni Wien');
insert into UNIVERSITY(name) values ('WVPU Wien');
insert into UNIVERSITY(name) values ('WU Wien');
insert into UNIVERSITY(name) values ('FH Burgenland');
insert into UNIVERSITY(name) values ('FH Kärnten');
insert into UNIVERSITY(name) values ('IMC Fachhochschule Krems');
insert into UNIVERSITY(name) values ('FH St. Pölten');
insert into UNIVERSITY(name) values ('FH Wiener Neustadt');
insert into UNIVERSITY(name) values ('Theresianische Militärakademie');
insert into UNIVERSITY(name) values ('FH Oberösterreich');
insert into UNIVERSITY(name) values ('FH Salzburg');
insert into UNIVERSITY(name) values ('Campus 02');
insert into UNIVERSITY(name) values ('FH Joanneum');
insert into UNIVERSITY(name) values ('FH Kufstein');
insert into UNIVERSITY(name) values ('FH Gesundheit Tirol');
insert into UNIVERSITY(name) values ('MC Innsbruck');
insert into UNIVERSITY(name) values ('FH Vorarlberg');
insert into UNIVERSITY(name) values ('FH BFI Wien');
insert into UNIVERSITY(name) values ('FH Technikum Wien');
insert into UNIVERSITY(name) values ('FH Campus Wien');
insert into UNIVERSITY(name) values ('FH WKW Wien');
insert into UNIVERSITY(name) values ('KPH Wien');
insert into UNIVERSITY(name) values ('PH Wien');
insert into UNIVERSITY(name) values ('Other');
