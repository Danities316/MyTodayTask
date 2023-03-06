import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const TasksContainer = ({ socket }) => {
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

    useEffect(() => {
        socket.on("tasks", (data) => {
            setTasks(data)
        })
    }, [socket]);
    
    const handleDragEnd = ({ destination, source}) => {
        if(!destination){
            return;
        }
        if( destination.index == source.index && destination.droppabledId === source.droppabledId){
            return;
        }
        socket.emit("taskDragged", {
            source,
            destination,
        })
    }
        return (

         <>x
         <div className='container'>

                {/** --- 👇🏻 DragDropContext  ---- */}
                <DragDropContext onDragEnd={handleDragEnd}>
                    {Object.entries(tasks).map((task) => (
                        <div
                            className={`${task[1].title.toLowerCase()}__wrapper`}
                            key={task[1].title}
                        >
                            <h3>{task[1].title} Tasks</h3>
                            <div className={`${task[1].title.toLowerCase()}__container`}>
                                {/** --- 👇🏻 Droppable --- */}
                                <Droppable droppableId={task[1].title}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {task[1].items.map((item, index) => (
                                                    // {/** --- 👇🏻 Draggable --- */}
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`${task[1].title.toLowerCase()}__items`}
                                                        >
                                                            <p>{item.title}</p>
                                                            <p className='comment'>
                                                                <Link to={`/comments/${task[1].title}/${item.id}`}>
                                                                    {item.comments.length > 0
                                                                        ? `View Comments`
                                                                        : "Add Comment"}
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    ))}
                </DragDropContext>
            </div>
            </>
        )