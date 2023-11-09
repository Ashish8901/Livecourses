"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../app/GlobalRedux/Features/users/usersSlice";
import { getSettings } from "@/app/GlobalRedux/Features/settings/settingSlice";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCompanySettings() {
      await dispatch(getSettings());
    }
    getCompanySettings();
  }, [dispatch]);

  const setting = useSelector(
    (state) => state?.settings?.settingsData?.settings
  );

  const userDetails = useSelector((state) => state.user);
  const [state, setState] = useState(false);
  const [drapdownState, setDrapdownState] = useState({
    isActive: false,
    idx: null,
  });

  const navigation = [
    {
      title: "Courses",
      path: "/courses",
      isDrapdown: false,
    },
    { title: "About us", path: "/about-us", isDrapdown: false },
    { title: "Contact", path: "/contact", isDrapdown: false },
    { title: "Blogs", path: "/blogs", isDrapdown: false },
    ...(userDetails?.logInUser?.role?.role_name == "Course_Registered" || userDetails?.logInUser?.role?.role_name == "Admin"
      ? [{ title: "Discussion", path: "/discussion", isDrapdown: false }]
      : []),
    { title: "Announcement", path: "/announcement", isDrapdown: false },
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".nav-menu"))
        setDrapdownState({ isActive: false, idx: null });
    };
  }, []);

  return (
    <>
      <header>
        <div className="container mob-container">
          <nav
            className={`py-3 relative z-20 bg-white w-full lg:static  lg:border-none ${
              state ? "py-3 shadow-lg rounded-b-xl lg:shadow-none" : ""
            }`}
          >
            <div className="items-center gap-x-14 max-w-screen-xl mx-auto lg:flex">
              <div className="flex items-center justify-between lg:block">
                <Link className="brand-logo" href="/">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${setting?.logo}`}
                    //  src={Logo}
                    alt=""
                  />
                </Link>
                <div className="lg:hidden">
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => setState(!state)}
                  >
                    {state ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div
                className={`nav-menu flex-1 lg:block lg:pb-0 lg:mt-0 ${
                  state ? "block" : "hidden"
                }`}
              >
                <ul className="justify-center mb-0 pb-0 items-center space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
                  {navigation.map((item, idx) => {
                    return (
                      <li key={idx}>
                        {item.isDrapdown ? (
                          <button
                            className="w-full flex items-center justify-between gap-1 text-gray-700 hover:text-indigo-600"
                            onClick={() =>
                              setDrapdownState({
                                idx,
                                isActive: !drapdownState.isActive,
                              })
                            }
                          >
                            {item.title}
                          </button>
                        ) : (
                          <Link
                            href={item.path}
                            className="block text-blue-950 hover:text-orange-200"
                          >
                            {item.title}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                  <div className="flex-1 items-center justify-end gap-x-6 space-y-3 lg:flex lg:space-y-0">
                    {userDetails?.token ? (
                      <>
                        <div className="paste-button">
                          <button className="inline-block py-3 px-4 font-medium text-center text-white bg-orange-100 hover:bg-orange-200 active:bg-orange-200 active:shadow-none rounded-lg lg:inline">
                            {userDetails?.logInUser?.fname}{" "}
                            {userDetails?.logInUser?.lname} &nbsp; ▼
                          </button>
                          <div className="dropdown-content">
                            {userDetails?.logInUser?.role?.role_name ===
                              "Admin" && (
                              <Link id="middle" href="/admin">
                                Admin Dashboard
                              </Link>
                            )}

                            <Link id="top" href="/userdashboard">
                              Profile
                            </Link>
                            {/*<a id="middle" href="#">
                              Settings
                            </a> */}

                            <Link
                              href="/login"
                              onClick={() => {
                                localStorage.clear();
                                dispatch(logoutUser(""));
                              }}
                              id="bottom"
                            >
                              Logout
                            </Link>
                          </div>
                        </div>
                      </>
                    ) : (
                      <li>
                        <Link
                          href="/login"
                          className="inline-block py-3 px-4 font-medium text-center text-white bg-orange-100 hover:bg-red-500 active:bg-red-500 active:shadow-none rounded-lg  lg:inline"
                        >
                          Log in
                        </Link>
                      </li>
                    )}
                  </div>
                </ul>
              </div>
            </div>
          </nav>
          {state ? (
            <div
              className="z-10 fixed  left-0 top-0 w-screen h-screen bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setState(false)}
            ></div>
          ) : (
            ""
          )}
        </div>
      </header>
    </>
  );
};
