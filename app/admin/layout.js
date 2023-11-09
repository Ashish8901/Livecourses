"use client";
import React, { useEffect } from "react";
import AdminSidebar from "../../components/AdminComponents/AdminSidebar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Adminlayout = ({ children }) => {
  const router = useRouter();
  const userDetails = useSelector((state) => state.user);
  useEffect(() => {
    if (userDetails?.logInUser?.role?.role_name !== "Admin") {
      router.push("/");
    }
  }, [userDetails, router]);
  return (
    <>
      <AdminSidebar />
      {children}
    </>
  );
};

export default Adminlayout;
