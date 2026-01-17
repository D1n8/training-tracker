import { useEffect, useState } from "react"
import type { ITrainingProps } from "../../modules/types"
import { TrainingAPI } from "../../API/trainings"
import Training from "../../components/Training"

function TrainingsListPage() {
    const [trainings, setTrainings] = useState<ITrainingProps[]>([])
    
        useEffect(() => {
            async function initTrainings() {
                const trainings = await TrainingAPI.getAll()
                setTrainings(trainings)
            }
            initTrainings()
        }, [])

    return (
        <main className="main">
            <div className="trainings-list">
                    {
                        trainings.map(training => <Training key={training.id} id={training.id} date={training.date} mode="view"/>)
                    }
                </div>
        </main>
    );
}

export default TrainingsListPage;