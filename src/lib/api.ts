const BASE_URL = 'http://localhost:8000';

interface GenerationInput {
  type: 'video' | 'audio' | 'text';
  url?: string;
  provider?: {
    ElevenLabs: {
      name: string;
      voiceId: string;
      script: string;
    };
  };
}

interface CreateGenerationRequest {
  input: GenerationInput[];
  model: string;
  options?: {
    sync_mode?: string;
  };
}

interface GenerationResponse {
  id: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  created_at: string;
  model: string;
  output_url: string | null;
  output_duration?: number;
}

interface CostEstimateResponse {
  estimatedFrameCount: number;
  estimatedGenerationCost: number;
}

interface VoiceDetails {
  voice_id: string;
  name: string;
  category: string;
  description: string;
  preview_url: string;
  labels: {
    accent: string;
    gender: string;
    age: string;
  };
  settings: {
    stability: number;
    similarity_boost: number;
    use_speaker_boost: boolean;
  };
}

interface VoiceCloneResponse {
  voice_id: string;
  name: string;
  description: string | null;
}

interface UploadResponse {
  url: string;
}

export const api = {
  uploadVideo: async (videoFile: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', videoFile);

    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to upload video');
    }

    return response.json();
  },

  createGeneration: async (data: CreateGenerationRequest): Promise<GenerationResponse> => {
    const response = await fetch(`${BASE_URL}/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create generation');
    }

    return response.json();
  },

  getGenerationStatus: async (generationId: string): Promise<GenerationResponse> => {
    const response = await fetch(`${BASE_URL}/generations/${generationId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get generation status');
    }

    return response.json();
  },

  estimateCost: async (data: CreateGenerationRequest): Promise<CostEstimateResponse> => {
    const response = await fetch(`${BASE_URL}/generations/estimate-cost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to estimate cost');
    }

    return response.json();
  },

  getVoiceDetails: async (voiceId: string): Promise<VoiceDetails> => {
    const response = await fetch(`${BASE_URL}/voices/${voiceId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get voice details');
    }

    return response.json();
  },

  cloneVoice: async (name: string, audioFiles: File[]): Promise<VoiceCloneResponse> => {
    const formData = new FormData();
    formData.append('name', name);

    audioFiles.forEach((file) => {
      formData.append('files', file);
    });

    const response = await fetch(`${BASE_URL}/voice-cloning/ivc`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to clone voice');
    }

    return response.json();
  },

  pollGenerationStatus: async (
    generationId: string,
    onUpdate: (status: GenerationResponse) => void,
    interval = 5000
  ): Promise<GenerationResponse> => {
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const status = await api.getGenerationStatus(generationId);
          onUpdate(status);

          if (status.status === 'COMPLETED') {
            resolve(status);
          } else if (status.status === 'FAILED') {
            reject(new Error('Generation failed'));
          } else {
            setTimeout(poll, interval);
          }
        } catch (error) {
          reject(error);
        }
      };

      poll();
    });
  },
};

export type {
  GenerationInput,
  CreateGenerationRequest,
  GenerationResponse,
  CostEstimateResponse,
  VoiceDetails,
  VoiceCloneResponse,
  UploadResponse,
};
