import { Tables } from '@/database.types';

export interface SafetyData {
  id: string;
  state_code: string;
  state_name: string;
  safety_percentage: number;
  metrics: {
    crime: number | null;
    police: number | null;
    road: number | null;
    health: number | null;
    emergency: number | null;
    disaster: number | null;
    women: number | null;
  };
  data_source_url: string | null;
  recorded_at: string | null;
}

export interface StateDetail {
  state: {
    id: string;
    code: string;
    name: string;
  };
  safety_percentage: number;
  metrics: {
    crime: number | null;
    police: number | null;
    road: number | null;
    health: number | null;
    emergency: number | null;
    disaster: number | null;
    women: number | null;
  };
  data_source_url: string | null;
  recorded_at: string | null;
  trend: Array<{
    year: number;
    value: number | null;
  }>;
}

export interface CompareData {
  name: string;
  metrics: {
    crime: number;
    police: number;
    road: number;
    health: number;
    emergency: number;
    disaster: number;
    women: number;
  };
  safety_percentage: number;
  state_code: string;
}

export interface State {
  id: string;
  code: string;
  name: string;
}

export interface DataUpload {
  id: string;
  filename: string;
  file_type: string;
  source_url: string | null;
  status: string | null;
  error_message: string | null;
  created_at: string | null;
  updated_at: string | null;
}

class SafetyService {
  private baseUrl = '/api';

  async getAllSafetyData(): Promise<{ data: SafetyData[]; total: number }> {
    const response = await fetch(`${this.baseUrl}/safety`);
    if (!response.ok) {
      throw new Error('Failed to fetch safety data');
    }
    return response.json();
  }

  async getStateSafetyData(stateCode: string): Promise<{ data: StateDetail }> {
    const response = await fetch(`${this.baseUrl}/safety/${stateCode}`);
    if (!response.ok) {
      throw new Error('Failed to fetch state safety data');
    }
    return response.json();
  }

  async compareStates(stateCodes: string[]): Promise<{ data: CompareData[]; total: number }> {
    const codesParam = stateCodes.join(',');
    const response = await fetch(`${this.baseUrl}/safety/compare?codes=${codesParam}`);
    if (!response.ok) {
      throw new Error('Failed to compare states');
    }
    return response.json();
  }

  async getAllStates(): Promise<{ data: State[]; total: number }> {
    const response = await fetch(`${this.baseUrl}/states`);
    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }
    return response.json();
  }

  async createSafetyMetrics(data: {
    state_id: string;
    recorded_at: string;
    safety_percentage: number;
    crime_rate?: number;
    police_per_capita?: number;
    road_safety?: number;
    healthcare_access?: number;
    emergency_response?: number;
    disaster_risk?: number;
    womens_safety?: number;
    data_source_url?: string;
  }): Promise<{ data: Tables<'safety_metrics'> }> {
    const response = await fetch(`${this.baseUrl}/safety`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create safety metrics');
    }
    return response.json();
  }

  async updateStateSafetyData(stateCode: string, data: {
    recorded_at?: string;
    safety_percentage: number;
    crime_rate?: number;
    police_per_capita?: number;
    road_safety?: number;
    healthcare_access?: number;
    emergency_response?: number;
    disaster_risk?: number;
    womens_safety?: number;
    data_source_url?: string;
  }): Promise<{ data: Tables<'safety_metrics'> }> {
    const response = await fetch(`${this.baseUrl}/safety/${stateCode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update state safety data');
    }
    return response.json();
  }

  async getUploads(): Promise<{ data: DataUpload[]; total: number }> {
    const response = await fetch(`${this.baseUrl}/uploads`);
    if (!response.ok) {
      throw new Error('Failed to fetch uploads');
    }
    return response.json();
  }

  async createUpload(data: {
    filename: string;
    file_type: string;
    source_url?: string;
  }): Promise<{ data: DataUpload }> {
    const response = await fetch(`${this.baseUrl}/uploads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create upload');
    }
    return response.json();
  }
}

export const safetyService = new SafetyService();
