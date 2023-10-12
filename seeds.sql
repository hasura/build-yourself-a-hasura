insert into users (id, name) values (1, 'Alice'), (2, 'Bob'), (3, 'Carol');

insert into posts (id, user_id, title, body) values
(1, 1, 't1', 'b1'),
(2, 1, 't2', 'b2'),
(3, 1, 't3', 'b3'),
(4, 2, 't4', 'b4'),
(5, 2, 't5', 'b5'),
(6, 3, 't6', 'b6');