
CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR NOT NULL DEFAULT 'user'
);

CREATE TABLE appointments (
    id                SERIAL PRIMARY KEY,
    user_id           INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pet_name          VARCHAR NOT NULL,
    owner_name        VARCHAR NOT NULL,
    appointment_date  DATE NOT NULL,
    appointment_time  TIME NOT NULL,
    notes             TEXT,
    status            VARCHAR NOT NULL DEFAULT 'pending',
    created_at        TIMESTAMPTZ DEFAULT NOW() 
);

-- INSERT INTO appointments
-- (pet_name, owner_name, appointment_date, appointment_time, notes)
-- VALUES
-- ('Bella', 'John Smith', '2026-03-05', '09:00', 'Annual vaccination'),
-- ('Max', 'Emma Johnson', '2026-03-05', '10:30', 'Dental cleaning'),
-- ('Luna', 'Michael Brown', '2026-03-06', '11:00', 'Skin allergy check'),
-- ('Charlie', 'Olivia Davis', '2026-03-06', '14:00', 'Regular check-up'),
-- ('Lucy', 'William Wilson', '2026-03-07', '15:30', 'Post-surgery follow-up'),
-- ('Rocky', 'Sophia Martinez', '2026-03-08', '09:30', 'Limping on left paw'),
-- ('Milo', 'James Anderson', '2026-03-08', '13:00', 'Nail trimming'),
-- ('Daisy', 'Isabella Thomas', '2026-03-09', '10:00', 'Ear infection symptoms'),
-- ('Cooper', 'Benjamin Taylor', '2026-03-10', '16:00', 'Vaccination booster'),
-- ('Bailey', 'Mia Moore', '2026-03-11', '12:00', 'Weight management consultation');