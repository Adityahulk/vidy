/*
  # Add Voice Clones and Generations Tables

  1. New Tables
    - `voice_clones`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `voice_id` (text) - ElevenLabs voice ID
      - `name` (text) - Voice clone name
      - `description` (text, nullable) - Optional description
      - `is_active` (boolean) - Whether this is the user's active voice
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `generations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `generation_id` (text) - ID from the generation API
      - `voice_clone_id` (uuid, foreign key to voice_clones, nullable)
      - `video_url` (text) - Input video URL
      - `script` (text) - Text script for TTS
      - `model` (text) - Model used (e.g., "sync-2")
      - `status` (text) - PENDING, PROCESSING, COMPLETED, FAILED
      - `output_url` (text, nullable) - Generated video URL
      - `output_duration` (numeric, nullable) - Duration in seconds
      - `estimated_cost` (numeric, nullable) - Estimated cost
      - `service_type` (text) - personality-clone, lip-sync, etc.
      - `metadata` (jsonb, nullable) - Additional metadata
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Users can only access their own voice clones
    - Users can only access their own generations
*/

CREATE TABLE IF NOT EXISTS voice_clones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  voice_id text NOT NULL,
  name text NOT NULL,
  description text,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  generation_id text NOT NULL,
  voice_clone_id uuid REFERENCES voice_clones(id) ON DELETE SET NULL,
  video_url text NOT NULL,
  script text NOT NULL,
  model text DEFAULT 'sync-2',
  status text DEFAULT 'PENDING',
  output_url text,
  output_duration numeric,
  estimated_cost numeric,
  service_type text NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT status_check CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
  CONSTRAINT service_type_check CHECK (service_type IN ('personality-clone', 'lip-sync', 'dubbing', 'custom'))
);

ALTER TABLE voice_clones ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own voice clones"
  ON voice_clones FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own voice clones"
  ON voice_clones FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own voice clones"
  ON voice_clones FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own voice clones"
  ON voice_clones FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own generations"
  ON generations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations"
  ON generations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generations"
  ON generations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own generations"
  ON generations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_voice_clones_user_id ON voice_clones(user_id);
CREATE INDEX IF NOT EXISTS idx_voice_clones_is_active ON voice_clones(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_status ON generations(user_id, status);
CREATE INDEX IF NOT EXISTS idx_generations_generation_id ON generations(generation_id);
