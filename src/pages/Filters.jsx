import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";

const Filters = () => {
  const [taskListFromLocalStorage, setTaskListFromLocalStorage] = useState([]);
  const [taskCompletionStates, setTaskCompletionStates] = useState([]);
  const [
    taskdescriptionListFromLocalStorage,
    setTaskDescriptionListFromLocalStorage,
  ] = useState([]);

  useEffect(() => {
    const storedTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
    const storedTaskCompletionStates =
      JSON.parse(localStorage.getItem("taskCheckboxStates")) || [];
    const storedTaskDescription =
      JSON.parse(localStorage.getItem("taskDescriptionList")) || [];

    setTaskListFromLocalStorage(storedTaskList);
    setTaskDescriptionListFromLocalStorage(storedTaskDescription);
    setTaskCompletionStates(storedTaskCompletionStates);
  }, []);

  // Separate completed and non-completed tasks
  const completedTasks = taskListFromLocalStorage.filter((task, index) => {
    return taskCompletionStates[index];
  });

  const nonCompletedTasks = taskListFromLocalStorage.filter((task, index) => {
    return !taskCompletionStates[index];
  });

  return (
    <div className="my-5 lg:flex">
      <div className="lg:w-[33%]">
        <div className="text-center text-lg dark:text-white">
          Completed Tasks
        </div>
        <div className="">
          <div className="m-3">
            {completedTasks.map((task, index) => (
              <div className=" p-3 mx-4" key={index}>
                <h1 className="flex text-base items-center text-left rounded text-black dark:border border-black bg-white my-2 -mx-2 p-0">
                  <BsDot className="text-3xl" />
                  Task n.o {index + 1}
                </h1>
                <div className="dark:text-white text-3xl text-black underline">
                  {task}
                </div>
                <div className="dark:text-white py-2 dark:font-light">
                  {taskdescriptionListFromLocalStorage[index]}
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
                  {task}
                </div>
                <div className="dark:text-white py-2 dark:font-light">
                  {taskdescriptionListFromLocalStorage[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      <div className="lg:w-[33%]">

      </div>
    </div>
  );
};

export default Filters;
