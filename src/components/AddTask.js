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
        <form onSubmit={onSubmit}>
            <div className="flex w-full h-10">
                <label></label>
                <input 
                    type='text' 
                    placeholder='Add New Task' 
                    value={text} 
                    className="w-5/6 rounded-l-lg p-2 text-xl"
                    onChange={(e) => setText(e.target.value)}
                ></input>

                <input 
                    type="submit" 
                    value="+" 
                    className="w-1/6 bg-termly-blue rounded-r-lg text-white text-2xl cursor-pointer"
                ></input>

            </div>
        </form>
    )
}

export default AddTask
