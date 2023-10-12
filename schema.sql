create table users (
  id serial primary key,
  name text
);

create table posts (
  id serial primary key,
  user_id integer references users(id),
  title text,
  body text
);