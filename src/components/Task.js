import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div 
            className="p-2 flex items-center justify-between"
        >
            <div 
                className="flex items-center"
                onClick={() => onToggle(task.id)}
            >
                <div className="mr-2 text-lg">
                    {task.completed === true ? <FontAwesomeIcon icon={faCheckCircle} />  : <FontAwesomeIcon icon={farCircle} />}
                </div>

                <h3 
                    className={'text-black text-lg ' + (task.completed === true ? 'line-through' : '')}
                >
                    {task.text} 
                </h3>
            </div>

            <FontAwesomeIcon 
                icon={faTrash} 
                onClick={() => onDelete(task.id)} 
            />
        </div>
    )
}

export default Task
