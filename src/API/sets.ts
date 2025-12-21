import { db } from '../db/db';

export const SetAPI = {
  async add(exerciseId: number, reps: number, weight?: number) {
    return db.sets.add({ exerciseId, reps, weight });
  },

  async getByExercise(exerciseId: number) {
    return db.sets.where('exerciseId').equals(exerciseId).toArray();
  },

  async remove(id: number) {
    return db.sets.delete(id);
  }
};
