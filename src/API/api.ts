/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../supabaseClient'; 
import type { Training, Exercise } from '../modules/types';

/**
 * ГЛАВНАЯ ФУНКЦИЯ ДЛЯ СТРАНИЦЫ "ТРЕНИРОВКА"
 * Получает либо текущую активную, либо последнюю завершенную тренировку.
 * Загружает всё дерево: Тренировка -> Упражнения тренировки -> Сеты + Детали упражнения
 */
export const getDashboardWorkout = async (): Promise<Training | null> => {
  const selectQuery = `
    *,
    training_exercises (
      *,
      exercises (*),
      sets (*)
    )
  `;

  // 1. Пробуем найти активную
  const { data: activeData, error: activeError } = await supabase
    .from('trainings')
    .select(selectQuery)
    .eq('is_active', true)
    .maybeSingle();

  if (activeError) throw activeError;
  if (activeData) return sortTrainingData(activeData);

  // 2. Если активной нет, ищем последнюю завершенную
  const { data: lastData, error: lastError } = await supabase
    .from('trainings')
    .select(selectQuery)
    .eq('is_active', false)
    .order('date', { ascending: false }) // Сортируем по дате тренировки
    .order('created_at', { ascending: false }) // На случай, если даты совпадают
    .limit(1)
    .maybeSingle();

  if (lastError) throw lastError;
  return lastData ? sortTrainingData(lastData) : null;
};

// Вспомогательная функция для сортировки (Supabase возвращает массивы не всегда в нужном порядке)
const sortTrainingData = (training: any): Training => {
  // Сортируем упражнения по order_index (или дате создания)
  if (training.training_exercises) {
    training.training_exercises.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0));
    
    // Сортируем сеты внутри упражнений по set_number
    training.training_exercises.forEach((te: any) => {
      if (te.sets) {
        te.sets.sort((a: any, b: any) => a.set_number - b.set_number);
      }
    });
  }
  return training;
};


// получить все тренировки для аналитики

export const getAllCompletedTrainings = async (): Promise<Training[]> => {
  const selectQuery = `
    *,
    training_exercises (
      *,
      exercises (*),
      sets (*)
    )
  `;

  const { data, error } = await supabase
    .from('trainings')
    .select(selectQuery)
    .eq('is_active', false) // Только завершенные
    .order('date', { ascending: false }) // Сначала новые
    .order('created_at', { ascending: false }); // Если даты совпадают

  if (error) throw error;

  // Применяем вашу функцию сортировки к каждой тренировке в массиве
  return data ? data.map(sortTrainingData) : [];
};

// --- УПРАВЛЕНИЕ ТРЕНИРОВКОЙ ---

export const startWorkout = async () => {
  const { data, error } = await supabase
    .from('trainings')
    .insert({
      date: new Date().toISOString(),
      is_active: true,
      total_duration_seconds: 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const finishWorkout = async (trainingId: string, durationSeconds: number) => {
  const { data, error } = await supabase
    .from('trainings')
    .update({
      is_active: false,
      total_duration_seconds: durationSeconds
    })
    .eq('id', trainingId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// --- СПРАВОЧНИКИ ---

export const getAllExercises = async (): Promise<Exercise[]> => {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data || [];
};

// добавление упражнения в тренировку

export const addExerciseToTraining = async (trainingId: string, exerciseId: string) => {
  const { data, error } = await supabase
    .from('training_exercises')
    .insert({
      training_id: trainingId,
      exercise_id: exerciseId
    })
    .select('*, exercises(*), sets(*)')
    .single();

  if (error) throw error;
  return data;
};

// удаление упражнения из тренировки

export const removeExerciseFromTraining = async (trainingExerciseId: string) => {
  const { error } = await supabase
    .from('training_exercises')
    .delete()
    .eq('id', trainingExerciseId);

  if (error) throw error;
}

export const addSet = async (trainingExerciseId: string, reps: number, weight: number) => {
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
};

// управление подходами в тренировке
export const addSetToTraining = async (trainingId: string, exerciseId: string, reps: number, weight: number = 0) => {
  const { data: existingExercise, error: fetchError } = await supabase
    .from('training_exercises')
    .select('id')
    .eq('training_id', trainingId)
    .eq('exercise_id', exerciseId)
    .maybeSingle();

  if (fetchError) throw fetchError;

  let trainingExerciseId = existingExercise?.id;

  if (!trainingExerciseId) {
    const newExercise = await addExerciseToTraining(trainingId, exerciseId);
    trainingExerciseId = newExercise.id;
  }

  const { error: countError } = await supabase
    .from('sets')
    .select('*', { count: 'exact', head: true })
    .eq('training_exercise_id', trainingExerciseId);

  if (countError) throw countError;

  return await addSet(trainingExerciseId, reps, weight);
};

export const updateSet = async (setId: string, updates: { reps?: number; weight?: number }) => {
    const { data, error } = await supabase
    .from('sets')
    .update(updates)
    .eq('id', setId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export const deleteSet = async (setId: string) => {
    const { error } = await supabase.from('sets').delete().eq('id', setId);
    if (error) throw error;
}

// управление упражнениями в бд
export const createExercise = async (name: string, muscleGroup?: string): Promise<Exercise> => {
  const { data, error } = await supabase
    .from('exercises')
    .insert({
      name,
      muscle_group: muscleGroup || null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteExercise = async (exerciseId: string) => {
  const { error } = await supabase
    .from('exercises')
    .delete()
    .eq('id', exerciseId);

  if (error) throw error;
};