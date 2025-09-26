/*
  # Update authentication for OAuth support

  1. Updates
    - Add OAuth provider support to profiles table
    - Update RLS policies to handle OAuth users
    - Add avatar_url field for Google profile pictures

  2. Security
    - Maintain existing RLS policies
    - Add support for OAuth-based user creation
*/

-- Add avatar_url column for profile pictures from OAuth providers
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_url text;
  END IF;
END $$;

-- Update the handle_new_user function to support OAuth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;