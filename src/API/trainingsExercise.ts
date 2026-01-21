import { supabase } from "../supabaseClient";

export const TrainingExerciseAPI = {
  async add(trainingId: string, exerciseId: string, order_index: number) {
    const { data, error } = await supabase
      .from('training_exercises')
      .insert({
        training_id: trainingId,
        exercise_id: exerciseId,
        order_index
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getByTraining(trainingId: string) {
    const { data, error } = await supabase
      .from('training_exercises')
      .select(`
        id,
        order_index,
        exercises ( id, name )
      `)
      .eq('training_id', trainingId)
      .order('order_index');

    if (error) throw error;
    return data;
  }
};
