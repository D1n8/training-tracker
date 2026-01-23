import './TrainingPage.css'
import { mockExercises } from '../../mockData';
import ExerciseTableWidget from '../../components/Widgets/ExerciseTableWidget/ExerciseTableWidget';

function TrainingPage() {
    return (
        <main className="main">
            <div className="training-page">
                <div className="top-container">
                    <h2 className="training-page__title">Тренировка</h2>
                    <button className='btn'>Начать тренировку</button>
                </div>

                <div className="training-page__info">
                    <p className="training-page__date">20.01.26</p>
                    <p className="training-page__time">1 ч. 17 мин.</p>
                </div>

                <div className="training-page__box">
                    {
                        mockExercises.map(item => <ExerciseTableWidget key={item.id} {...item} />)
                    }
                </div>
            </div>
        </main>
    );
}

export default TrainingPage;