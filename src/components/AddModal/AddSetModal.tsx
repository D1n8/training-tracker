import { useState } from "react";
import type { IModalProps } from "../../modules/types";
import Modal from "../Modal/Modal";
import './AddSetModal.css'

interface IAddSetModalProps extends IModalProps {
    onSave: (reps: number, weight?: number) => Promise<void>;
}

function AddSetModal({ isOpen, onClose, onSave }: IAddSetModalProps) {
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')

    async function handleSave() {
        const parsedWeight = weight === '' ? undefined : Number(weight);
        const parsedReps = Number(reps);
        await onSave(parsedReps, parsedWeight)
        setReps('')
        setWeight('0')
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="add-set-modal">
                <div className="input-container">
                    <label htmlFor="weight" style={{marginRight: '10px'}}>Вес</label>
                    <input className="add-set-modal-input" type="number" name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="reps" style={{marginRight: '10px'}}>Количество</label>
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

export default AddSetModal;