import EditCourse from "@/components/AdminComponents/CourseComponent/Courses/EditCourse";
import React from "react";

const page = ({ params }) => {
  return (
    <>
      <EditCourse params={params} />
    </>
  );
};

export default page;
