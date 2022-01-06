import { useState } from 'react';

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [completed, setCompleted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text) {
            alert('Please add a task');
            return;
        }

        onAdd({ text, completed });

        setText('');
        setCompleted(false);
    }

    return (
        <form className="add-task-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>
                    Task Name
                </label>
                <input 
                    type='text' 
                    placeholder='Add Task' 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                ></input>
            </div>

            <input 
                type="submit" 
                value="Save Task" 
                className="bg-red-700"
            />

        </form>
    )
}

export default AddTask
