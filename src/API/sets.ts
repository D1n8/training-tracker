import { supabase } from '../supabaseClient';

export const SetAPI = {
  async add(exerciseId: number, reps: number, weight?: number) {
    const { data, error } = await supabase
      .from('sets')
      .insert({
        exercise_id: exerciseId,
        reps,
        weight
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getByExercise(exerciseId: number) {
    const { data, error } = await supabase
      .from('sets')
      .select('*')
      .eq('exercise_id', exerciseId);

    if (error) throw error;
    return data;
  },

  async remove(id: number) {
    const { error } = await supabase
      .from('sets')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
