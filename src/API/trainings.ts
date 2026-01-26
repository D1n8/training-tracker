import { supabase } from '../supabaseClient';
import type { ITraining, TrainingPageResponse } from '../pages/TrainingPage/TrainingPage.types';
import type { ITrainingFull } from '../modules/types';

export const TrainingAPI = {

  async getFullTraining(trainingId: number) {
    const { data, error } = await supabase
      .from('trainings')
      .select(`
    id,
    date,
    is_active,
    total_duration_seconds,

    training_exercises (
      id,
      order_index,

      exercises (
        id,
        name,
        muscle_group
      ),

      sets (
        id,
        set_number,
        reps,
        weight
      )
    )
  `)
      .eq('id', trainingId)
      .single();
    if (error) throw error;
    return data as ITrainingFull;

  },
  /* ───────────────
   * START / FINISH
   * ─────────────── */

  // ▶️ Начать тренировку (через RPC)
  async start(): Promise<ITraining> {
    const { data, error } = await supabase.rpc('start_training');
    if (error) throw error;
    return data as ITraining;
  },

  // ⏹ Завершить тренировку
  async finish(
    trainingId: string,
    totalDurationSeconds: number
  ): Promise<ITraining> {
    const { data, error } = await supabase.rpc('finish_training', {
      p_training_id: trainingId,
      p_total_duration_seconds: totalDurationSeconds
    });

    if (error) throw error;
    return data as ITraining;
  },

  /* ───────────────
   * GETTERS
   * ─────────────── */

  // 🟢 Получить текущую активную тренировку
  async getCurrent(): Promise<ITraining | null> {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data as ITraining | null;
  },

  // 🕒 Получить последнюю завершённую тренировку
  async getLatestCompleted(): Promise<ITraining | null> {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('is_active', false)
      .order('date', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data as ITraining | null;
  },

  // 🧠 Для страницы "Тренировка"
  async getForTrainingPage(): Promise<TrainingPageResponse> {
    const current = await this.getCurrent();
    if (current) {
      return { type: 'current', training: current };
    }

    const latest = await this.getLatestCompleted();
    return { type: 'latest', training: latest };
  },

  // 📚 Все тренировки (история)
  async getAll(): Promise<ITraining[]> {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data as ITraining[];
  },

  /* ───────────────
   * MUTATIONS
   * ─────────────── */

  // 🗑 Удалить тренировку (например, из истории)
  async delete(trainingId: string): Promise<void> {
    const { error } = await supabase
      .from('trainings')
      .delete()
      .eq('id', trainingId);

    if (error) throw error;
  }
};
