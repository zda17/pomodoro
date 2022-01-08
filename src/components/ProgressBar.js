import {useState, useEffect} from "react";

const ProgressBar = ({ tasks }) => {
    const [progress, setProgress] = useState(0);

    // TODO: when all tasks are completed, stop the timer and show a congratulatory message!
    useEffect(() => {
        const tasksProgress = () => {
            let completedTasks = tasks.filter((task) => task.completed);
            completedTasks = completedTasks.length;

            if (completedTasks) {
                setProgress(completedTasks / tasks.length * 100);
            } else {
                setProgress(0);
            }
        }

        tasksProgress();
    }, [progress, tasks])

    return (
        <>
            <progress 
                id="file" 
                max="100"
                className="progress-bar w-full"
                style={{"WebkitProgressBar": "red"}}
                value={progress}>
                {progress}
            </progress>
            {/* styling is in index.css for simplicity */}
        </>
    )
}

export default ProgressBar
