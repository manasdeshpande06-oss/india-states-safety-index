-- Insert sample states
INSERT INTO states (code, name) VALUES 
('MH', 'Maharashtra'),
('DL', 'Delhi'),
('KA', 'Karnataka'),
('TN', 'Tamil Nadu'),
('RJ', 'Rajasthan'),
('GJ', 'Gujarat'),
('UP', 'Uttar Pradesh'),
('WB', 'West Bengal'),
('MP', 'Madhya Pradesh'),
('BR', 'Bihar')
ON CONFLICT (code) DO NOTHING;

-- Insert sample safety metrics for 2023
INSERT INTO safety_metrics (state_id, recorded_at, safety_percentage, crime_rate, police_per_capita, road_safety, healthcare_access, emergency_response, disaster_risk, womens_safety, data_source_url)
SELECT 
  s.id,
  '2023-01-01'::DATE,
  CASE s.code 
    WHEN 'MH' THEN 72
    WHEN 'DL' THEN 54
    WHEN 'KA' THEN 68
    WHEN 'TN' THEN 75
    WHEN 'RJ' THEN 61
    WHEN 'GJ' THEN 80
    WHEN 'UP' THEN 58
    WHEN 'WB' THEN 65
    WHEN 'MP' THEN 63
    WHEN 'BR' THEN 56
  END,
  CASE s.code 
    WHEN 'MH' THEN 62
    WHEN 'DL' THEN 50
    WHEN 'KA' THEN 65
    WHEN 'TN' THEN 70
    WHEN 'RJ' THEN 58
    WHEN 'GJ' THEN 75
    WHEN 'UP' THEN 55
    WHEN 'WB' THEN 62
    WHEN 'MP' THEN 60
    WHEN 'BR' THEN 52
  END,
  CASE s.code 
    WHEN 'MH' THEN 70
    WHEN 'DL' THEN 68
    WHEN 'KA' THEN 72
    WHEN 'TN' THEN 75
    WHEN 'RJ' THEN 65
    WHEN 'GJ' THEN 74
    WHEN 'UP' THEN 66
    WHEN 'WB' THEN 70
    WHEN 'MP' THEN 68
    WHEN 'BR' THEN 62
  END,
  CASE s.code 
    WHEN 'MH' THEN 66
    WHEN 'DL' THEN 60
    WHEN 'KA' THEN 68
    WHEN 'TN' THEN 72
    WHEN 'RJ' THEN 62
    WHEN 'GJ' THEN 71
    WHEN 'UP' THEN 64
    WHEN 'WB' THEN 68
    WHEN 'MP' THEN 66
    WHEN 'BR' THEN 58
  END,
  CASE s.code 
    WHEN 'MH' THEN 72
    WHEN 'DL' THEN 70
    WHEN 'KA' THEN 70
    WHEN 'TN' THEN 78
    WHEN 'RJ' THEN 68
    WHEN 'GJ' THEN 78
    WHEN 'UP' THEN 68
    WHEN 'WB' THEN 72
    WHEN 'MP' THEN 70
    WHEN 'BR' THEN 64
  END,
  CASE s.code 
    WHEN 'MH' THEN 58
    WHEN 'DL' THEN 55
    WHEN 'KA' THEN 60
    WHEN 'TN' THEN 65
    WHEN 'RJ' THEN 56
    WHEN 'GJ' THEN 65
    WHEN 'UP' THEN 54
    WHEN 'WB' THEN 60
    WHEN 'MP' THEN 58
    WHEN 'BR' THEN 52
  END,
  CASE s.code 
    WHEN 'MH' THEN 64
    WHEN 'DL' THEN 60
    WHEN 'KA' THEN 66
    WHEN 'TN' THEN 70
    WHEN 'RJ' THEN 62
    WHEN 'GJ' THEN 70
    WHEN 'UP' THEN 60
    WHEN 'WB' THEN 66
    WHEN 'MP' THEN 64
    WHEN 'BR' THEN 56
  END,
  CASE s.code 
    WHEN 'MH' THEN 60
    WHEN 'DL' THEN 52
    WHEN 'KA' THEN 64
    WHEN 'TN' THEN 68
    WHEN 'RJ' THEN 58
    WHEN 'GJ' THEN 68
    WHEN 'UP' THEN 56
    WHEN 'WB' THEN 62
    WHEN 'MP' THEN 60
    WHEN 'BR' THEN 54
  END,
  'https://example.com/data-source'
FROM states s
WHERE s.code IN ('MH', 'DL', 'KA', 'TN', 'RJ', 'GJ', 'UP', 'WB', 'MP', 'BR')
ON CONFLICT DO NOTHING;

-- Insert historical data for trends (2019-2023)
INSERT INTO safety_metrics (state_id, recorded_at, safety_percentage)
SELECT 
  s.id,
  year::DATE,
  CASE s.code 
    WHEN 'MH' THEN 62 + (year - 2019) * 2.5
    WHEN 'DL' THEN 48 + (year - 2019) * 1.5
    WHEN 'KA' THEN 60 + (year - 2019) * 2
    WHEN 'TN' THEN 67 + (year - 2019) * 2
    WHEN 'RJ' THEN 55 + (year - 2019) * 1.5
    WHEN 'GJ' THEN 72 + (year - 2019) * 2
    WHEN 'UP' THEN 50 + (year - 2019) * 2
    WHEN 'WB' THEN 57 + (year - 2019) * 2
    WHEN 'MP' THEN 55 + (year - 2019) * 2
    WHEN 'BR' THEN 48 + (year - 2019) * 2
  END
FROM states s, generate_series(2019, 2023) year
WHERE s.code IN ('MH', 'DL', 'KA', 'TN', 'RJ', 'GJ', 'UP', 'WB', 'MP', 'BR')
ON CONFLICT DO NOTHING;
