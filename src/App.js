import Pomodoro from "./components/Pomodoro";

const App = () => {
  return (
    <div 
      className="App h-screen bg-white flex flex-col items-center justify-center 
      md:bg-termly-blue 
      lg:bg-termly-blue 
      xl:bg-termly-blue 
      2xl:bg-termly-blue"
    >
      <Pomodoro />
    </div>
  );
}

export default App;
