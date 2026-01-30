    import { useRef } from "react";
    import Modal from "../../Modal/Modal";
    import type { IModalProps } from "../../../modules/types";

    interface IAddExerciseModalProps extends IModalProps {
        add: (name: string, muscleGroup?: string) => void
    }

    function AddExerciseModal({isOpen, onClose, add}: IAddExerciseModalProps) {
        const inputRef = useRef<HTMLInputElement>(null)

        async function handleSave() {
            add(inputRef.current?.value ? inputRef.current?.value : '')
            onClose()
        }

        return ( 
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="add-exercise-modal">
                    <label htmlFor="exercise" style={{marginRight: '10px', color: "white"}}>Упражнение</label>
                    <input type="text" name="exercise" ref={inputRef}/>
                    <div className="btns-container">
                        <button className="btn cancel" onClick={() => onClose()}>Отмена</button>
                        <button className="btn save" onClick={() => handleSave()}>Сохранить</button>
                    </div>
                </div>
            </Modal>
        );
    }

    export default AddExerciseModal;