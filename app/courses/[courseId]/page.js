import SingleCourse from "@/components/UserComponents/CoursesComponents/SingleCourse";
import React from "react";

const CourseDetail = ({ params }) => {
  return (
    <>
      <SingleCourse params={params} />
    </>
  );
};

export default CourseDetail;
