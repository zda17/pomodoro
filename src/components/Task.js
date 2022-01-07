import { FaTimes, FaCircle, FaCheckCircle } from 'react-icons/fa';

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div 
            className="m-2 p-2 flex items-center justify-between"
        >
            <div 
                className="flex items-center"
                onClick={() => onToggle(task.id)}
            >
                <div className="mr-2 text-2xl">
                    {task.completed === true ? <FaCheckCircle  />  : <FaCircle />}
                </div>

                <h3 
                    className={'text-black text-2xl ' + (task.completed === true ? 'line-through' : '')}
                >
                    {task.text} 
                </h3>
            </div>

            <FaTimes onClick={() => onDelete(task.id)} />
        </div>
    )
}

export default Task
