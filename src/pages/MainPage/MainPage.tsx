import { useEffect, useState } from 'react';
import './MainPage.css'
// import { TrainingAPI } from '../../API/trainings';
// import Training from '../../components/Training';
import type { ITrainingProps } from '../../modules/types';
import MyWeightWidget from '../../components/Widgets/MyWeightWidget/MyWeightWidget';
import LastTrainingWidget from '../../components/Widgets/LastTrainingWidget/LastTrainingWidget';
import TimerWidget from '../../components/Widgets/TimerWidget/TimerWidget';
import ExerciseTableWidget from '../../components/Widgets/ExerciseTableWidget/ExerciseTableWidget';
import TrainingAnalytics from '../../components/Widgets/TrainingAnalytics/TrainingAnalytics';

const mockData = {
    id: 1,
    name: 'Жим',
    sets: [
        {
            id: 1,
            weight: 20,
            reps: 10
        },
        {
            id: 2,
            weight: 40,
            reps: 10
        },
        {
            id: 3,
            weight: 60,
            reps: 10
        },
        {
            id: 4,
            weight: 70,
            reps: 8
        }
    ]
}

function MainPage() {
    const [training, setTraining] = useState<ITrainingProps>()

    useEffect(() => {
        // async function initTrainings() {
        //     const training = await TrainingAPI.getCurrent()
        //     setTraining(training)
        // }
        // initTrainings()
    }, [])

    async function newTraining() {
        // const training = await TrainingAPI.start();
        // setTraining(training);
    }

    // async function finishTraining() {
    //     if (training) {
    //         await TrainingAPI.finish(training.id)
    //         setTraining(undefined)
    //     }
    // }

    return (
        <main className='main'>
            <button className='btn' onClick={() => newTraining()}>Начать тренировку</button>
            <MyWeightWidget/>
            <LastTrainingWidget/>
            <TimerWidget/>
            <ExerciseTableWidget {...mockData}/>
            <TrainingAnalytics/>
        </main>
    );
}

export default MainPage;