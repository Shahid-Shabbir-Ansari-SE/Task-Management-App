import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCloseCircle,AiOutlineAreaChart,AiOutlineBarChart,AiOutlineLineChart } from "react-icons/ai";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { MdOutlineTask } from "react-icons/md";
const sidebar = ({ darkMode, toggleDarkMode }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const sidebarstyle = {
    transform: showSidebar ? "translateX(0)" : "",
  };
  return (
    <div>
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          type="button"
          className="flex items-center p-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <h1 className="text-[21px] font-Poppins mx -3 text-gray-600 dark:text-white">
          OrganizeMeNow
        </h1>
      </div>
      <aside
        style={sidebarstyle}
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <AiFillCloseCircle
          className="absolute top-0 right-0 mr-5 my-5 fill-red-700 text-2xl cursor-pointer lg:hidden md:hidden"
          onClick={toggleSidebar}
        />
        <div className="h-full px-3 py-10 lg:py-3 md:py-3 overflow-y-auto bg-gray-50 dark:bg-[#1C1D22]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdOutlineTask className="text-2xl" />
                <span className="ml-3">All Tasks</span>
              </Link>
            </li>

            <li>
              <Link
                to="/roadmap"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               <BiFilterAlt className="text-2xl"/>
                <span className="flex-1 ml-3 whitespace-nowrap">Filter Tasks</span>
                
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <Link
                to="/lineChart"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <AiOutlineLineChart className="text-2xl"/>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Line Chart
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/barChart"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <AiOutlineBarChart className="text-2xl"/>
                <span className="flex-1 ml-3 whitespace-nowrap">Bar Chart</span>
              </Link>
            </li>
            <li>
              <Link
                to="/areaChart"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <AiOutlineAreaChart className="text-2xl"/>
                <span className="flex-1 ml-3 whitespace-nowrap">Area Chart</span>
              </Link>
            </li>
          </ul>
          <div
            id="dropdown-cta"
            className="p-3 mt-3 rounded-lg bg-blue-50 dark:bg-blue-900 fixed bottom-[70px] left-3 right-3 md:bottom-[60px]"
            role="alert"
          >
            <div className="flex items-center mb-2">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                Info
              </span>
            </div>
            <p className="mb-2 text-sm text-blue-800 dark:text-blue-400 leading-5">
              As a skilled frontend web developer, specializing in Tailwind CSS,
              React.js, TypeScript and Next.js. My dedication to excellence
              drives me to create flawless, interactive UI.
            </p>
            <button
              className="text-sm text-white py-2 px-6 bg-blue-600 font-medium hover:text-blue-900 dark:text-blue-800 dark:hover:text-blue-300 dark:bg-white"
              href="#"
            >
              Hire Me
            </button>
          </div>
          <div className="flex fixed left-1/2 transform translate-x-[-50%] bottom-5 gap-3 items-center justify-center lg:pt-5 ">
            <BsSunFill className="text-2xl dark:text-white" />
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={toggleDarkMode}
                type="checkbox"
                checked={darkMode}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <BsMoonStarsFill className="ml-3 text-xl dark:text-white" />
            </label>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default sidebar;
