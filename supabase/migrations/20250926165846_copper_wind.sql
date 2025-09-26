/*
  # Create credit requests table

  1. New Tables
    - `credit_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `use_case` (text, description of use case)
      - `service` (text, service needed)
      - `credits_needed` (text, amount of credits requested)
      - `status` (text, request status - pending, approved, rejected)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `credit_requests` table
    - Add policy for authenticated users to create their own requests
    - Add policy for authenticated users to read their own requests
*/

CREATE TABLE IF NOT EXISTS credit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  use_case text NOT NULL,
  service text NOT NULL,
  credits_needed text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE credit_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create own credit requests"
  ON credit_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own credit requests"
  ON credit_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credit requests"
  ON credit_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);