import React, { useEffect, useState } from "react";
import NewTaskTemplate from "../components/newTaskTemplate";
import { AiOutlinePlus } from "react-icons/ai";

const home = () => {
  const [newTask, setNewTask] = useState(true);
  const [taskName, setTaskName] = useState("");
  const [storedTaskName, setStoredTaskName] = useState("");
  const [taskList, setTaskList] = useState([]);

  const toggleNewTask = () => {
    setNewTask(!newTask);
  };
  const handleTaskNameChange = (e) => {
    setStoredTaskName(e.target.value);
  };
  const handleSubmitTask = () => {
    if (storedTaskName === "") {
      alert("Please fill the form");
    } else {
      setTaskName(storedTaskName);
      localStorage.setItem(
        "taskList",
        JSON.stringify([...taskList, storedTaskName])
      );
      setStoredTaskName("");
      toggleNewTask();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("taskList")) {
      setTaskList(JSON.parse(localStorage.getItem("taskList")));
    }
  }, []);
  return (
    <div className="">
      <div>
        <div className="">
          {newTask && (
            <NewTaskTemplate
              newTask={newTask}
              toggleNewTask={toggleNewTask}
              handleSubmitTask={handleSubmitTask}
              handleTaskNameChange={handleTaskNameChange}
            />
          )}
        </div>
        <button
          type="button"
          className="flex items-center text-gray-900 bg-white border border-[#1C1D22] focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-[#1C1D22] dark:text-white dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={toggleNewTask}
        >
          <AiOutlinePlus className="mr-2" />
          Add Task
        </button>
        <ul>
          {taskList.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default home;
