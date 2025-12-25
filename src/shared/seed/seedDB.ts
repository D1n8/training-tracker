import { TrainingAPI } from '../../API/trainings';
import { ExerciseAPI } from '../../API/exercise';
import { SetAPI } from '../../API/sets';

/**
 * Заполняет IndexedDB моковыми данными
 * ⚠️ Использовать ТОЛЬКО в dev
 */
export async function seedDatabase() {
  console.log('🌱 Seeding database...');

  /* ===== Training 1 ===== */
  const training1Id = await TrainingAPI.create(
    Date.now() - 1000 * 60 * 60 * 24 * 3 // 3 дня назад
  );

  const benchPressId = await ExerciseAPI.create(training1Id, 'Жим лёжа');
  await SetAPI.add(benchPressId, 12, 40);
  await SetAPI.add(benchPressId, 8, 60);
  await SetAPI.add(benchPressId, 5, 70);
  await SetAPI.add(benchPressId, 5, 70);
  await SetAPI.add(benchPressId, 4, 70);

  const inclineBenchId = await ExerciseAPI.create(training1Id, 'Жим под углом');
  await SetAPI.add(inclineBenchId, 10, 40);
  await SetAPI.add(inclineBenchId, 8, 50);
  await SetAPI.add(inclineBenchId, 6, 60);

  const pushUpsId = await ExerciseAPI.create(training1Id, 'Отжимания');
  await SetAPI.add(pushUpsId, 15);
  await SetAPI.add(pushUpsId, 12);
  await SetAPI.add(pushUpsId, 10);

  /* ===== Training 2 ===== */
  const training2Id = await TrainingAPI.create(
    Date.now() - 1000 * 60 * 60 * 24 * 2 // 2 дня назад
  );

  const squatsId = await ExerciseAPI.create(training2Id, 'Приседания');
  await SetAPI.add(squatsId, 10, 60);
  await SetAPI.add(squatsId, 8, 80);
  await SetAPI.add(squatsId, 6, 100);

  const legPressId = await ExerciseAPI.create(training2Id, 'Жим ногами');
  await SetAPI.add(legPressId, 12, 120);
  await SetAPI.add(legPressId, 10, 140);

  const calfRaisesId = await ExerciseAPI.create(training2Id, 'Подъёмы на икры');
  await SetAPI.add(calfRaisesId, 20, 40);
  await SetAPI.add(calfRaisesId, 18, 40);
}
