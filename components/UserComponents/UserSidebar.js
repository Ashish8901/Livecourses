"use client";

import Link from "next/link";

const UserSidebar = () => {
  return (
    <div className="bg-white fixed h-full oveflow-y-auto  flex flex-col top-0 left-0 w-64 hover:w-64 bg-blue-900 dark:bg-gray-900 transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col flex-grow">
        <div className="logo-admin py-4 px-4"></div>
        <ul className="pl-0 mb-0 admin-menu-list flex flex-col py-4 space-y-1">
          <li>
            <Link
              href="/userdashboard"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-100  text-white-600 hover:text-white-800 border-r-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Dashboard
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/userdashboard/orders"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-100  text-white-600 hover:text-white-800 border-r-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Orders
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/userdashboard/my-courses"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-100  text-white-600 hover:text-white-800 border-r-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                My Courses
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
