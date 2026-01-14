import { useRef } from "react";
import Modal from "./Modal/Modal";
import type { IModalProps } from "../modules/types";

interface IAddExerciseModalProps extends IModalProps {
    trainingId: number,
    add: (name: string, trainingId: number) => void
}

function AddExerciseModal({isOpen, onClose, trainingId, add}: IAddExerciseModalProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    async function handleSave() {
        add(inputRef.current?.value ? inputRef.current?.value : '', trainingId)
        onClose()
    }

    return ( 
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="add-exercise-modal">
                <label htmlFor="exercise" style={{marginRight: '10px'}}>Упражнение</label>
                <input type="text" name="exercise" ref={inputRef}/>
                <div className="btns-container">
                    <button className="cancel" onClick={() => onClose()}>Отмена</button>
                    <button className="save" onClick={() => handleSave()}>Сохранить</button>
                </div>
            </div>
        </Modal>
     );
}

export default AddExerciseModal;
