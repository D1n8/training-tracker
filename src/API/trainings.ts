import { db } from '../db/db';

/* ===== Trainings ===== */

export const TrainingAPI = {
  async create(date: number) {
    return db.trainings.add({ date });
  },

  async getAll() {
    return db.trainings.orderBy('date').reverse().toArray();
  },

  async getById(id: number) {
    return db.trainings.get(id);
  },

  async remove(id: number) {
    await db.transaction('rw', db.trainings, db.exercises, db.sets, async () => {
      const exercises = await db.exercises.where('trainingId').equals(id).toArray();

      const exerciseIds = exercises.map(e => e.id!);

      await db.sets.where('exerciseId').anyOf(exerciseIds).delete();
      await db.exercises.where('trainingId').equals(id).delete();
      await db.trainings.delete(id);
    });
  }
};
