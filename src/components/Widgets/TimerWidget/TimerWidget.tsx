import Widget from "../../../UI/Widget/Widget";
import './TimerWidget.css'

function TimerWidget() {
    return (
        <Widget className="timer">
            <div className="timer-container">
                <h2 className="timer-title">Таймер</h2>
                <div className="timer-box">
                    <button className="svg-btn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_13_49)">
                                <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 9.99999C18.3333 5.39762 14.6024 1.66666 10 1.66666C5.39763 1.66666 1.66667 5.39762 1.66667 9.99999C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8.33334 6.66666L13.3333 9.99999L8.33334 13.3333V6.66666Z" fill="#FAFAFA" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_13_49">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <p className="timer-value">2:00</p>
                </div>
            </div>
        </Widget>
    );
}

export default TimerWidget;