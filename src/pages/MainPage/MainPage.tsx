import { useEffect, useState } from 'react';
import './MainPage.css'
import { TrainingAPI } from '../../API/trainings';
import Training from '../../components/Training';
import type { ITrainingProps } from '../../modules/types';

function MainPage() {
    const [trainings, setTrainings] = useState<ITrainingProps[]>([])

    useEffect(() => {
        async function initTrainings() {
            const trainings = await TrainingAPI.getAll()
            setTrainings(trainings)
        }
        initTrainings()
    }, [])

    async function newTraining() {
        const training = await TrainingAPI.create(Date.now());
        setTrainings([training, ...trainings]);
    }

    return (
        <>
            <header>
                <button onClick={() => newTraining()}>Начать тренировку</button>
            </header>
            <main className='main'>
                <div className="trainings-list">
                    {
                        trainings.map(training => <Training key={training.id} id={training.id} date={training.date} />)
                    }
                </div>
            </main>
        </>

    );
}

export default MainPage;