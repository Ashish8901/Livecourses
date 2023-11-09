import CoursesGrid from "@/components/UserComponents/CoursesComponents/CoursesGrid";
import React from "react";

const page = () => {
  return (
    <>
      <section>
        <div className="entry-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="entry-heading">All Courses</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CoursesGrid />
    </>
  );
};

export default page;
