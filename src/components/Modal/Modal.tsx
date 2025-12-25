import type { IModalProps } from '../../modules/types';
import './Modal.css'

interface IModal extends IModalProps {
    children: React.ReactNode
}

function Modal({ children, isOpen }: IModal) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal-content"
                onClick={(e) => {
                    e.stopPropagation()
                }}>
                {children}
            </div>
        </div>
    );
}

export default Modal;