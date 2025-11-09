-- ============================================================
-- PostgreSQL schema 
-- Author: Mushfiquer Rakit
-- ============================================================


-- ENUMS
CREATE TYPE role_enum AS ENUM ('EMPLOYEE', 'OWNER');

-- FUNCTION: Auto-update "updated_at" column on row update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- USERS TABLE (Admin / App Users)
-- ============================================================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  role role_enum DEFAULT 'EMPLOYEE',
  designation TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trigger_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();



-- ============================================================
-- CUSTOMERS
-- ============================================================

CREATE TABLE region (
  id SERIAL PRIMARY KEY,
  region TEXT NOT NULL UNIQUE,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INSTITUTION TYPE TABLE
CREATE TABLE institution_type (
  id SERIAL PRIMARY KEY,
  institution_type TEXT NOT NULL UNIQUE,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CUSTOMER TABLE
CREATE TABLE customer (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT NOT NULL,
  address TEXT,
  comment TEXT,
  region_id INT NOT NULL,
  institution_type_id INT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (region_id) REFERENCES region(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (institution_type_id) REFERENCES institution_type(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
);


CREATE TRIGGER trigger_customer_updated_at
BEFORE UPDATE ON customer
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();


-- ============================================================
-- PRODUCTS
-- ============================================================
-- CREATE TABLE product (
--   id SERIAL PRIMARY KEY,
--   type TEXT NOT NULL,
--   quantity INT,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- CREATE TRIGGER trigger_product_updated_at
-- BEFORE UPDATE ON product
-- FOR EACH ROW
-- EXECUTE PROCEDURE update_updated_at_column();


-- ============================================================
-- OUTREACH RECORDS
-- ============================================================
CREATE TABLE outreach (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customer(id) ON DELETE CASCADE,
  users_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- product_id INT REFERENCES product(id) ON DELETE SET NULL,
  initial_status TEXT NOT NULL,        -- Pending, Contacted, etc.
  delivery_status TEXT,                -- Delivered, Pending, etc.
  follow_up_date TIMESTAMPTZ,
  note TEXT,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trigger_outreach_updated_at
BEFORE UPDATE ON outreach
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();


-- ============================================================
-- COMMENTS
-- ============================================================
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  outreach_id INT NOT NULL REFERENCES outreach(id) ON DELETE CASCADE,
  users_id INT REFERENCES users(id) ON DELETE SET NULL,
  admin_comment TEXT,
  text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trigger_comment_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();


-- ============================================================
-- SITE SETTINGS 
-- ============================================================
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  site_name TEXT NOT NULL,
  site_number TEXT NOT NULL,
  site_title TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trigger_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();


-- ============================================================
-- ACTIVITY LOGS 
-- ============================================================
CREATE TABLE activity (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  action TEXT NOT NULL,
  target TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

