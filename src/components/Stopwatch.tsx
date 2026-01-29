import { useEffect } from "react";

interface IStopwatchProps {
    isStart: boolean;
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
}

function Stopwatch({ isStart, time, setTime }: IStopwatchProps) {

    useEffect(() => {
        let interval: number | undefined;

        if (isStart) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);

    }, [isStart]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const format = (num: number) => num < 10 ? `0${num}` : num;

    return (
        <div className="stopwatch training-page__time">
            <p className="value">
                {format(minutes)} : {format(seconds)}
            </p>
        </div>
    );
}

export default Stopwatch;