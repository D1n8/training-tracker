import Widget from '../../../UI/Widget/Widget';
import './TrainingAnalytics.css'

function TrainingAnalytics() {
    return (
        <Widget className='training-analytics'>
            <div className="training-analytics__container">
                <div className="top-container">
                    <h2 className="training-analytics__title">Мои тренировки за</h2>
                    <span>неделю</span>
                </div>

                <div className='training-analytics__box'>
                    <p>
                        Кол-во тренировок:
                    </p>
                    <p className="training-analytics__count">2</p>
                </div>

                <div className='training-analytics__box'>
                    <p>
                        Тренировочное время:
                    </p>
                    <p className="training-analytics__time">3 ч. 12 м.</p>
                </div>

            </div>
        </Widget>
    );
}

export default TrainingAnalytics;