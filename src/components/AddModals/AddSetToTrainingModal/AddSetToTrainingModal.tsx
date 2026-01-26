import { useEffect, useState } from "react";
import type { Exercise, IModalProps } from "../../../modules/types";
import Modal from "../../Modal/Modal";
import './AddSetToTrainingModal.css'
import { getAllExercises } from "../../../API/api";

interface IAddSetModalProps extends IModalProps {
    onSave: (exerciseId: string, reps: number, weight?: number) => Promise<void>;
}

function AddSetToTrainingModal({ isOpen, onClose, onSave }: IAddSetModalProps) {
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [selectedExerciseId, setSelectedExerciseId] = useState('')

    useEffect(() => {
        async function getExercises() {
            const data = await getAllExercises()
            setExercises(data)
        }
        getExercises()
    }, [])

    async function handleSave() {
        const parsedWeight = weight === '' ? undefined : Number(weight);
        const parsedReps = Number(reps);
        if (selectedExerciseId) {
            await onSave(selectedExerciseId, parsedReps, parsedWeight)
            setReps('')
            setWeight('')
            onClose()
        }
    }
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="add-set-modal">

                <select value={selectedExerciseId} onChange={e => setSelectedExerciseId(e.target.value)}>
                    <option value="" disabled>-- Выберите упражнение --</option> 
                    {
                        exercises.map(item =>
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )
                    }
                </select>


                <div className="input-container">
                    <label htmlFor="weight" style={{ marginRight: '10px' }}>Вес</label>
                    <input className="add-set-modal-input" type="number" name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="reps" style={{ marginRight: '10px' }}>Количество</label>
                    <input className="add-set-modal-input" type="number" name="reps" value={reps} onChange={(e) => setReps(e.target.value)} />
                </div>
                <div className="btns-container">
                    <button className="cancel" onClick={() => onClose()}>Отмена</button>
                    <button className="save" onClick={() => handleSave()}>Сохранить</button>
                </div>
            </div>
        </Modal>
    );
}

export default AddSetToTrainingModal;