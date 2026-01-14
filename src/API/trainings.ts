import { supabase } from "../supabaseClient";

export const TrainingAPI = {
  async create(date: number) {
    const { data, error } = await supabase
      .from('trainings')
      .insert({ date })
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
  }
};
