import { useEffect, useState } from "react";
import type { IExerciseTable, ITrainingProps } from "../modules/types";
import ExerciseTable from "./ExerciseTable";
import { ExerciseAPI } from "../API/exercise";
import AddExerciseModal from "./AddExerciseModal";
import { SetAPI } from "../API/sets";
import { formatDate } from "../utils";

function Training({ id, date }: ITrainingProps) {
    const [exercises, setExercises] = useState<IExerciseTable[]>([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        async function initExercises() {
            const data = await ExerciseAPI.getByTraining(id)
            setExercises(data)
        }

        initExercises()
    }, [])

    async function addExercise(name: string, trainingId: number | null) {
        if (!trainingId) throw Error('No training id');
        await ExerciseAPI.create(trainingId, name)
        const data = await ExerciseAPI.getByTraining(trainingId)
        setExercises(data)
    }

    async function addSet(exerciseId: number, reps: number, weight?: number) {
        await SetAPI.add(exerciseId, reps, weight);

        const updated = await ExerciseAPI.getByTraining(id);
        setExercises(updated);
    }

    async function deleteSet(setId: number) {
        await SetAPI.remove(setId)
        const updated = await ExerciseAPI.getByTraining(id);
        setExercises(updated);
    }

    async function deleteExercise(exerciseId: number) {
        await ExerciseAPI.remove(exerciseId)
        const updated = await ExerciseAPI.getByTraining(id);
        setExercises(updated);
    }

    return (
        <div className="training-item">
            <div className="top-container">
                <h2>Тренировка {formatDate(new Date(date))}</h2>
                <button onClick={() => setIsOpen(true)}>Добавить упражнение</button>
            </div>

            <div className="exercises-list">
                {
                    exercises.map(item =>
                        <ExerciseTable
                            mode="edit"
                            onAddSet={addSet}
                            onDeleteSet={deleteSet}
                            onDeleteExercise={deleteExercise}
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            sets={item.sets} />)
                }
            </div>

            {
                isOpen && (
                    <AddExerciseModal
                        add={addExercise}
                        trainingId={id}
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)} />
                )
            }
        </div>
    );
}

export default Training;