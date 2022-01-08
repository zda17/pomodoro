import {useState, useEffect} from "react";

const ProgressBar = ({ tasks }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const tasksProgress = () => {
            let completedProgress = 0;
            let completedTasks = tasks.filter((task) => task.completed);
            completedTasks = completedTasks.length;

            if (completedTasks) {
                completedProgress = completedTasks / tasks.length * 100;
            }

            if (completedProgress === 100) {
                // TODO: stop the timer and show a congratulatory message!
                console.log('All tasks are completed!');
            } else if (completedProgress !== 0) {
                setProgress(completedProgress);
            } else {
                setProgress(completedProgress);
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
