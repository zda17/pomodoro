import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const Timer = () => {
    let [minutes, setMinutes] = useState(0);
    let [seconds, setSeconds] = useState(7);
    let [rounds, setRounds] = useState(1);
    let [breakTime, setBreakTime] = useState(false);
    let [timerActive, setTimerActive] = useState(false);
    let [headerMessage, setHeaderMessage] = useState(`Round ${rounds}. Press play when youre ready!`);

    let timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => {
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
            }, 1000)
        }
        return () => clearInterval(interval);
    }, [seconds, minutes, rounds, breakTime, timerActive])

    const toggleTimer = () => {
        setTimerActive(!timerActive);
    }

    return (
        <div className="flex flex-col items-center justify-center h-80">
            {/* <div className="message text-xl text-black text-center mb-4">
                {headerMessage}
            </div> */}

            <div className="timer font-bold">
                <span className="text-black text-4xl">
                    {timerMinutes}:
                </span>
                <span className={seconds <= 5 ? 'text-termly-blue text-6xl transition-all' : 'text-black text-4xl'}>
                    {timerSeconds}
                </span>
            </div>

            <button 
                className="bg-termly-blue text-white p-5 mt-4 rounded-2xl"
                onClick={toggleTimer}
            >
                {timerActive ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </button>
        </div>
    )
}

export default Timer
