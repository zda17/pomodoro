import { useState } from "react";

import Timer from "./Timer";
import Tasks from "./Tasks";


const Pomodoro = () => {
    return (
        <div className="pomodoro h-screen w-10/12 flex flex-col items-center justify-between py-8">
            <img 
                src="https://termly.io/wp-content/themes/genesis-tly-v4/images/logo.svg" 
                alt="Termly Logo"
                className="h-12 mb-16"
            />

            <Timer />

            <Tasks />
            
        </div>
    )
}

export default Pomodoro
