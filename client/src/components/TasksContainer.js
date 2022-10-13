import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const TasksContainer = ({ socket }) => {
    const [tasks, setTasks] = useState({})
    useEffect(() => {
        function fetchTasks(){
            fetch("http://localhost:4000/api")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTasks(data);
            });
        }
        fetchTasks()
    }, []);
    return(
        <div className="container">
       {/**
         * Return an array of each tasks (Uncomment to view the data structure)
         * {Object.entries(tasks).map((task) => console.log(tasks))}
         */}
         {Object.entries(tasks).map((task) =>(
            <div className={`${task[1].title.toLowerCase()}__wrapper`} key={task[1].title}>
                <h3>{task[1].title} Tasks</h3>
                <div className={`${task[1].title.toLowerCase()}__container`}></div>

            
            ))}
        </div>
    )
}

export default TasksContainer