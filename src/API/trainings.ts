import { supabase } from "../supabaseClient";

export const TrainingAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('is_active', false)
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async start() {
    const { data, error } = await supabase
      .from('trainings')
      .insert({
        date: Date.now(),
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCurrent() {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async finish(trainingId: number) {
    const { data, error } = await supabase
      .from('trainings')
      .update({
        is_active: false
      })
      .eq('id', trainingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
