import React, {useEffect, useState } from "react";
import socketIO from "socket.io-client"
// import { params } from "react-router-dom"

const socket = socketIO.connect("http://localhost:4000")

const Comments = () => {
    const [ comment, setComment] = useState("")

    const addComment = (event) => {
        event.preventDefault()
        console.log({
            comment,
            userId: localStorage.getItem("userId")
        });
        setComment("")
    }

    return (
        <div className="comments__container">
            <form className="comment__form" onSubmit={addComment}>
                <label htmlFor="comment">Add A Comment</label>
                <textarea 
                placeholder="Type Your Comments....."
                value={comment}
                onChange ={(event) => setComment(event.target.value)}
                rows ={5}
                id = "comment"
                name="comment"
                required></textarea>
                <button className="commentBtn">ADD COMMENT</button>
            </form>


            <div className="comments_section">
                <h2>Existing Comments</h2>
                <div></div>
            </div>
        </div>
    )
}

export default Comments