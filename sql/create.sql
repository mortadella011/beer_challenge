create USER 'esn' IDENTIFIED BY 'esn_corona_2020';
GRANT all on esn_corona.* to 'esn';
ALTER USER esn IDENTIFIED WITH mysql_native_password BY 'esn_corona_2020';

DROP TABLE WORKOUT_DATA;
DROP TABLE WORKOUT;
DROP TABLE USER;
DROP TABLE SPORT;
DROP TABLE UNIVERSITY;

create TABLE USER(
  userId INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,

  PRIMARY KEY (userId)
);

create TABLE SPORT(
  sportId INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  unit VARCHAR(255) NOT NULL,

  PRIMARY KEY (sportId)
);

create TABLE UNIVERSITY(
  uniId INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,

  PRIMARY KEY (uniId)
);

create TABLE WORKOUT (
  workoutId INT AUTO_INCREMENT,
  date DATE NOT NULL,
--  userId INT NOT NULL,
  userName VARCHAR(255) NOT NULL,
  uniId INT NOT NULL,

  PRIMARY KEY (workoutId),
--  FOREIGN KEY(userId) REFERENCES USER(userid),
  FOREIGN KEY(uniId) REFERENCES UNIVERSITY(uniId)
);

create TABLE WORKOUT_DATA(
  workoutDataId INT AUTO_INCREMENT,
  workoutId INT NOT NULL,
  sportId INT NOT NULL,
  amount INT NOT NULL,

  PRIMARY KEY (workoutDataId),
  FOREIGN KEY(workoutId) REFERENCES WORKOUT(workoutId),
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
