import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import './TimerComponent.scss';
const TimerComponent = ({ onTimeout, remainingTime, setRemainingTime }) => {
    useEffect(() => {
        const timerId = setInterval(() => {
            setRemainingTime(prevTime => {
                const newTime = prevTime - 1;
                if (newTime === 0) {
                    clearInterval(timerId);
                    onTimeout();
                }
                return newTime;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [onTimeout]);
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (time <= 0) {
            minutes = 0;
            seconds = 0;
        }
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    return (_jsx("div", { className: "timer", children: _jsx("span", { className: "time", children: formatTime(remainingTime) }) }));
};
export default TimerComponent;
