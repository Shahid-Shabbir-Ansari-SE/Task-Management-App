import React, { useState } from "react";
import NewTaskTemplate from "../components/newTaskTemplate";
import { AiOutlinePlus } from "react-icons/ai";

const home = () => {
  const [newTask, setNewTask] = useState(false);
  const toggleNewTask = () => {
    setNewTask(!newTask);
  }
  return (
    <div className="">
      <div>
      <div className="">
      {newTask && <NewTaskTemplate newTask={newTask} toggleNewTask={toggleNewTask} />}
      </div>
        <button
          type="button"
          className="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={toggleNewTask}
        ><AiOutlinePlus className="mr-2"/>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default home;
