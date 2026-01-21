import { supabase } from '../supabaseClient';

export const ExerciseAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async create(name: string, muscle_group?: string) {
    const { data, error } = await supabase
      .from('exercises')
      .insert({ name, muscle_group })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, payload: Partial<{ name: string; muscle_group: string }>) {
    const { data, error } = await supabase
      .from('exercises')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
