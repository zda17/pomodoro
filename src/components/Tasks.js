import {useState, useEffect} from "react";

import Task from './Task';
import AddTask from './AddTask';

const Tasks = ({ toggleAddTaskForm }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }

        getTasks();
    }, [])

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
    }
    
    return (
        <div className="w-full">
            <AddTask onAdd={addTask} />

            <hr className="my-8 text-slate-300" />
            
            {tasks.map((task) => (
                <Task 
                    key={task.id} 
                    task={task} 
                    onDelete={deleteTask}
                    onToggle={toggleComplete}
                />
            ))}
        </div>
    )
}

export default Tasks
