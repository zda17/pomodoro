import {useState, useEffect} from "react";
import { FaPlay, FaPause } from 'react-icons/fa';

const Timer = () => {
    let [minutes, setMinutes] = useState(0);
    let [seconds, setSeconds] = useState(7);
    let [rounds, setRounds] = useState(1);
    let [breakTime, setBreakTime] = useState(false);
    let [timerActive, setTimerActive] = useState(false);
    let [headerMessage, setHeaderMessage] = useState(false);

    let timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval);

            if (timerActive) {
                if (seconds === 0) {
                    if (minutes === 0) {
                        if (breakTime === true) {
                            // break time just ended, start a new round
                            setMinutes(0);
                            setSeconds(25);
                            setRounds(rounds++);
                            setBreakTime(false);
                            setHeaderMessage(`Round: ${rounds} `)

                        } else if (rounds % 4 === 0) {
                            // start long break

                            setHeaderMessage('Time for a long break!');
                            setMinutes(0);
                            setSeconds(10);
                            setBreakTime(true);
                        } else {
                            // start short break

                            setHeaderMessage('Time for a quick break!');
                            setMinutes(0);
                            setSeconds(5);
                            setBreakTime(true);
                        }
                    } else {
                        // lower minutes by 1, reset seconds to 59
                        setSeconds(59);
                        setMinutes(minutes - 1);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }
        }, 1000)
    }, [seconds, minutes, rounds, breakTime, timerActive])

    const toggleTimer = () => {
        setTimerActive(!timerActive);
        setHeaderMessage(`Round ${rounds}. Here we go!`);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="message text-xl text-black text-center mb-4">
                {headerMessage}
            </div>

            <div className="timer text-4xl text-black font-bold">
                {timerMinutes}:{timerSeconds}
            </div>

            <button 
                className="bg-red-900 text-white p-5 mt-4 rounded-3xl"
                onClick={toggleTimer}
            >
                {timerActive ? <FaPause /> : <FaPlay />}
            </button>
        </div>
    )
}

export default Timer
