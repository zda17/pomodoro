import axios from "axios";
import moment from 'moment'
import { useState, useEffect } from "react";

import Tasks from "./Tasks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const Timer = () => {
    const [rounds, setRounds] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(25);
    const [breakTime, setBreakTime] = useState(false);
    const [timerActive, setTimerActive] = useState(false);
    const [alert, setAlert] = useState(`Press play when youre ready!`);
    const [quote, setQuote] = useState(false);
    const [currentTask, setCurrentTask] = useState(false);

    // TODO:
    // const [startTaskTime, setStartTaskTime] = useState(false);
    // const [endTaskTime, setEndTaskTime] = useState(false);

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
                                setRounds(rounds => rounds + 1);
                                setMinutes(25);
                                setSeconds(0);
                                setAlert(false);
                                setBreakTime(false);
                            } else if (rounds % 4 === 0) {
                                // start long break
                                setAlert(
                                    <> 
                                        <span className="font-bold text-xl">4 rounds are up.</span> 
                                        <span className="font-bold text-lg italic">Time for a long break!</span>
                                        <span className="text-sm">The timer will automatically reset after this break.</span>
                                    </>
                                );
                                setMinutes(15);
                                setSeconds(0);
                                setBreakTime(true);
                                setRounds(0);
                            } else {
                                // start short break
                                setAlert(
                                    <> 
                                        <span className="font-bold text-xl">Round {rounds} done.</span> 
                                        <span className="font-bold text-lg italic">Take a short break!</span>
                                        <span className="text-sm">{quote}</span>
                                    </>
                                );
                                setMinutes(5);
                                setSeconds(0);
                                setBreakTime(true);
                                fetchQuote();
                            }
                        } else {
                            // lower minutes by 1, reset seconds to 59
                            setSeconds(59);
                            setMinutes(minutes => minutes - 1);
                        }
                    } else {
                        setSeconds(seconds => seconds - 1);
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

        // calculateTimeToCompleteTask();
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

    // TODO: calculate the start/end time of each task, the subtract the two 
    // and place "duration" timestamp next to each task
    // const calculateTimeToCompleteTask = () => {
    //     if (!startTaskTime) {
    //         let startTime = moment();
    //         setStartTaskTime(startTime);
    //     } else {
    //         console.log("end time hit... should subtract times...");
    //         let endTime = moment();
    //         let timeToCompleteTask = endTime.subtract(startTaskTime);

    //         console.log(timeToCompleteTask);

    //         // then get a new startTime, I think??
    //     }
    // }
 
    return (
        <>
            <div className="flex flex-col items-center justify-center h-96 mb-16">

                <div className=" bg-white w-48 text-termly-blue text-center font-bold my-4 rounded-lg text-sm">
                    Current Task: {currentTask}
                </div>

                <div className="flex flex-col items-center justify-center text-black text-center h-1/2">
                    {alert}
                </div>

                <div className="flex flex-col w-full h-1/2">
                    <div className="flex items-center justify-center font-bold h-2/3 mb-4">
                        <div className="text-black text-5xl">
                            {timerMinutes}:
                        </div>
                        <div className={(minutes === 0 && seconds <= 5) ? 'text-termly-blue text-6xl transition-all' : 'text-black text-5xl'}>
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
            
            <Tasks toggleTimer={toggleTimer} timerActive={timerActive} setAlert={setAlert} setCurrentTask={setCurrentTask} />
        </>
    )
}

export default Timer
