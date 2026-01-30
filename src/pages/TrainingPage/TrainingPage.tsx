import './TrainingPage.css'
import ExerciseTableWidget from '../../components/Widgets/ExerciseTableWidget/ExerciseTableWidget';
import { useEffect, useState } from 'react';
import type { Training } from '../../modules/types';
import {
    addSetToTraining,
    createExercise,
    deleteSet,
    finishWorkout,
    getDashboardWorkout,
    removeExerciseFromTraining,
    startWorkout
} from '../../API/api';
import AddSetToTrainingModal from '../../components/AddModals/AddSetToTrainingModal/AddSetToTrainingModal';
import AddExerciseModal from '../../components/AddModals/AddExerciseModal/AddExerciseModal';
import Stopwatch from '../../components/Stopwatch';

function TrainingPage() {
    const [trainingPage, setTrainingPage] = useState<Training | null>(null);
    const [isOpenAddSet, setIsOpenAddSet] = useState(false);
    const [isOpenAddExercise, setIsOpenAddExercise] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isStartStopWatch, setIsStartStopwatch] = useState(false);
    const [time, setTime] = useState(0);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const data = await getDashboardWorkout();
            setTrainingPage(data);

            if (data && data.is_active && (data.created_at || data.date)) {
                const startTime = new Date(data.created_at || data.date).getTime();
                const now = new Date().getTime();
                const diffInSeconds = Math.floor((now - startTime) / 1000);
                setTime(diffInSeconds > 0 ? diffInSeconds : 0);
                setIsStartStopwatch(true);
            } else {
                setIsStartStopwatch(false);
                setTime(0);
            }

        } catch (error) {
            console.error("Ошибка загрузки тренировки:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchDashboardData();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    async function startNewTraining() {
        try {
            setIsLoading(true);
            const response = await startWorkout();

            const newTraining: Training = {
                ...response,
                training_exercises: []
            };

            setTrainingPage(newTraining);
            setTime(0);
            setIsStartStopwatch(true);

        } catch (e) {
            console.error(e);
            alert("Не удалось начать тренировку");
        } finally {
            setIsLoading(false);
        }
    }

    async function finishTraining(id: string) {
        if (!confirm('Завершить тренировку?')) return;

        try {
            setIsLoading(true);
            setIsStartStopwatch(false);

            await finishWorkout(id, time);

            await fetchDashboardData();
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
            setTime(0);
        }
    }

    async function handleAddSet(exerciseId: string, reps: number, weight?: number) {
        if (!trainingPage) return;
        try {
            await addSetToTraining(trainingPage.id, exerciseId, reps, weight || 0);
            await fetchDashboardData();
        } catch (e) {
            console.error(e);
            alert('Ошибка при добавлении подхода');
        }
    }

    async function handleAddExerciseDictionary(name: string, muscleGroup?: string) {
        try {
            await createExercise(name, muscleGroup);
            setIsOpenAddExercise(false);
        } catch (e) {
            console.error(e);
            alert('Не удалось создать упражнение');
        }
    }

    async function handleDeleteSet(setId: string) {
        await deleteSet(setId)
        await fetchDashboardData()
    }

    async function handleDeleteExerciseFromTraining(trainingExerciseId: string) {
        await removeExerciseFromTraining(trainingExerciseId)
        await fetchDashboardData()
    }

    if (isLoading && !trainingPage) return <div>Загрузка...</div>;

    return (
        <main className="main">
            <div className="training-page">
                <div className="top-container">
                    <h2 className="training-page__title">Тренировка</h2>
                    {
                        trainingPage?.is_active ? (
                            <button className='btn' onClick={() => finishTraining(trainingPage.id)}>
                                Завершить тренировку
                            </button>
                        ) : (
                            <button className='btn' onClick={startNewTraining}>
                                Начать тренировку
                            </button>
                        )
                    }
                </div>

                {trainingPage && (
                    <div className="training-page__info">
                        <p className="training-page__date">
                            {new Date(trainingPage.date).toLocaleDateString()}
                        </p>
                        <Stopwatch isStart={isStartStopWatch} time={time} setTime={setTime} />
                    </div>
                )}

                {trainingPage?.is_active && (
                    <div className="actions-container">
                        <button onClick={() => setIsOpenAddExercise(true)} className="btn">
                            Новое упражнение
                        </button>
                        <button onClick={() => setIsOpenAddSet(true)} className="btn">
                            Добавить подход
                        </button>
                    </div>
                )}

                <div className="trainings__box">
                    {trainingPage?.training_exercises?.length ? (
                        trainingPage.training_exercises.map(item => (
                            <>
                                {trainingPage.is_active ?
                                    <ExerciseTableWidget
                                        key={item.id}
                                        name={item.exercises?.name || 'Упражнение'}
                                        {...item}
                                        mode='edit'
                                        onDeleteExercise={handleDeleteExerciseFromTraining}
                                        onDeleteSet={handleDeleteSet}
                                    />
                                    :
                                    <ExerciseTableWidget
                                        key={item.id}
                                        name={item.exercises?.name || 'Упражнение'}
                                        {...item}
                                    />
                                }
                            </>
                        ))
                    ) : (
                        trainingPage && <p>Пока нет упражнений</p>
                    )}
                </div>
            </div>

            <AddSetToTrainingModal
                isOpen={isOpenAddSet}
                onClose={() => setIsOpenAddSet(false)}
                onSave={handleAddSet}
            />

            <AddExerciseModal
                isOpen={isOpenAddExercise}
                onClose={() => setIsOpenAddExercise(false)}
                add={handleAddExerciseDictionary}
            />
        </main>
    );
}

export default TrainingPage;