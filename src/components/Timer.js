import axios from "axios";
import { useState, useEffect } from "react";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const Timer = () => {
    const [rounds, setRounds] = useState(1);
    const [seconds, setSeconds] = useState(3);
    const [minutes, setMinutes] = useState(0);
    const [breakTime, setBreakTime] = useState(false);
    const [timerActive, setTimerActive] = useState(false);
    const [alert, setAlert] = useState(`Press play when youre ready!`);
    const [quote, setQuote] = useState('');

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            if (breakTime === true) {
                                // break time just ended, start a new round
                                setRounds(rounds + 1);
                                setMinutes(0);
                                setSeconds(15);
                                setAlert(false);
                                setBreakTime(false);
                            } else if (rounds % 4 === 0) {
                                // start long break
                                setAlert('4 rounds are up! Time for a long break.');
                                setMinutes(0);
                                setSeconds(10);
                                setBreakTime(true);
                                setRounds(0);
                            } else {
                                // start short break
                                if (rounds === 1) {
                                    setAlert(`First round down! ${quote}`);
                                } else if (rounds === 2) {
                                    setAlert(`Half way done. Take some deep breaths. ${quote}`);
                                } else if (rounds === 3) {
                                    setAlert(`1 round to go! Remember why you started. ${quote}`);
                                }
                                setMinutes(0);
                                setSeconds(5);
                                setBreakTime(true);
                                fetchQuote();
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
    }, [seconds, minutes, rounds, breakTime, timerActive, alert, quote])

    useEffect(() => {
        fetchQuote();
    }, []);

    const toggleTimer = () => {
        setTimerActive(!timerActive);
        setAlert(false);
    }

    const fetchQuote = async () => {
        try {
            console.log("fetch random quote...");
            const quoteObject = await axios.get("https://api.quotable.io/random");
            setQuote(quoteObject.data.content);
        } catch (error) {
            console.log('error fetching quote...');
        }
    }
 
    return (
        <div className="flex flex-col items-center justify-center h-80">
            <div className="message text-xl text-black text-center mb-4 h-16">
                {alert}
            </div>

            <div className="timer font-bold h-16">
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
