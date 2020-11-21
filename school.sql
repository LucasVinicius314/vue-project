drop database if exists school;
create database school;
use school;

create table user (
  id int auto_increment primary key,
  name varchar(20) not null,
  email varchar(100) not null,
  password char(40) not null,
  type enum('student', 'teacher', 'admin') not null
) engine = InnoDB, charset=utf8;

create table class (
	id int auto_increment primary key,
  name varchar(20) not null,
  description varchar(100),
  user_id int, foreign key(user_id) references user(id)
) engine = InnoDB, charset=utf8;

insert into user (name, email, password, type) values
('John', 'john@gmail.com', sha1(1234), 'student');

insert into class (name, user_id) values
('Math', 1),
('Physics', 1),
('English', 1),
('Philosophy', 1),
('Computer Science', 1),
('Chemistry', 1);
