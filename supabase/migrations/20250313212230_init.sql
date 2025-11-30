CREATE TABLE IF NOT EXISTS states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS safety_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id UUID REFERENCES states(id) ON DELETE CASCADE,
  recorded_at DATE NOT NULL,
  safety_percentage INTEGER,
  crime_rate INTEGER,
  police_per_capita INTEGER,
  road_safety INTEGER,
  healthcare_access INTEGER,
  emergency_response INTEGER,
  disaster_risk INTEGER,
  womens_safety INTEGER,
  data_source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS data_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL,
  source_url TEXT,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_states_code ON states(code);
CREATE INDEX IF NOT EXISTS idx_safety_metrics_state_id ON safety_metrics(state_id);
CREATE INDEX IF NOT EXISTS idx_safety_metrics_recorded_at ON safety_metrics(recorded_at);
CREATE INDEX IF NOT EXISTS idx_data_uploads_status ON data_uploads(status);
