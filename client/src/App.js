import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Comments from "./components/Comment";
import Task from "./components/Task";
import Login from "./components/Login";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element = {<Login />} />
    <Route path='/task' element = {<Task />} />
    <Route path='/comments/:category/:id' element = {<Comments />} />

   </Routes>
   </BrowserRouter>
  );
}

export default App;
// https://dev.to/novu/building-a-beautiful-kanban-board-with-nodejs-react-and-websockets-39dk