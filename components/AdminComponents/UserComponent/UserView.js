"use client";

import { getUserbyID } from "@/app/GlobalRedux/Features/users/usersSlice";
import Loading from "@/app/blogs/loading";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserView = ({ userId }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.userData;
  useEffect(() => {
    async function getOneUser() {
      return dispatch(getUserbyID({ token: userDetails.token, id: userId }));
    }
    getOneUser();
  }, []);
  return (
    <>
      <div className="h-full mb-10 md:ml-64">
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <div className="overflow-y-hidden">
            <Link
              className="flex items-center gap-2 text-blue-950 mb-4"
              href="/admin/users-list?pageNumber=1"
            >
              <span>
                <svg
                  viewBox="0 0 450 450"
                  fill="currentColor"
                  height="1.5em"
                  width="1.5em"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={38}
                    d="M244 400L100 256l144-144M120 256h292"
                  />
                </svg>
              </span>
              <span className="relative top-0.5">Back</span>
            </Link>
            <h1 className="mb-4 text-black text-3xl">User View</h1>
            {user?.user ? (
              <>
                <div className="user-detail bg-white px-8 pt-8 pb-16 w-full">
                  <div className="user-image-box">
                    <div className="user-image">
                      <img src={user.user_meta?.image || "/dummy-img.png"} />
                    </div>
                    <p className="mb-3 text-2xl text-blue-950">
                      {user.user.alias}
                    </p>
                  </div>
                  <div className="user-field">
                    <div className="user-label">User ID</div>
                    <div className="user-text">{userId}</div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> First Name</div>
                    <div className="user-text">{user.user.fname}</div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> Last Name</div>
                    <div className="user-text">{user.user.lname}</div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> Email</div>
                    <div className="user-text">{user.user.email}</div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> Email verifed</div>
                    <div className="user-text">
                      {!user.user.email_verified ? "No" : "Yes"}
                    </div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> status</div>
                    <div className="user-text">{user.user.status}</div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> created_at</div>
                    <div className="user-text">{user.user.created_at}</div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> role Name</div>
                    <div className="user-text">{user.user.role?.role_name}</div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> address</div>
                    <div className="user-text">
                      {user.user.user_meta?.address || "No Data Found"}
                    </div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> country</div>
                    <div className="user-text">
                      {user.user.user_meta?.country || "No Data Found"}
                    </div>
                  </div>
                  <div className="user-field">
                    <div className="user-label">Date of Birth</div>
                    <div className="user-text">
                      {user.user_meta?.dob || "No Data Found"}
                    </div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> phone</div>
                    <div className="user-text">
                      {user.user_meta?.phone || "No Data Found"}
                    </div>
                  </div>
                </div>
                {/* <div>
                  <div>UserView {userId}</div>
                  <div>
                    Alias:{user.user.alias}
                    First Name:{user.user.fname}
                    Last Name:{user.user.lname}
                    Email:{user.user.email}
                    Email verifed:{!user.user.email_verified ? "false" : "true"}
                    ID:{user.user.id}
                    status:{user.user.status}
                    created_at:{user.user.created_at}
                    role Name:{user.role?.role_name}
                    address:{user.user_meta?.address}
                    country:{user.user_meta?.country}
                    dob:{user.user_meta?.dob}
                    image:{user.user_meta?.image}
                    phone:{user.user_meta?.phone}
                  </div>
                </div> */}
              </>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserView;
