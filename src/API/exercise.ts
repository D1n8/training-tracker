import { db } from '../db/db';

export const ExerciseAPI = {
  async create(trainingId: number, name: string) {
    return db.exercises.add({ trainingId, name });
  },

  async getByTraining(trainingId: number) {
    return db.exercises.where('trainingId').equals(trainingId).toArray();
  },

  async remove(id: number) {
    await db.transaction('rw', db.exercises, db.sets, async () => {
      await db.sets.where('exerciseId').equals(id).delete();
      await db.exercises.delete(id);
    });
  }
};
