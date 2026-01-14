import { useState } from 'react';
import type { IExerciseTable } from '../modules/types'
import AddSetModal from './AddSetModal/AddSetModal';

interface IProps extends IExerciseTable {
  onAddSet: (exerciseId: number, reps: number, weight?: number) => Promise<void>;
}


function ExerciseTable({ id, onAddSet, name, sets }: IProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='exercise-item'>
            <table className='exercise-table'>
                <caption>{name}</caption>
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
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.weight}</td>
                                <td>{item.reps}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button onClick={() => setIsOpen(true)}>+</button>
            <AddSetModal onSave={(reps, weight) =>  onAddSet(id, reps, weight)} isOpen={isOpen} onClose={() => setIsOpen(false)}></AddSetModal>
        </div>
    );
}

export default ExerciseTable;