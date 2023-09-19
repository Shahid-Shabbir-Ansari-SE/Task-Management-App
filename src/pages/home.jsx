import React, { useEffect, useState } from "react";
import NewTaskTemplate from "../components/newTaskTemplate";
import { AiOutlinePlus } from "react-icons/ai";

const home = () => {
  // Toggle new task form
  const [newTask, setNewTask] = useState(true);
  // Current task name
  const [taskName, setTaskName] = useState("");
  // Current task description
  const [taskdescription, setTaskDescription] = useState("");
  // Store new task name
  const [storedTaskName, setStoredTaskName] = useState("");
  // Store new task description
  const [storedTaskDescription, setStoredTaskDescription] = useState("");
  // Array of tasks
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );
  // Array of task descriptions
  const [taskdescriptionList, setTaskDescriptionList] = useState(
    JSON.parse(localStorage.getItem("taskDescriptionList")) || []
  );
  // Toggle edit mode for tasks
  const [editState, setEditState] = useState(false);
  // Index of the task to be edited
  const [editIndex, setEditIndex] = useState(null);

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

      // Update the state with the new task and description
      setTaskList([...taskList, storedTaskName]);
      setTaskDescriptionList([...taskdescriptionList, storedTaskDescription]);

      // Update localStorage with the new task and description
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
    if (storedTaskName === "" || storedTaskDescription === "") {
      alert("Please fill the form");
    } else {
      const newTaskList = [...taskList];
      newTaskList[index] = storedTaskName;
      const newTaskDescriptionList = [...taskdescriptionList];
      newTaskDescriptionList[index] = storedTaskDescription;
      setTaskList(newTaskList);
      setTaskDescriptionList(newTaskDescriptionList);
      localStorage.setItem("taskList", JSON.stringify(newTaskList));
      localStorage.setItem(
        "taskDescriptionList",
        JSON.stringify(newTaskDescriptionList)
      );
      setEditState(!editState); // Toggle the edit mode
      setStoredTaskName("");
      setStoredTaskDescription("");
      toggleNewTask();
    }
  };

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
              editState={editState}
              handleUpdateTask={handleUpdateTask}
              index={editIndex}
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
              <button onClick={() => handleEditTask(index)}>Edit</button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </div>
          ))}
          <button onClick={handleDeleteAllTasks}>Delete All Tasks</button>
        </div>
      </div>
    </div>
  );
};

export default home;
