import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div 
            className="p-2 flex items-center justify-between"
        >
            <div 
                className="flex items-center cursor-pointer"
                onClick={() => onToggle(task.id)}
            >
                <div className="mr-2 text-md">
                    {task.completed === true ? <FontAwesomeIcon icon={faCheckCircle} />  : <FontAwesomeIcon icon={farCircle} />}
                </div>

                <h3 
                    className={'text-black text-md ' + (task.completed === true ? 'line-through' : '')}
                >
                    {task.text} 
                </h3>
            </div>

            <FontAwesomeIcon 
                icon={faTrash}
                className="cursor-pointer" 
                onClick={() => onDelete(task.id)} 
            />
        </div>
    )
}

export default Task
