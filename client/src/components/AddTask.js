import React, { useState} from "react";

const AddTask = ({ socket}) => {
    const [task, seTask] = useState("");
    
    const handleAddTodo = (event) =>{
        //prevent the event from being triggered automatically
        event.preventDefauld();
        console.log({task})
        setTask("")
    };
    return (
        <form className="form__input" onSubmit={handleAddTodo}>
            <label htmlFor="task">Add Task</label>
            <input 
            type= 'text'
            name = 'task'
            id ='task'
            value ={ task }
            className = 'input'
            required
            onChange={(event) => seTask(event.target.value)}
            />
            <button className="addTodoBtn">ADD TASK</button>
        </form>
    )
     
}

export default AddTask