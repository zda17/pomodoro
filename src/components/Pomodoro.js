import Timer from "./Timer";
import Tasks from "./Tasks";

const Pomodoro = () => {
    return (
        <div className="pomodoro w-10/12 flex flex-col items-center">
            <h1 className="text-white font-bold absolute top-5">Pomodoro Timer</h1>

            <Timer />

            <Tasks />
        </div>
    )
}

export default Pomodoro
