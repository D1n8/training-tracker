import './TrainingPage.css'
import { mockExercises } from '../../mockData';
import ExerciseTableWidget from '../../components/Widgets/ExerciseTableWidget/ExerciseTableWidget';

function TrainingPage() {
    return (
        <main className="main">
            <div className="training-page">
                <h2 className="training-page__title">Тренировка</h2>
                <div className="training-page__box">
                    {
                        mockExercises.map(item => <ExerciseTableWidget {...item} />)
                    }
                </div>
            </div>
        </main>
    );
}

export default TrainingPage;