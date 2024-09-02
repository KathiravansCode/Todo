import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import TaskCard from "./Components/TaskCard";
const firebaseUrl='https://todo-app-14261-default-rtdb.asia-southeast1.firebasedatabase.app/'
function App() {
let {register,handleSubmit,reset}=useForm(true);
let [status,setStatus]=useState(true);
let [todos,setTodos]=useState([]);
let arr1=[]
function submitHandler(data){
  let task=data.taskInput;

  setStatus(false)
  axios.post(`${firebaseUrl}todos.json`,{
    title:task,

  }).then(()=>{
    fetchTodos()
    setStatus(true);
  })
  reset();
}
function fetchTodos(){
  
   axios.get(`${firebaseUrl}todos.json`).then((todos)=>{
     let temptodos=[]
    for(let key in todos.data){
      let todo={
        id:key,
        ...todos.data[key]
      }
      temptodos.push(todo)
    }
    setTodos(temptodos)
   
   })
   
}
function deleteHandler(id){
  axios.delete(`${firebaseUrl}todos/${id}.json`).then(()=>{
    fetchTodos();
  })
}
useEffect(()=>{
  fetchTodos()
},[])

  return (
    <>
    <h1 className="bg-violet-600 text-white text-center text-lg p-3">“Make each day your masterpiece.” ―John Wooden</h1>
    <div className="w-[380px] mt-8 mx-auto p-2">
      <h1 className="text-lg text-center">Welcome back to task manager!</h1>
    <form action="" onSubmit={handleSubmit(submitHandler)} >
      <div className="text-center">
         <input type="text" {...register("taskInput")} className="w-full border p-3 mt-4 rounded-lg" placeholder="Enter the task..e.g.'Learn Coding'" />
      </div>
      <input type="submit" value={status?"Add task":"Submitting.."} className="w-[100px] bg-violet-300 text-violet-900  mt-3 p-2 rounded-lg hover:cursor-pointer" />
    </form>
    </div>
    {
     todos.map(todocall=> <TaskCard id={todocall.id} title={todocall.title} deleteHandler={deleteHandler}/>)
    }
    </>
  )
}

export default App
