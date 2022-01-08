import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
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
                <div className="mr-2 text-sm">
                    {task.completed === true ? <FontAwesomeIcon className='text-termly-blue' icon={faCheckCircle} />  : <FontAwesomeIcon icon={farCircle} />}
                </div>

                <h3 
                    className={'text-black text-sm ' + (task.completed === true ? 'line-through' : '')}
                >
                    {task.text} 
                </h3>
            </div>

            <FontAwesomeIcon 
                icon={faTimes}
                className="cursor-pointer" 
                onClick={() => onDelete(task.id)} 
            />
        </div>
    )
}

export default Task
