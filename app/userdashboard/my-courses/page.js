"use client";

import { getMyCourses } from "@/app/GlobalRedux/Features/courses/courseSlice";
import Loading from "@/app/blogs/loading";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const myCourses = useSelector((state) => state.courses);
  useEffect(() => {
    async function getMyCoursess() {
      await dispatch(getMyCourses({ token: userDetails.token }));
    }
    getMyCoursess();
  }, []);
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 dark:bg-gray-700 text-black dark:text-white">
      <div className="h-full mb-10 md:ml-64">
        <div className="mt-4 mx-4">
          <div className="w-full overflow-hidden  shadow-xs">
            <h1 className="mb-4 text-black text-3xl">My Courses</h1>
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-white uppercase border-b dark:border-gray-700 bg-blue-950 ">
                    <th className="px-4 py-3">Course Code</th>
                    <th className="px-4 py-3">Course Name</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {myCourses.loading ? (
                    <Loading />
                  ) : myCourses.myCourses?.courses?.length > 0 ? (
                    myCourses.myCourses?.courses?.map((course) => {
                      return (
                        <tr className=" hover:bg-gray-100 text-gray-700 ">
                          <td className="px-4 py-3">{course.course_code}</td>
                          <td className="px-4 py-3 text-sm">
                            {course.course_name}
                          </td>
                          <td className="px-4 py-3 text-xs">${course.price}</td>
                          <td className="px-4 py-3 text-sm">active</td>
                        </tr>
                      );
                    })
                  ) : (
                    "No Data Found"
                  )}
                </tbody>
              </table>
            </div>
            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-white uppercase border-t bg-blue-950 sm:grid-cols-9 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
