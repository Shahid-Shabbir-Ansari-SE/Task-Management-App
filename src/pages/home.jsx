import React, { useEffect, useState } from "react";
import NewTaskTemplate from "../components/newTaskTemplate";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCheckbox } from "react-icons/bi";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const home = () => {
  // Toggle new task form
  const [newTask, setNewTask] = useState(false);
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
  // Array of task priorities
  // Toggle edit mode for tasks
  const [editState, setEditState] = useState(false);
  // Index of the task to be edited
  const [editIndex, setEditIndex] = useState(null);
  // Array of task checkbox states
  const [taskCheckboxStates, setTaskCheckboxStates] = useState(
    Array(taskList.length).fill(false)
  );
  const [selectedPriority, setSelectedPriority] = useState("");

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
    if (
      storedTaskName === "" ||
      storedTaskDescription === "" ||
      selectedPriority === ""
    ) {
      alert("Please fill the form and select a priority");
    } else {
      const newTask = {
        name: storedTaskName,
        description: storedTaskDescription,
        priority: selectedPriority, // Set the selected priority
      };

      // Update the state with the new task
      setTaskList([...taskList, newTask]);

      // Update localStorage with the new task
      localStorage.setItem("taskList", JSON.stringify([...taskList, newTask]));

      // Clear the input fields and selected priority
      setStoredTaskName("");
      setStoredTaskDescription("");
      setSelectedPriority("");

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
  // *Function to handle updating a specific task
  const handleUpdateTask = (index) => {
    if (
      storedTaskName === "" &&
      storedTaskDescription === "" &&
      selectedPriority === ""
    ) {
      alert("Please Edit Something");
    } else {
      const updatedTaskList = [...taskList];
      const updatedTask = updatedTaskList[index];

      // Update the task object if the name, description, or priority are not empty
      if (storedTaskName !== "") {
        updatedTask.name = storedTaskName;
      }
      if (storedTaskDescription !== "") {
        updatedTask.description = storedTaskDescription;
      }
      if (selectedPriority !== "") {
        updatedTask.priority = selectedPriority;
      }

      // Update the task list with the updated task
      updatedTaskList[index] = updatedTask;

      // Update the state and local storage
      setTaskList(updatedTaskList);
      localStorage.setItem("taskList", JSON.stringify(updatedTaskList));

      // Clear the stored values and toggle the edit mode
      setStoredTaskName("");
      setStoredTaskDescription("");
      setSelectedPriority("");
      setEditState(false);
      toggleNewTask(!newTask);
    }
  };

  const toggleCheckbox = (index) => {
    const newCheckboxStates = [...taskCheckboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setTaskCheckboxStates(newCheckboxStates);
    localStorage.setItem(
      "taskCheckboxStates",
      JSON.stringify(newCheckboxStates)
    );
  };
  useEffect(() => {
    const storedTaskCheckboxStates = localStorage.getItem("taskCheckboxStates");
    if (storedTaskCheckboxStates) {
      setTaskCheckboxStates(JSON.parse(storedTaskCheckboxStates));
    }
  }, []);
  // Inside your home component
  const handlePriorityChange = (selectedPriority) => {
    // You can now use the selectedPriority value as needed in your home component.
    // For example, you can set it in a state variable to display it.
    setSelectedPriority(selectedPriority);
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
              selectedPriority={selectedPriority} // Pass the selected priority as a prop
              handlePriorityChange={handlePriorityChange} // Pass the callback function as a prop
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
                {task.name} {/* Render the task name */}
              </div>
              <div className="task-description dark:text-white py-2 dark:font-light">
                {task.description} {/* Render the task description */}
              </div>
              <div>
                <div>{task.priority}</div>
              </div>
              <button
                className={`flex items-center mb-4 border-2 py-1 px-2 my-5 rounded w-full border-black text-black cursor-pointer ${
                  taskCheckboxStates[index]
                    ? "bg-black dark:bg-white dark:border-white dark:text-white"
                    : "text-black bg-transparent dark:border-white"
                }`}
                onClick={() => toggleCheckbox(index)}
              >
                {taskCheckboxStates[index] ? (
                  <BiSolidCheckboxChecked className="text-3xl text-white dark:text-black" />
                ) : (
                  <BiCheckbox className="text-3xl text-black dark:text-white" />
                )}
                <label
                  htmlFor="default-checkbox"
                  className={`ml-2 text-sm font-medium text-black cursor-pointer ${
                    taskCheckboxStates[index]
                      ? "text-white dark:text-black "
                      : "dark:text-white"
                  }`}
                >
                  {taskCheckboxStates[index]
                    ? "Completed"
                    : "Mark as Completed"}
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
