import {useState, useEffect} from "react";

import Task from './Task';
import AddTask from './AddTask';
import ProgressBar from './ProgressBar';

// TODO: move tracking progress state up one level from ProgressBar.js to here, so that I can use
// it in Timer.js to display different alerts

const Tasks = ({ toggleTimer, timerActive }) => {
    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState(0);

    const clearConfetti = () => {
        const canvas = document.querySelector('#confetti');
        canvas.style.display = "none";
    }

    // I copied this code from an external library, so I'm collapsing it for space's sake
    const confetti = () => {
        const canvas = document.querySelector('#confetti');

        canvas.style.display = "block";

        const w = canvas.width = window.innerWidth;
        const h = canvas.height = window.innerHeight * 2;

        function loop() {
            requestAnimationFrame(loop);
                ctx.clearRect(0,0,w,h);
            
            confs.forEach((conf) => {
                conf.update();
                conf.draw();
            })
        }

        function Confetti () {
            //construct confetti
            const colours = ['#fde132', '#009bde', '#ff6b00'];
            
            this.x = Math.round(Math.random() * w);
            this.y = Math.round(Math.random() * h)-(h/2);
            this.rotation = Math.random()*360;

            const size = Math.random()*(w/60);
            this.size = size < 15 ? 15 : size;

            this.color = colours[Math.floor(colours.length * Math.random())];
            this.speed = this.size/7;
            this.opacity = Math.random();
            this.shiftDirection = Math.random() > 0.5 ? 1 : -1;
        }

        Confetti.prototype.border = function() {
            if (this.y >= h) {
                this.y = h;
            }
        }

        Confetti.prototype.update = function() {
        this.y += this.speed;
        
        if (this.y <= h) {
            this.x += this.shiftDirection/3;
            this.rotation += this.shiftDirection*this.speed/100;
        }

        if (this.y > h) 
            this.border();
        };

        Confetti.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, this.rotation, this.rotation+(Math.PI/2));
            ctx.lineTo(this.x, this.y);
            ctx.closePath();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.fill();
        };

        const ctx = canvas.getContext('2d');
        const confNum = Math.floor(w / 4);
        const confs = new Array(confNum).fill().map(_ => new Confetti());

        loop();

        // clear confetti after 10 seconds so user can continue using the app.
        setTimeout(clearConfetti, 10000);
    }

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }

        getTasks();
    }, [])

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
