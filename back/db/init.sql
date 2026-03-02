CREATE TABLE appointments (
    id                SERIAL PRIMARY KEY,
    pet_name          VARCHAR NOT NULL,
    owner_name        VARCHAR NOT NULL,
    appointment_date  DATE NOT NULL,
    appointment_time  TIME NOT NULL,
    notes             TEXT,
    created_at        TIMESTAMPTZ DEFAULT NOW() 
);

CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR NOT NULL DEFAULT 'user'
);