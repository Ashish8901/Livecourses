import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 dark:bg-gray-700 text-black dark:text-white">
      <div className="h-full mb-10 md:ml-64">
        <div className="mt-4 mx-4">
          <div className="w-full overflow-hidden  shadow-xs">
            <h1 className="mb-4 text-black text-3xl">My Orders</h1>
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
                            {/* {user.fname} */}
                            {/* {user.lname} */}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {/* {user.alias} */}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">nvcnbb</td>
                    <td className="px-4 py-3 text-xs">
                      {/* {user.email_verified ? (
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                              {" "}
                              Yes{" "}
                            </span>
                          ) : (
                            <span className="px-2 py-1 font-semibold leading-tight text-white bg-red-500 rounded-full">
                              {" "}
                              No{" "}
                            </span>
                          )} */}
                    </td>
                    <td className="px-4 py-3 text-sm">active</td>
                  </tr>
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
