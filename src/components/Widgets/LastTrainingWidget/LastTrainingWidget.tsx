import Widget from '../../../UI/Widget/Widget';
import './LastTrainingWidget.css'

function LastTrainingWidget() {
    return (
        <Widget className='last-training'>
            <div className="last-training__container">
                <div className="top-container">
                    <h2 className="widget-title last-training__widget-title">Тренировка</h2>
                    <p className="last-training__date">20.01.26</p>
                </div>

                <p className="last-training__muscle-group">
                    Грудь + трицепс
                </p>

                <div className="last-training__time">
                    <p>Время</p>
                    <p>1 ч. 27 мин.</p>
                </div>

                <div className="last-training__volume">
                    <p>Объем</p>
                    <p>3600 кг</p>
                </div>
            </div>
        </Widget>
    );
}

export default LastTrainingWidget;