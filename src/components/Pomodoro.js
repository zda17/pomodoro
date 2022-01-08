import Timer from "./Timer";
import Tasks from "./Tasks";


const Pomodoro = () => {
    return (
        <div className="w-10/12 md:w-1/2 lg:w-1/5 xl:w-1/5 2xl:w-1/6 flex flex-col py-8">
            <div className="h-16 flex justify-center">
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
