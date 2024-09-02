import React, { useState } from 'react'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
function TaskCard({id,title,deleteHandler}) {
    function handleDelete(){
        deleteHandler(id)
    }
    let [status,updateStatus]=useState(false);
  return (
    <>
      <div className="w-[380px] mx-auto mt-4 border p-3 rounded-lg">
      <p>{title}</p>
      <div className="flex gap-3 items-center mt-2">
         <button onClick={()=>{
            updateStatus(!status)
         }} className="flex gap-1 items-center hover:text-green-700">
         <IoCheckmarkCircleOutline  />
          <p >{!status?"Mark as done":"Unmark"}</p>
         </button>
         <button onClick={handleDelete} className="flex gap-1 items-center hover:text-red-600">
         <RiDeleteBin6Line />
          <p>Delete Task</p>
         </button>
      </div>
      </div>
    </>
  )
}

export default TaskCard
