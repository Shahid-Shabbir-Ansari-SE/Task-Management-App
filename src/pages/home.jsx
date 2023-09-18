import React, { useEffect, useState } from "react";
import NewTaskTemplate from "../components/newTaskTemplate";
import { AiOutlinePlus } from "react-icons/ai";

const home = () => {
  const [newTask, setNewTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskdescription, setTaskDescription] = useState("");
  const [storedTaskName, setStoredTaskName] = useState("");
  const [storedTaskDescription, setStoredTaskDescription] = useState("");
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );

  const [taskdescriptionList, setTaskDescriptionList] = useState(
    JSON.parse(localStorage.getItem("taskDescriptionList")) || []
  );

  const toggleNewTask = () => {
    setNewTask(!newTask);
  };
  const handleTaskNameChange = (e) => {
    setStoredTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setStoredTaskDescription(e.target.value);
  };

  const handleSubmitTask = () => {
    if (storedTaskName === "" || storedTaskDescription === "") {
      alert("Please fill the form");
    } else {
      setTaskName(storedTaskName);
      setTaskDescription(storedTaskDescription);

      // Update the state
      setTaskList([...taskList, storedTaskName]);
      setTaskDescriptionList([...taskdescriptionList, storedTaskDescription]);

      // Update localStorage
      localStorage.setItem(
        "taskList",
        JSON.stringify([...taskList, storedTaskName])
      );
      localStorage.setItem(
        "taskDescriptionList",
        JSON.stringify([...taskdescriptionList, storedTaskDescription])
      );

      setStoredTaskName("");
      setStoredTaskDescription("");
      toggleNewTask();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("taskList")) {
      setTaskList(JSON.parse(localStorage.getItem("taskList")));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("taskDescriptionList")) {
      setTaskDescriptionList(
        JSON.parse(localStorage.getItem("taskDescriptionList"))
      );
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
              handleTaskDescriptionChange={handleTaskDescriptionChange}
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
        <div className="grid-container">
          {taskList.map((task, index) => (
            <div key={index} className="grid-item">
              <div className="task-name">{task}</div>
              <div className="task-description">
                {taskdescriptionList[index]}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default home;
