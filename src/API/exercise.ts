import { supabase } from '../supabaseClient';

export const ExerciseAPI = {
  async create(trainingId: number, name: string) {
    const { data, error } = await supabase
      .from('exercises')
      .insert({
        training_id: trainingId,
        name
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getByTraining(trainingId: number) {
    const { data, error } = await supabase
      .from('exercises')
      .select(`
      id,
      name,
      sets (
        id,
        reps,
        weight
      )
    `)
      .eq('training_id', trainingId);

    if (error) throw error;

    return data;
  },

  async remove(id: number) {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
