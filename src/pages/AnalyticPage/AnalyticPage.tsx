import { useEffect, useState } from "react";
import './AnalyticPage.css'
import type { Training } from "../../modules/types";
import { getAllCompletedTrainings } from "../../API/api";
import ExerciseTableWidget from "../../components/Widgets/ExerciseTableWidget/ExerciseTableWidget";
import useFetching from "../../hooks/useFetching";

function AnalyticPage() {
    const [trainingHistories, setTrainingHistories] = useState<Training[]>([])
    const [fetchingTrainigs, trainingsError, trainingsIsLoading] = useFetching(async () => {
        const data = await getAllCompletedTrainings();
        setTrainingHistories(data)
    })


    useEffect(() => {
        fetchingTrainigs();
    }, [])


    return (
        <>
            {
                trainingsIsLoading ?
                    <div className="loading">Загрузка...</div>
                    :
                    <main className="main">
                        <h1 className="analytic-title">Аналитика</h1>
                        {
                            trainingHistories.map(training => (
                                <div className="analytic-training">
                                    <h3 className="title">Тренировка {training.date}</h3>
                                    <div className="trainings__box">
                                        {
                                            training.training_exercises.map(item =>
                                                <ExerciseTableWidget
                                                    key={item.id}
                                                    name={item.exercises?.name || 'Упражнение'}
                                                    {...item} />)
                                        }
                                    </div>
                                </div>

                            ))
                        }
                    </main>
            }
        </>

    );
}

export default AnalyticPage;