import { useState } from "react";
import type { IModalProps } from "../../modules/types";
import Modal from "../Modal/Modal";
import './AddSetModal.css'
import { SetAPI } from "../../API/sets";

function AddSetModal({ isOpen, onClose }: IModalProps) {
    const [weight, setWeight] = useState<number>(0)
    const [reps, setReps] = useState<number>(0)

    async function handleSave() {
        await SetAPI.add(Date.now(), reps, weight)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="add-set-modal">
                <div className="input-container">
                    <label htmlFor="weight">Вес</label>
                    <input type="number" name="weight" value={weight} onChange={(e) => setWeight(Number(e.target.value))}/>
                </div>
                <div className="input-container">
                    <label htmlFor="reps">Количество</label>
                    <input type="number" name="reps" value={reps} onChange={(e) => setReps(Number(e.target.value))}/>
                </div>
                <div className="btns-container">
                    <button onClick={() => onClose()}>Отмена</button>
                    <button onClick={() => handleSave()}>Сохранить</button>
                </div>
            </div>
        </Modal>
    );
}

export default AddSetModal;