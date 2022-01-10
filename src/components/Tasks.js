import {useState, useEffect} from "react";

import Task from './Task';
import AddTask from './AddTask';
import ProgressBar from './ProgressBar';

// I copied this "confetti" code from an external source, so moving it out of the way
// just thought it would be a nice creative touch upon task completion
import confetti from '../methods/Confetti.js'

// TODO: I could also track the start time and end time of each task, then calculate how long that task
// took to complete and display that timestamp next to each task upon completion.
// On top of that, I could disable "completing" any other tasks until the current task is done?
// Should I then make tasks draggable by priority?

const Tasks = ({ toggleTimer, timerActive, setAlert, setCurrentTask }) => {
    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }

        getTasks();
    }, [])

    useEffect(() => {
        const getCurrentTask = () => {
            let currentTask = tasks.find((task) => task.completed === false);

            if (currentTask) {
                currentTask = currentTask.text;
                setCurrentTask(currentTask);
            }
        }

        getCurrentTask();
    }, [tasks])

    useEffect(() => {
        const tasksProgress = () => {
            let completedProgress;
            let completedTasks = tasks.filter((task) => task.completed).length;

            if (completedTasks) {
                completedProgress = completedTasks / tasks.length * 100;
                setProgress(completedProgress);
            }

            if (completedProgress === 100) {
                confetti();
                setAlert(
                    <> 
                        <span className="font-bold text-xl">You're an absolute machine. You completed all tasks!</span> 
                        {/* TODO: Could show how much time is left (across all rounds) */}
                    </>
                )
                // if someone stops timer then completes last task
                // dont start the timer again
                if (timerActive) {
                    toggleTimer();
                }
            }
        }

        tasksProgress();
    }, [tasks])

    // Fetch all tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        const data = await res.json();

        return data;
    }

    // Fetch individual task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();

        return data;
    }

    // Add task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task),
        });
        const data = await res.json();

        setTasks([...tasks, data]);
    }
 
    // Delete task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        });

        setTasks(tasks.filter((task) => task.id !== id));
    }

    // Toggle complete
    const toggleComplete = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updatedTask = {...taskToToggle, completed: !taskToToggle.completed};

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        const data = await res.json();

        setTasks(tasks.map((task) => task.id === id ? { ...task, completed: data.completed } : task));

        // TODO: after task is completed, delay its deletion for 2 seconds for a nice/smooth UX
        // if (updatedTask.completed === true) {
        //     setTimeout(deleteTask, 2000, updatedTask.id);
        // }
    }
    
    return (
        <div className="w-full">
            <AddTask onAdd={addTask} />

            <ProgressBar progress={progress} />
            
            <div className="h-40 overflow-y-scroll shadow-inner p-2 rounded-b-lg">
                {tasks.map((task) => (
                    <Task 
                        key={task.id} 
                        task={task} 
                        onDelete={deleteTask}
                        onToggle={toggleComplete}
                    />
                ))}
            </div>
        </div>
    )
}

export default Tasks
