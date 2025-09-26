/*
  # Add credits column to profiles table

  1. Changes
    - Add `credits` column to `profiles` table with default value of 0
    - This will track user credits for AI processing

  2. Security
    - No changes to RLS policies needed
    - Existing policies will cover the new column
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'credits'
  ) THEN
    ALTER TABLE profiles ADD COLUMN credits integer DEFAULT 0;
  END IF;
END $$;