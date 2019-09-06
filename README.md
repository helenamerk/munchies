# munchies

## Creating the tables
```
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30),
  pass_hash VARCHAR(100)
);

CREATE TABLE registered_devices (
    ID SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(ID),
    push_token VARCHAR(100)
)

CREATE TABLE venues (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  lat INT,
  long INT
);

CREATE TABLE munch_groups (
  ID SERIAL PRIMARY KEY,
  scheduled_time VARCHAR(30),
  venue_id INTEGER REFERENCES venues(ID)
);

CREATE TABLE users_in_groups (
  group_id INTEGER REFERENCES munch_groups(ID),
  user_id INTEGER REFERENCES users(ID),
  creator BOOLEAN
);
```