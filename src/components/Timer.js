import axios from "axios";
import { useState, useEffect } from "react";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const Timer = () => {
    const [rounds, setRounds] = useState(0);
    const [seconds, setSeconds] = useState(7);
    const [minutes, setMinutes] = useState(0);
    const [breakTime, setBreakTime] = useState(false);
    const [timerActive, setTimerActive] = useState(false);
    const [alert, setAlert] = useState(`Press play when youre ready!`);
    const [quote, setQuote] = useState(false);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    useEffect(() => {
        fetchQuote();
    }, []);

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
                                setAlert(
                                    <> 
                                        <span className="font-bold">4 rounds are up!</span> 
                                        <span>Time for a long break. The timer will automatically reset after this break.</span>
                                    </>
                                );
                                setMinutes(0);
                                setSeconds(10);
                                setBreakTime(true);
                                setRounds(0);
                            } else {
                                // start short break
                                setAlert(
                                    <> 
                                        <span className="font-bold text-xl">Round {rounds} done.</span> 
                                        <span className="text-sm">{quote}</span>
                                    </>
                                );
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
        // cleanup function
        return () => clearInterval(interval);
    }, [seconds, minutes, rounds, breakTime, timerActive, alert, quote])

    const toggleTimer = () => {
        setTimerActive(!timerActive);
        if (rounds === 0) {
            setRounds(rounds + 1);
            setAlert(false);
        }
    }

    const fetchQuote = async () => {
        try {
            const quoteObject = await axios.get("https://api.quotable.io/random");
            setQuote(quoteObject.data.content);
        } catch (error) {
            console.log(error);
            setQuote(false);
        }
    }
 
    return (
        <div className="flex flex-col items-center justify-center h-96 mb-16">

            <div className="flex flex-col items-center justify-center text-black text-center h-1/2">
                {alert}
            </div>

            <div className="flex flex-col w-full h-1/2">
                <div className="flex items-center justify-center font-bold h-2/3">
                    <div className="text-black text-5xl">
                        {timerMinutes}:
                    </div>
                    <div className={seconds <= 5 ? 'text-termly-blue text-6xl transition-all' : 'text-black text-5xl'}>
                        {timerSeconds}
                    </div>
                </div>

                {/* TODO: finish the button component */}
                <button 
                    className="bg-termly-blue text-white p-5 rounded-2xl"
                    onClick={toggleTimer}
                >
                    {timerActive ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                </button>
            </div>
        </div>
    )
}

export default Timer
