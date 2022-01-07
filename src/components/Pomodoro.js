import Timer from "./Timer";
import Tasks from "./Tasks";

import { FaPlus } from 'react-icons/fa';

const Pomodoro = () => {
    return (
        <div className="pomodoro h-screen w-10/12 flex flex-col items-center justify-between pt-4">
            <div className="flex w-full items-center justify-between text-black font-bold text-2xl">
                <h1>Pomodoro</h1>
                <FaPlus />
            </div>

            <Timer />

            <Tasks />
        </div>
    )
}

export default Pomodoro
