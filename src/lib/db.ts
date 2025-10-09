import { supabase } from './supabase';

export interface VoiceClone {
  id: string;
  user_id: string;
  voice_id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  generation_id: string;
  voice_clone_id: string | null;
  video_url: string;
  script: string;
  model: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  output_url: string | null;
  output_duration: number | null;
  estimated_cost: number | null;
  service_type: 'personality-clone' | 'lip-sync' | 'dubbing' | 'custom';
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export const db = {
  voiceClones: {
    getAll: async (userId: string): Promise<VoiceClone[]> => {
      const { data, error } = await supabase
        .from('voice_clones')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    getActive: async (userId: string): Promise<VoiceClone | null> => {
      const { data, error } = await supabase
        .from('voice_clones')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    create: async (voiceClone: Omit<VoiceClone, 'id' | 'created_at' | 'updated_at'>): Promise<VoiceClone> => {
      const { data, error } = await supabase
        .from('voice_clones')
        .insert(voiceClone)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    setActive: async (id: string, userId: string): Promise<void> => {
      await supabase
        .from('voice_clones')
        .update({ is_active: false })
        .eq('user_id', userId);

      const { error } = await supabase
        .from('voice_clones')
        .update({ is_active: true })
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;
    },

    delete: async (id: string, userId: string): Promise<void> => {
      const { error } = await supabase
        .from('voice_clones')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;
    },
  },

  generations: {
    create: async (generation: Omit<Generation, 'id' | 'created_at' | 'updated_at'>): Promise<Generation> => {
      const { data, error } = await supabase
        .from('generations')
        .insert(generation)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id: string, updates: Partial<Generation>): Promise<Generation> => {
      const { data, error } = await supabase
        .from('generations')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    getByGenerationId: async (generationId: string): Promise<Generation | null> => {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('generation_id', generationId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    getAll: async (userId: string, serviceType?: string): Promise<Generation[]> => {
      let query = supabase
        .from('generations')
        .select('*')
        .eq('user_id', userId);

      if (serviceType) {
        query = query.eq('service_type', serviceType);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  },
};
