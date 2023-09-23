import React, { useEffect, useState } from "react";
import NewTaskTemplate from "../components/newTaskTemplate";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCheckbox } from "react-icons/bi";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

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
  const [editState, setEditState] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [taskCheckboxStates, setTaskCheckboxStates] = useState(
    Array(taskList.length).fill(false)
  );
  const [selectedPriority, setSelectedPriority] = useState("");

  const toggleNewTask = () => {
    setNewTask(!newTask);
    if (newTask) {
      setEditState(false);
    }
  };

  const handleTaskNameChange = (e) => {
    setStoredTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (e) => {
    setStoredTaskDescription(e.target.value);
  };

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
        priority: selectedPriority,
      };

      setTaskList([...taskList, newTask]);
      localStorage.setItem("taskList", JSON.stringify([...taskList, newTask]));
      setStoredTaskName("");
      setStoredTaskDescription("");
      setSelectedPriority("");

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

  const handleDeleteAllTasks = () => {
    localStorage.clear();
    setTaskList([]);
    setTaskDescriptionList([]);
  };

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

  const handleEditTask = (index) => {
    setEditState(!editState);
    setEditIndex(index);
    toggleNewTask();
  };

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

      if (storedTaskName !== "") {
        updatedTask.name = storedTaskName;
      }
      if (storedTaskDescription !== "") {
        updatedTask.description = storedTaskDescription;
      }
      if (selectedPriority !== "") {
        updatedTask.priority = selectedPriority;
      }

      updatedTaskList[index] = updatedTask;

      setTaskList(updatedTaskList);
      localStorage.setItem("taskList", JSON.stringify(updatedTaskList));

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

  const handlePriorityChange = (selectedPriority) => {
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
              selectedPriority={selectedPriority}
              handlePriorityChange={handlePriorityChange}
            />
          )}
        </div>
        <div className="lg:flex place-items-center">
          <h1 className="text-xl pt-5 lg:p-0 md:pt-0 lg:text-3xl text-black dark:text-white text-center lg:text-left md:text-center w-full">
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
              <div className="dark:text-white text-3xl text-black underline">
                {task.name}
              </div>
              <div className="dark:text-white py-2 dark:text-light">
                {task.description}
              </div>
              <div>
                <div className="lg:w-1/3 md:w-1/3 w-full flex rounded p-2 dark:text-light border-2 dark:bg-white dark:text-black">
                  Priority: <div className="text-blue-800 font-semibold ml-2">{task.priority}</div>
                </div>
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
