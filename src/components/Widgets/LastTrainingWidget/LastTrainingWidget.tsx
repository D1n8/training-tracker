import { useNavigate } from 'react-router-dom';
import Widget from '../../../UI/Widget/Widget';
import './LastTrainingWidget.css'

function LastTrainingWidget() {
    const navigate = useNavigate()
    return (
        <Widget className='last-training' onClick={() => navigate('/training')}>
            <div className="last-training__container">
                <div className="top-container">
                    <h2 className="widget-title last-training__widget-title">Тренировка</h2>
                    <p className="last-training__date">20.01.26</p>
                </div>

                <p className="last-training__muscle-group">
                    Грудь + трицепс
                </p>

                <div className="bottom-container">
                    <div className="last-training__time">
                        <p><b>Время</b></p>
                        <p className='value'>1 ч. 27 мин.</p>
                    </div>

                    <div className="last-training__volume">
                        <p><b>Объем</b></p>
                        <p className='value'>3600 кг</p>
                    </div>
                </div>
            </div>
        </Widget>
    );
}

export default LastTrainingWidget;