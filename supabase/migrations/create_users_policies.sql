-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy for inserting users (during registration)
CREATE POLICY "Users can insert their own profile"
ON users FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Policy for selecting users (public profiles)
CREATE POLICY "Anyone can view user profiles"
ON users FOR SELECT
USING (true);

-- Policy for updating users
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id
  AND (
    -- Can't update email or id
    NEW.id = OLD.id
    AND NEW.email = OLD.email
    -- Other fields can be updated
    AND NEW.full_name IS NOT NULL
    AND NEW.phone_number IS NOT NULL
    AND NEW.location IS NOT NULL
  )
);

-- Policy for deleting users
CREATE POLICY "Users can delete own profile"
ON users FOR DELETE
USING (auth.uid() = id); 