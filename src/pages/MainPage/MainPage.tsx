import { useEffect, useState } from 'react';
import './MainPage.css'
import ExerciseTable from '../../components/ExerciseTable';
import type { IExerciseTable } from '../../modules/types'

function MainPage() {
    const [exercises, setExercises] = useState<IExerciseTable[]>(
        [
            {
                title: "Жим лежа",
                sets: [
                    {
                        reps: 5,
                        weight: 80
                    },
                    {
                        reps: 3,
                        weight: 85
                    },
                ]
            },
            {
                title: "Подтягивания",
                sets: [{
                    reps: 7,
                    weight: 20
                }, {
                    reps: 5,
                    weight: 25
                },
                ]
            }
        ]
    )

    useEffect(() => {
        
    })


    return (
        <main>
            {
                exercises.map(item => <ExerciseTable title={item.title} sets={item.sets} />)
            }
        </main>
    );
}

export default MainPage;