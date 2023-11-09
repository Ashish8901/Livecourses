"use client";

import Link from "next/link";
import { logoutUser } from "@/app/GlobalRedux/Features/users/usersSlice";
import { AiOutlineNotification } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";

export default function AdminSidebar() {
  const dispatch = useDispatch();
  const adminSettings = useSelector((state) => state.settings);
  const [logo, setLogo] = useState(adminSettings?.settingsData?.settings?.logo);

  useEffect(() => {
    if (adminSettings?.settingsData?.settings?.logo !== logo) {
      setLogo(adminSettings?.settingsData?.settings?.logo);
    }
  }, [adminSettings]);

  return (
    <div className="bg-white fixed h-full oveflow-y-auto  flex flex-col top-0 left-0 w-64 hover:w-64 bg-blue-900 dark:bg-gray-900 transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col flex-grow">
        <div className="logo-admin py-4 px-4">
          <Link href="/">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/${logo}`}
              alt="Home"
            />
          </Link>
        </div>
        <ul className="pl-0 mb-0 admin-menu-list flex flex-col py-4 space-y-1">
          <li>
            <Link
              href="/admin"
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
              href="/admin/blog-list?pageNumber=1"
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
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Blogs</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users-list?pageNumber=1"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/course-list?page=1"
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
                Courses
              </span>
            </Link>
          </li>
          <li>
            <a
              href="/admin/course-categories?page=1"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-100  text-white-600 hover:text-white-800 border-r-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <BiCategoryAlt className="w-6 h-6" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Course Categories
              </span>
            </a>
          </li>
          <li>
            <Link
              href="/admin/admin-announcement?page=1"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-100  text-white-600 hover:text-white-800 border-r-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <AiOutlineNotification className="w-6 h-6" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Announcement
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/setting"
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Settings
              </span>
            </Link>
          </li>

          <li>
            <Link
              href=""
              onClick={() => dispatch(logoutUser(""))}
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
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
