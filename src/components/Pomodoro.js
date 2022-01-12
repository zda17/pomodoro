import Timer from "./Timer";
import Logo from "./Logo";


const Pomodoro = () => {
    return (
        <div 
            className="pomodoro w-10/12 flex flex-col
            md:w-1/2 md:shadow-lg md:rounded-lg md:p-8 md:bg-white
            lg:w-1/3 lg:shadow-lg lg:rounded-lg lg:p-8 lg:bg-white 
            xl:w-1/4 xl:shadow-lg xl:rounded-lg xl:p-8 xl:bg-white
            2xl:w-1/5 2xl:shadow-lg 2xl:rounded-lg 2xl:p-8 2xl:bg-white"
        >
            <Logo />
            
            <Timer />
        </div>
    )
}

export default Pomodoro
