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

insert into UNIVERSITY(name) values ('TU Wien');
insert into UNIVERSITY(name) values ('WU');
insert into UNIVERSITY(name) values ('BOKU');
insert into UNIVERSITY(name) values ('Uni Wien');
insert into UNIVERSITY(name) values ('FH Technikum');
insert into UNIVERSITY(name) values ('FH WKW');
insert into UNIVERSITY(name) values ('FH BFI');
insert into UNIVERSITY(name) values ('Uni Graz');
insert into UNIVERSITY(name) values ('TU Graz');
insert into UNIVERSITY(name) values ('Uni Salzburg');
insert into UNIVERSITY(name) values ('MCI Innsbruck');
