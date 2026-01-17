import { useEffect, useState } from 'react';
import './MainPage.css'
import { TrainingAPI } from '../../API/trainings';
import Training from '../../components/Training';
import type { ITrainingProps } from '../../modules/types';

function MainPage() {
    const [training, setTraining] = useState<ITrainingProps>()

    useEffect(() => {
        async function initTrainings() {
            const training = await TrainingAPI.getCurrent()
            setTraining(training)
        }
        initTrainings()
    }, [])

    async function newTraining() {
        const training = await TrainingAPI.start();
        setTraining(training);
    }

    async function finishTraining() {
        if (training) {
            await TrainingAPI.finish(training.id)
            setTraining(undefined)
        }
    }

    return (
        <main className='main'>
            <button onClick={() => newTraining()}>Начать тренировку</button>
            {
                training && (
                    <>
                        <Training key={training.id} id={training.id} date={training.date} mode='edit' />
                        <button onClick={() => finishTraining()}>Завершить тренировку</button>
                    </>
                )
            }
        </main>
    );
}

export default MainPage;