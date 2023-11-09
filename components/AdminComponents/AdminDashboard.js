import axios from "axios";
import { cookies } from "next/headers";
async function getUsers() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}
async function getBlogs() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}
async function fetchAllCourses() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}

const AdminDashboard = async () => {
  const usersData = await getUsers();
  const blogsData = await getBlogs();
  const courseData = await fetchAllCourses();
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 dark:bg-gray-700 text-black dark:text-white">
      <div className="h-full mb-10 md:ml-64">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 mt-4">
          <div className="bg-white  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-orange-200 text-blue-950 font-medium">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl mb-3">{usersData?.total}</p>
              <p className="mb-0">Users</p>
            </div>
          </div>
          <div className="bg-white  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-orange-200 text-blue-950 font-medium">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl mb-3">{courseData?.total}</p>
              <p className="mb-0">Courses</p>
            </div>
          </div>
          <div className="bg-white  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-orange-200 text-blue-950 font-medium">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl mb-3">{blogsData?.total}</p>
              <p className="mb-0">Blogs</p>
            </div>
          </div>
          <div className="bg-white  shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-orange-200 text-blue-950 font-medium">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width={30}
                height={30}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl mb-3">$0</p>
              <p className="mb-0">Sales</p>
            </div>
          </div>
        </div>
        {/* ./Statistics Cards */}

        {/* Client Table */}
        <div className="mt-4 mx-4">
          <div className="w-full overflow-hidden  shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-white uppercase border-b dark:border-gray-700 bg-blue-950 ">
                    <th className="px-4 py-3">Name/alias</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Email Verified</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                  {usersData?.users?.slice(0, 6).map((user, index) => {
                    return (
                      <tr className=" hover:bg-gray-100 text-gray-700 ">
                        <td className="px-4 py-3">
                          <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              />
                            </div>
                            <div>
                              <p className="font-semibold">
                                {user.fname}
                                {user.lname}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {user.alias}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{user.email}</td>
                        <td className="px-4 py-3 text-xs">
                          {user.email_verified ? (
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                              {" "}
                              Yes{" "}
                            </span>
                          ) : (
                            <span className="px-2 py-1 font-semibold leading-tight text-white bg-red-500 rounded-full">
                              {" "}
                              No{" "}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">{user.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-white uppercase border-t bg-blue-950 sm:grid-cols-9 "></div>
          </div>
        </div>
        {/* ./Client Table */}
      </div>
    </div>
  );
};

export default AdminDashboard;
