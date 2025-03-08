/*
  # Create medicines table and related schemas

  1. New Tables
    - `medicines`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `brand` (text, not null)
      - `category` (text, not null)
      - `price` (numeric, not null)
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `medicines` table
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS medicines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON medicines
  FOR SELECT
  TO public
  USING (true);