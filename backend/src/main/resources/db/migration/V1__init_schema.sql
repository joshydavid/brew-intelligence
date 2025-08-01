CREATE TABLE user_profile (
    user_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO user_profile (user_id, name) VALUES
('1344041768141000706', 'Tim Cook'),
('1344041768141000707', 'Steve Jobs'),
('1344041768141000708', 'Charlie Brown');

CREATE TABLE coffee_listing (
    listing_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coffee_name VARCHAR(255) NOT NULL,
    roast_type VARCHAR(50) NOT NULL,
    roast_date TIMESTAMP NOT NULL,
    weight_in_kg INT NOT NULL,
    brew_method VARCHAR(50) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);

WITH user_cte AS (
    SELECT name, user_id
    FROM user_profile
    WHERE name IN ('Joshua David', 'Joshy Davidson', 'Charlie Brown')
)
INSERT INTO coffee_listing (coffee_name, roast_type, roast_date, weight_in_kg, brew_method, user_id)
SELECT 'Ethiopia Yirgacheffe', 'LIGHT', NOW(), 0.5, 'V60', u.user_id FROM user_cte u WHERE u.name = 'Joshua David'
UNION ALL
SELECT 'Kenya AA', 'MEDIUM', NOW(), 0.25, 'ESPRESSO', u.user_id FROM user_cte u WHERE u.name = 'Joshua David'
UNION ALL
SELECT 'Colombian Supremo', 'DARK', NOW(), 0.75, 'V60', u.user_id FROM user_cte u WHERE u.name = 'Joshy Davidson'
UNION ALL
SELECT 'Sumatra Mandheling', 'DARK', NOW(), 1.0, 'ESPRESSO', u.user_id FROM user_cte u WHERE u.name = 'Joshy Davidson'
UNION ALL
SELECT 'Brazilian Santos', 'MEDIUM', NOW(), 0.3, 'V60', u.user_id FROM user_cte u WHERE u.name = 'Charlie Brown'
UNION ALL
SELECT 'Guatemalan Antigua', 'LIGHT', NOW(), 0.6, 'ESPRESSO', u.user_id FROM user_cte u WHERE u.name = 'Charlie Brown'
UNION ALL
SELECT 'Jamaican Blue Mountain', 'LIGHT', NOW(), 0.4, 'V60', u.user_id FROM user_cte u WHERE u.name = 'Joshua David'
UNION ALL
SELECT 'Costa Rican Tarrazu', 'MEDIUM', NOW(), 0.5, 'ESPRESSO', u.user_id FROM user_cte u WHERE u.name = 'Joshy Davidson'
UNION ALL
SELECT 'Panama Geisha', 'LIGHT', NOW(), 0.2, 'V60', u.user_id FROM user_cte u WHERE u.name = 'Charlie Brown'
UNION ALL
SELECT 'Hawaiian Kona', 'MEDIUM', NOW(), 0.8, 'ESPRESSO', u.user_id FROM user_cte u WHERE u.name = 'Joshy Davidson'
UNION ALL
SELECT 'Mexican Chiapas', 'DARK', NOW(), 0.6, 'V60', u.user_id FROM user_cte u WHERE u.name = 'Joshua David';

CREATE TABLE recipe (
    recipe_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    method_type VARCHAR(50) NOT NULL,
    coffee_dose DOUBLE PRECISION NOT NULL,
    water_amount DOUBLE PRECISION NOT NULL,
    brew_temp INT NOT NULL,
    brew_time VARCHAR(50) NOT NULL,
    brew_instructions TEXT[],
    created_by VARCHAR(50) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES user_profile(user_id)
);

WITH user_cte AS (
    SELECT user_id, name
    FROM user_profile
    WHERE name IN ('Tim Cook', 'Steve Jobs', 'Charlie Brown')
)
INSERT INTO recipe (
    method_type, coffee_dose, water_amount, brew_temp, brew_time, brew_instructions, created_by, user_id
)
SELECT 'ICED', 15.0, 250.0, 93, '2:30',
       ARRAY['Grind coffee', 'Rinse filter', 'Pour in circles'], 'James Hoffman', u.user_id
FROM user_cte u WHERE u.name = 'Tim Cook'
UNION ALL
SELECT 'HOT', 18.0, 36.0, 92, '0:30',
       ARRAY['Tamp coffee', 'Extract under pressure'], 'Joshua David', u.user_id
FROM user_cte u WHERE u.name = 'Steve Jobs'
UNION ALL
SELECT 'ICED', 16.5, 300.0, 94, '3:00',
       ARRAY['Bloom for 30s', 'Pour in slow circles', 'Stir gently'], 'Charlie B.', u.user_id
FROM user_cte u WHERE u.name = 'Charlie Brown';
