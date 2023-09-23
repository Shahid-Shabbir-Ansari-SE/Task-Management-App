import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";

const Filters = () => {
  const [taskListFromLocalStorage, setTaskListFromLocalStorage] = useState([]);
  const [taskCompletionStates, setTaskCompletionStates] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(null);

  useEffect(() => {
    const storedTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    const storedTaskCompletionStates =
      JSON.parse(localStorage.getItem("taskCheckboxStates")) || [];

    setTaskListFromLocalStorage(storedTaskList);
    setTaskCompletionStates(storedTaskCompletionStates);
  }, []);

  const completedTasks = taskListFromLocalStorage.filter((task, index) => {
    return taskCompletionStates[index];
  });

  const nonCompletedTasks = taskListFromLocalStorage.filter((task, index) => {
    return !taskCompletionStates[index];
  });

  const filteredTasks = taskListFromLocalStorage.filter(
    (task) => selectedPriority === null || task.priority === selectedPriority
  );

  const handlePriorityButtonClick = (priority) => {
    setSelectedPriority(priority);
  };

  return (
    <div className="my-5 lg:flex">
      <div className="lg:w-[33%]">
        <div className="text-center text-lg dark:text-white">
          Completed Tasks
        </div>
        <div className="">
          <div className="m-3 lg:border-r lg:border-0 border-b">
            {completedTasks.map((task, index) => (
              <div className=" p-3 mx-4" key={index}>
                <h1 className="flex text-base items-center text-left rounded text-black dark:border border-black bg-white my-2 -mx-2 p-0">
                  <BsDot className="text-3xl" />
                  Task n.o {index + 1}
                </h1>
                <div className="dark:text-white text-3xl text-black underline">
                  {task.name}
                </div>
                <div className="dark:text-white py-2 dark:font-light">
                  {task.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-[33%]">
        <div className="text-center text-lg dark:text-white my-5 lg:my-0">
          Pending Tasks
        </div>
        <div className="">
          <div className="m-3">
            {nonCompletedTasks.map((task, index) => (
              <div className=" p-3 mx-4" key={index}>
                <h1 className="flex text-base items-center text-left rounded text-black dark:border border-black bg-white my-2 -mx-2 p-0">
                  <BsDot className="text-3xl" />
                  Task n.o {index + 1}
                </h1>
                <div className="dark:text-white text-3xl text-black underline">
                  {task.name}
                </div>
                <div className="dark:text-white py-2 dark:font-light">
                  {task.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-[33%] justify-center h-full lg:border-0 border-t mx-4">
        <div className="text-center text-lg dark:text-white my-5 lg:my-0">
          Priority Tasks
        </div>
        <div className="lg:border-l mx-4">
          <div className="m-3 flex gap-3 justify-center">
          <button
              type="button"
              className={`${
                selectedPriority === "Low" ? "bg-blue-500 text-white dark:bg-white dark:text-black" : "bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
              } px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:border-gray-600`}
              onClick={() => handlePriorityButtonClick("Low")}
            >
              Low
            </button>
            <button
              type="button"
              className={`${
                selectedPriority === "Medium" ? "bg-blue-500 text-white dark:bg-white dark:text-black" : "bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
              } px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:border-gray-600`}
              onClick={() => handlePriorityButtonClick("Medium")}
            >
              Medium
            </button>
            <button
              type="button"
              className={`${
                selectedPriority === "High" ? "bg-blue-500 text-white dark:bg-white dark:text-black" : "bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
              } px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:border-gray-600`}
              onClick={() => handlePriorityButtonClick("High")}
            >
              High
            </button>
          </div>
          <div className="m-3">
            {filteredTasks.map((task, index) => (
              <div className=" p-3" key={index}>
                <h1 className="flex text-base items-center text-left rounded text-black dark:border border-black bg-white my-2 -mx-2 p-0">
                  <BsDot className="text-3xl" />
                  Task n.o {index + 1}
                </h1>
                <div className="dark:text-white text-3xl text-black underline">
                  {task.name}
                </div>
                <div className="dark:text-white py-2 dark:font-light">
                  {task.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
