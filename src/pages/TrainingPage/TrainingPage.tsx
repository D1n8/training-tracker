import './TrainingPage.css'
import ExerciseTableWidget from '../../components/Widgets/ExerciseTableWidget/ExerciseTableWidget';
import { useEffect, useState } from 'react';
import { formatSecondsToHours } from '../../utils';
import type { Training } from '../../modules/types';
import { addExerciseToTraining, addSet, addSetToTraining, createExercise, finishWorkout, getDashboardWorkout, startWorkout } from '../../API/api';
import AddSetToTrainingModal from '../../components/AddModals/AddSetToTrainingModal/AddSetToTrainingModal';
import AddExerciseModal from '../../components/AddModals/AddExerciseModal/AddExerciseModal';

function TrainingPage() {
    const [trainingPage, setTrainingPage] = useState<Training | null>(null)
    const [isOpenAddSet, setIsOpenAddSet] = useState(false)
    const [isOpenAddExercise, setIsOpenAddExercise] = useState(false)

    useEffect(() => {
        async function init() {
            const response = await getDashboardWorkout()
            setTrainingPage(response)
            console.log(response)
        }
        init()
    }, [])

    async function startNewTraining() {
        const response = await startWorkout()
        setTrainingPage(response)
    }

    async function finishTraining(id: string) {
        const response = await finishWorkout(id, 8475)
        setTrainingPage(response)
    }

    async function handleAddSet(exerciseId: string, reps: number, weight?: number) {
        if (!trainingPage) return;
        try {
            await addSetToTraining(trainingPage.id, exerciseId, reps, weight || 0);

            const updatedData = await getDashboardWorkout();
            setTrainingPage(updatedData);

        } catch (e) {
            console.error(e);
            alert('Ошибка при добавлении подхода');
        }

    }

    async function addExercise(name: string, muscleGroup?: string) {
        await createExercise(name, muscleGroup)
        setTrainingPage(await getDashboardWorkout())
    }

    return (
        <main className="main">
            <div className="training-page">
                <div className="top-container">
                    <h2 className="training-page__title">Тренировка</h2>
                    {
                        trainingPage?.is_active ?
                            <button className='btn' onClick={() => finishTraining(trainingPage?.id ? trainingPage.id : "0")}>Завершить тренировку</button>
                            :
                            <button className='btn' onClick={() => startNewTraining()}>Начать тренировку</button>
                    }
                </div>

                {
                    trainingPage && (
                        <div className="training-page__info">
                            {
                                trainingPage.date && (
                                    <p className="training-page__date">{trainingPage.date}</p>

                                )
                            }
                            {
                                (trainingPage.total_duration_seconds && trainingPage.total_duration_seconds > 0) &&
                                <p className="training-page__time">{formatSecondsToHours(trainingPage?.total_duration_seconds)}</p>
                            }
                        </div>
                    )
                }

                <button onClick={() => setIsOpenAddExercise(true)} className="btn">Добавить упражнение</button>
                <button onClick={() => setIsOpenAddSet(true)} className="btn">Добавить подход</button>

                <div className="training-page__box">
                    {
                        trainingPage?.training_exercises.map(item => <ExerciseTableWidget key={item.id} name={item.exercises.name} {...item} />)
                    }
                </div>
            </div>
            <AddSetToTrainingModal isOpen={isOpenAddSet} onClose={() => setIsOpenAddSet(false)} onSave={handleAddSet} />
            <AddExerciseModal isOpen={isOpenAddExercise} onClose={() => setIsOpenAddExercise(false)} add={addExercise} />
        </main>
    );
}

export default TrainingPage;