CREATE TABLE coffee_listing (
    listing_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    coffee_name VARCHAR(255) NOT NULL,
    roast_type VARCHAR(50) NOT NULL,
    roast_date TIMESTAMP NOT NULL,
    weight_in_kg INT NOT NULL,
    brew_method VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO coffee_listing (coffee_name, roast_type, roast_date, weight_in_kg, brew_method)
VALUES
('Ethiopia Yirgacheffe', 'LIGHT', NOW(), 0.5, 'V60'),
('Kenya AA', 'MEDIUM', NOW(), 0.25, 'ESPRESSO'),
('Colombian Supremo', 'DARK', NOW(), 0.75, 'V60'),
('Sumatra Mandheling', 'DARK', NOW(), 1.0, 'ESPRESSO'),
('Brazilian Santos', 'MEDIUM', NOW(), 0.3, 'V60'),
('Guatemalan Antigua', 'LIGHT', NOW(), 0.6, 'ESPRESSO'),
('Jamaican Blue Mountain', 'LIGHT', NOW(), 0.4, 'V60'),
('Costa Rican Tarrazu', 'MEDIUM', NOW(), 0.5, 'ESPRESSO'),
('Panama Geisha', 'LIGHT', NOW(), 0.2, 'V60'),
('Hawaiian Kona', 'MEDIUM', NOW(), 0.8, 'ESPRESSO'),
('Mexican Chiapas', 'DARK', NOW(), 0.6, 'V60');

CREATE TABLE recipe (
    recipe_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    method_type VARCHAR(50) NOT NULL,
    coffee_dose DOUBLE PRECISION NOT NULL,
    water_amount DOUBLE PRECISION NOT NULL,
    brew_temp INT NOT NULL,
    brew_time VARCHAR(50) NOT NULL,
    brew_instructions text[],
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO recipe (
    method_type, coffee_dose, water_amount, brew_temp, brew_time, brew_instructions, created_by
)
VALUES
(
    'ICED', 15.0, 250.0, 93, '2:30',
    ARRAY['Grind coffee', 'Rinse filter', 'Pour in circles'], 'James Hoffman'
),
(
    'HOT', 18.0, 36.0, 92, '0:30',
    ARRAY['Tamp coffee', 'Extract under pressure'], 'Joshua David'
);
