import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const newTaskTemplate = ({newTask, toggleNewTask}) => {
  return (
      <div className="h-screen flex items-center fixed w-[calc(100vw-255px)]">
      <div className="z-50 w-96 mx-auto p-7 grid shadow-2xl border-2 border-gray-200 rounded-lg dark:border-gray-700 dark:shadow-black relative">
        <AiFillCloseCircle className="absolute top-0 right-0 mr-5 mt-5 fill-red-700 text-xl cursor-pointer"onClick={toggleNewTask}/>
        <div className="py-2">
          <label
            for="first_name"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Task Name
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Design Project UI"
            required
          />
        </div>
        <div className="py-2">
          <label
            for="message"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Description
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Briefly describe the task's objective or what needs to be done..."
          ></textarea>
        </div>
        <div className="py-2">
          <label
            for="countries"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Priority
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-12 text-center py-2.5 mt-2 mx-20 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Default
        </button>
      </div>
      </div>
  );
};

export default newTaskTemplate;
