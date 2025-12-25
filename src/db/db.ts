import Dexie, { type Table } from 'dexie';

/* ===== Types ===== */

export interface Training {
  id?: number;
  date: number;
}

export interface Exercise {
  id?: number;
  trainingId: number;
  name: string;
}

export interface SetEntry {
  id?: number;
  exerciseId: number;
  weight?: number;
  reps: number;
}

/* ===== Config ===== */

const DB_NAME =
  import.meta.env.VITE_DB_NAME ??
  (import.meta.env.DEV ? 'fitnessDB_dev' : 'fitnessDB');

/* ===== DB ===== */

class FitnessDB extends Dexie {
  trainings!: Table<Training>;
  exercises!: Table<Exercise>;
  sets!: Table<SetEntry>;

  constructor() {
    super(DB_NAME);

    this.version(1).stores({
      trainings: '++id, date',
      exercises: '++id, trainingId, name',
      sets: '++id, exerciseId'
    });
  }
}

console.log('Using IndexedDB:', DB_NAME);


export const db = new FitnessDB();
