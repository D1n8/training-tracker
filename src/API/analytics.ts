import { supabase } from "../supabaseClient";

export const AnalyticsAPI = {
    async getWeightProgress(exerciseId: string) {
        const { data, error } = await supabase
            .from('sets')
            .select(`
      weight,
      training_exercises (
        exercise_id,
        trainings ( date )
      )
    `)
            .eq('training_exercises.exercise_id', exerciseId)
            .order('created_at');

        if (error) throw error;
        return data;
    },

    async getVolumeByExercise(exerciseId: string, from: number, to: number) {
        const { data, error } = await supabase
            .from('sets')
            .select(`
      reps,
      weight,
      training_exercises (
        trainings ( date )
      )
    `)
            .gte('training_exercises.trainings.date', from)
            .lte('training_exercises.trainings.date', to)
            .eq('training_exercises.exercise_id', exerciseId);

        if (error) throw error;

        return data.reduce(
            (sum, s) => sum + (s.reps ?? 0) * (s.weight ?? 0),
            0
        );
    }

}