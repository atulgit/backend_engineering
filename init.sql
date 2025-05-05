-- init.sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

INSERT INTO users (user_id, name) VALUES
  (1, 'atul@example.com'),
  (2, 'priya@example.com'),
  (3, 'rahul@example.com');