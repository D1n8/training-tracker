import { supabase } from "../supabaseClient";

export const TrainingAPI = {
  async start() {
    const { data, error } = await supabase
      .from('trainings')
      .insert({ date: Date.now() })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('trainings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

