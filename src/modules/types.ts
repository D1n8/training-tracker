export type ExerciseTableMode = 'edit' | 'view'

export interface Exercise {
  id: string;
  name: string;
  muscle_group: string | null;
}

export interface Set {
  id: string;
  training_exercise_id: string;
  set_number: number;
  reps: number | null;
  weight: number | null;
}

// Этот тип объединяет связь упражнения в тренировке с самим упражнением и подходами
export interface TrainingExercise {
  id: string;
  training_id: string;
  exercise_id: string;
  order_index: number | null;
  // Вложенные данные (joins)
  exercises: Exercise; 
  sets: Set[];
}

export interface Training {
  id: string;
  date: string;
  is_active: boolean;
  total_duration_seconds: number;
  created_at: string;
  // Полная структура тренировки с упражнениями
  training_exercises: TrainingExercise[];
}

export interface IModalProps {
    isOpen: boolean,
    onClose: () => void
}

export interface ITrainingProps {
    id: number,
    date: Date,
    mode: ExerciseTableMode
}

