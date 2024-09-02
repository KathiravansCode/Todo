import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import TaskCard from "./Components/TaskCard";
import { SignedIn, SignedOut, SignInButton, UserButton,useUser,useAuth } from "@clerk/clerk-react";
import Intro from "./Components/Intro";
const firebaseUrl='https://todo-app-14261-default-rtdb.asia-southeast1.firebasedatabase.app/'
function App() {
let {register,handleSubmit,reset}=useForm(true);
let [status,setStatus]=useState(true);
let [todos,setTodos]=useState([]);
let {user}=useUser();
let {isSignedIn}=useAuth()
function submitHandler(data){
  let task=data.taskInput;

  setStatus(false)
  axios.post(`${firebaseUrl}todos.json`,{
    title:task,
    by:user.firstName
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
    <SignedIn>
    <h1 className="bg-violet-600 text-white text-center text-lg p-3">“Make each day your masterpiece.” ―John Wooden</h1>
    <div className="mt-2 ml-6 rounded-lg">
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    
    </div>
    <div className="w-[380px] mt-8 mx-auto p-2">
      <h1 className="text-lg text-center">Welcome back to task manager! {isSignedIn? user.firstName:""}</h1>
    <form action="" onSubmit={handleSubmit(submitHandler)} >
      <div className="text-center">
         <input type="text" {...register("taskInput")} className="w-full border p-3 mt-4 rounded-lg" placeholder="Enter the task..e.g.'Learn Coding'" />
      </div>
      <input type="submit" value={status?"Add task":"Submitting.."} className="w-[100px] bg-violet-300 text-violet-900  mt-3 p-2 rounded-lg hover:cursor-pointer" />
    </form>
    </div>
    <div>
    {
     todos.filter(todo=>isSignedIn?todo.by==user.firstName:true).map(todocall=> <TaskCard id={todocall.id} title={todocall.title} deleteHandler={deleteHandler}/>)
    }
    </div>
    </SignedIn>
    <SignedOut>
    <SignInButton className="mt-2 ml-6 rounded-lg" />
      <Intro/>
    </SignedOut>
    </>
  )
}

export default App
