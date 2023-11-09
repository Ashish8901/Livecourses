"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import UserSidebar from "@/components/UserComponents/UserSidebar";

const UserLayout = ({ children }) => {
  const router = useRouter();
  const userDetails = useSelector((state) => state.user);
  //   useEffect(() => {
  //     if (userDetails?.logInUser?.role?.role_name !== "Admin") {
  //       router.push("/");
  //     }
  //   }, [userDetails, router]);
  return (
    <>
      <UserSidebar />
      {children}
    </>
  );
};

export default UserLayout;
