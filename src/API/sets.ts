import { supabase } from '../supabaseClient';

export const SetAPI = {
  async add(trainingExerciseId: string, reps: number, weight: number) {
    const { data, error } = await supabase
      .from('sets')
      .insert({
        training_exercise_id: trainingExerciseId,
        reps,
        weight
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('sets')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
