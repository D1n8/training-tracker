import { useState } from 'react';
import type { IExerciseTable } from '../modules/types'
import AddSetModal from './AddSetModal/AddSetModal';

function ExerciseTable({ title, sets }: IExerciseTable) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <table>
                <caption>{title}</caption>
                <thead>
                    <tr>
                        <th>Подход</th>
                        <th>Вес (кг)</th>
                        <th>Количество повторений</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sets.map((item, index) => (
                            <tr>
                                <td>{++index}</td>
                                <td>{item.weight}</td>
                                <td>{item.reps}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={() => setIsOpen(true)}>+</button>
            <AddSetModal isOpen={isOpen} onClose={() => setIsOpen(false)}></AddSetModal>
        </>
    );
}

export default ExerciseTable;