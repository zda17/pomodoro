import {useState, useEffect} from "react";

const ProgressBar = ({ tasks, toggleTimer }) => {
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
                setProgress(completedProgress);
                toggleTimer();
                confetti();
            } else {
                setProgress(completedProgress);
            }
        }

        tasksProgress();
    }, [tasks])

    const clearConfetti = () => {
        const canvas = document.querySelector('#confetti');
        canvas.style.display = "none";
    }

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

    return (
        <>
            <progress 
                id="file" 
                max="100"
                className="progress-bar w-full"
                value={progress}>
                {progress}
            </progress>
            {/* styling is in index.css for simplicity */}

            <canvas id="confetti"></canvas>
        </>
    )
}

export default ProgressBar
