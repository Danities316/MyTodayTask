import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = (event) =>{
        event.preventDefault();
        //saves the username to local storage
        localStorage.setItem("userId", username )
        setUsername("")
        //redirect to the Tasks page
        navigate("/tasks")
    };
    return (
        <div className='login__container'>
            <form className='login_form' onSubmit={handleLogin}>
                <label htmlFor='username'> Username </label>
                <input
                type= 'text'
                name = 'username'
                id = 'username'
                required
                onchange={(e) => setUsername(e.target.value)}
                value ={ username} 
                />
                <button>SIGN IN</button>
            </form>

        </div>
    )
}

export default Login;