import React from "react";
import NewTaskTemplate from "../components/newTaskTemplate";

const home = () => {
  const toggleNewTask = () => {
    alert("New task button clicked");
  };
  return (
    <div className="">
      <div className="">
        <NewTaskTemplate />
      </div>
      <div>
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={toggleNewTask}
        >
          Light
        </button>
      </div>
    </div>
  );
};

export default home;
