import React, { useEffect, useState } from "react";
import NewTaskTemplate from "../components/newTaskTemplate";
import { AiOutlinePlus } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const home = () => {
  // Toggle new task form
  const [newTask, setNewTask] = useState(false);
  // Current task name
  const [taskName, setTaskName] = useState("");
  // Current task description
  const [taskdescription, setTaskDescription] = useState("");
  // Current task priority
  const [priorityFilter, setPriorityFilter] = useState("all");
  // Store new task name
  const [storedTaskName, setStoredTaskName] = useState("");
  // Store new task description
  const [storedTaskDescription, setStoredTaskDescription] = useState("");
  // Store new task priority
  const [storedPriorityFilter, setStoredPriorityFilter] = useState("");
  // Array of tasks
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );
  // Array of task descriptions
  const [taskdescriptionList, setTaskDescriptionList] = useState(
    JSON.parse(localStorage.getItem("taskDescriptionList")) || []
  );
  // Array of task priorities
  const [taskPriorityList, setTaskPriorityList] = useState(
    JSON.parse(localStorage.getItem("taskPriorityList")) || []
  );
  // Toggle edit mode for tasks
  const [editState, setEditState] = useState(false);
  // Index of the task to be edited
  const [editIndex, setEditIndex] = useState(null);
  //
  const [checkbox, setCheckbox] = useState(false);

  // *Function to toggle the new task form
  const toggleNewTask = () => {
    setNewTask(!newTask);
    if (newTask) {
      setEditState(false);
    }
  };

  // *Function to handle changes in the new task name input field
  const handleTaskNameChange = (e) => {
    setStoredTaskName(e.target.value);
  };

  // *Function to handle changes in the new task description input field
  const handleTaskDescriptionChange = (e) => {
    setStoredTaskDescription(e.target.value);
  };

  // Todo: Function to handle the submission of a new task
  const handleSubmitTask = () => {
    if (storedTaskName === "" || storedTaskDescription === "") {
      alert("Please fill the form");
    } else {
      setTaskName(storedTaskName);
      setTaskDescription(storedTaskDescription);
      setPriorityFilter(storedPriorityFilter);

      // Update the state with the new task and description
      setTaskList([...taskList, storedTaskName]);
      setTaskDescriptionList([...taskdescriptionList, storedTaskDescription]);
      setTaskPriorityList([...taskPriorityList, storedPriorityFilter]);

      // Update localStorage with the new task and description
      localStorage.setItem(
        "taskList",
        JSON.stringify([...taskList, storedTaskName])
      );
      localStorage.setItem(
        "taskDescriptionList",
        JSON.stringify([...taskdescriptionList, storedTaskDescription])
      );
      localStorage.setItem(
        "taskPriorityList",
        JSON.stringify([...taskPriorityList, storedPriorityFilter])
      );

      setStoredTaskName("");
      setStoredTaskDescription("");
      setStoredPriorityFilter("All");
      toggleNewTask();
    }
  };

  // *Load tasks from local storage when the component mounts
  useEffect(() => {
    if (localStorage.getItem("taskList")) {
      setTaskList(JSON.parse(localStorage.getItem("taskList")));
    }
  }, []);

  // *Load task descriptions from local storage when the component mounts
  useEffect(() => {
    if (localStorage.getItem("taskDescriptionList")) {
      setTaskDescriptionList(
        JSON.parse(localStorage.getItem("taskDescriptionList"))
      );
    }
  }, []);

  // *Load task priorities from local storage when the component mounts
  useEffect(() => {
    if (localStorage.getItem("taskPriorityList")) {
      setTaskPriorityList(JSON.parse(localStorage.getItem("taskPriorityList")));
    }
  }, []);

  // !Function to handle deleting all tasks
  const handleDeleteAllTasks = () => {
    localStorage.clear(); // Clear all data from local storage
    setTaskList([]); // Clear the task list state
    setTaskDescriptionList([]); // Clear the task description list state
  };

  // !Function to handle deleting a specific task
  const handleDeleteTask = (index) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
    localStorage.setItem("taskList", JSON.stringify(newTaskList));

    const newTaskDescriptionList = [...taskdescriptionList];
    newTaskDescriptionList.splice(index, 1);
    setTaskDescriptionList(newTaskDescriptionList);
    localStorage.setItem(
      "taskDescriptionList",
      JSON.stringify(newTaskDescriptionList)
    );
  };

  // *Function to handle editing a specific task
  const handleEditTask = (index) => {
    setEditState(!editState); // Toggle the edit mode
    setEditIndex(index); // Set the index of the task to be edited
    toggleNewTask(); // Close the new task form
  };

  // *Function to handle updating a specific task
  const handleUpdateTask = (index) => {
    setEditIndex(index); // Set the index of the task to be edited
    if (storedTaskName === "" && storedTaskDescription === "") {
      alert("Please Edit Something");
    } else {
      const newTaskList = [...taskList];
      if (storedTaskName === "") {
        setStoredTaskName(taskList[index]);
      } else {
        newTaskList[index] = storedTaskName;
      }
      const newTaskDescriptionList = [...taskdescriptionList];
      if (storedTaskDescription === "") {
        setStoredTaskDescription(taskdescriptionList[index]);
      } else {
        newTaskDescriptionList[index] = storedTaskDescription;
      }
      const newTaskPriorityList = [...taskPriorityList];
      if (storedPriorityFilter === "") {
        setStoredPriorityFilter(taskPriorityList[index]);
      } else {
        newTaskPriorityList[index] = storedPriorityFilter;
      }
      setTaskList(newTaskList);
      setTaskDescriptionList(newTaskDescriptionList);
      setTaskPriorityList(newTaskPriorityList);
      localStorage.setItem("taskList", JSON.stringify(newTaskList));
      localStorage.setItem(
        "taskDescriptionList",
        JSON.stringify(newTaskDescriptionList)
      );
      localStorage.setItem(
        "taskPriorityList",
        JSON.stringify(newTaskPriorityList)
      );
      setEditState(!editState); // Toggle the edit mode
      setStoredTaskName("");
      setStoredTaskDescription("");
      toggleNewTask();
    }
  };

  const handlePriorityFilter = (e) => {
    setPriorityFilter(e.target.value); // Update the priorityFilter state
  };

  const togglecheckbox = () => {
    setCheckbox(!checkbox);
    console.log(checkbox);
  };

  return (
    <div className="lg:m-5 md:m-5 mx-3">
      <div className="">
        <div className="lg:-mx-5 md:-mx-5 -mx-3">
          {newTask && (
            <NewTaskTemplate
              newTask={newTask}
              toggleNewTask={toggleNewTask}
              handleSubmitTask={handleSubmitTask}
              handleTaskNameChange={handleTaskNameChange}
              handleTaskDescriptionChange={handleTaskDescriptionChange}
              editState={editState}
              handleUpdateTask={handleUpdateTask}
              index={editIndex}
              priorityFilter={priorityFilter}
            />
          )}
        </div>
        <div className="lg:flex place-items-center">
          <h1 className="text-xl lg:text-3xl text-black dark:text-white text-center lg:text-left md:text-center w-full">
            Welcome Back Again !
          </h1>
          <div className="flex gap-2 lg:justify-end lg:m-0 my-2 justify-center w-full">
            <button
              type="button"
              className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none
            focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 text-center inline-flex items-center
            dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 dark:text-black dark:bg-white dark:hover:text-white"
              onClick={toggleNewTask}
            >
              <AiOutlinePlus className="mr-2" />
              Add Task
            </button>
            <button
              className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none
            focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 text-center inline-flex items-center
            dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 dark:text-black dark:bg-white dark:hover:text-white"
              onClick={handleDeleteAllTasks}
            >
              <RiDeleteBin6Line className="mr-2" />
              Delete All Tasks
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {taskList.map((task, index) => (
            <div
              key={index}
              className="basis-auto lg:basis-[47%] border-2 border-gray-400 p-5 my-3 lg:mx-3 rounded-xl w-full"
            >
              <h1 className="text-base text-left rounded text-black dark:border border-black bg-white w-fit dark:px-3 my-2">
                Task n.o {index + 1}
              </h1>
              <div className="task-name dark:text-white text-3xl text-black underline">
                {task}
              </div>
              <div className="task-description dark:text-white py-2 dark:font-light">
                {taskdescriptionList[index]}
              </div>
              <div>{taskPriorityList}</div>
              <button className={`flex items-center mb-4 border p-3 my-5 rounded w-full border-black bg-white dark:border-0 ${checkbox ? "bg-black" : ""}`}>
                <input
                  onChange={togglecheckbox}
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                />
                <label
                  htmlFor="default-checkbox"
                  className={`ml-2 text-sm font-medium text-black ${checkbox ? "text-white dark:text-white" : ""}`}
                >
                  Default checkbox
                </label>
              </button>
              <div className="justify-end flex">
                <button
                  onClick={() => handleEditTask(index)}
                  className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none
                   focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center
                   dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 dark:text-black dark:bg-white"
                >
                  <FiEdit3 className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none
                   focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center
                   dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 dark:text-black dark:bg-white"
                >
                  <RiDeleteBin6Line className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default home;
