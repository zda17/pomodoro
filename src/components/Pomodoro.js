import Timer from "./Timer";
import Tasks from "./Tasks";


const Pomodoro = () => {
    return (
        <div className="pomodoro w-10/12 flex flex-col items-center py-8">
            <div className="h-16">
                <img 
                    src="https://termly.io/wp-content/themes/genesis-tly-v4/images/logo.svg" 
                    alt="Termly Logo"
                    className="h-12"
                />
            </div>

            <Timer />

            <Tasks />
            
        </div>
    )
}

export default Pomodoro
