import React from "react";
import Discussion from "../../components/UserComponents/Discussion/Discussion.js";

const page = () => {
  return (
    <>
      <div className="container mb-5">
        <div className="faq-txt text-center mb-5 mt-5">
          <h2>Frequently Asked Questions</h2>
        </div>
        <Discussion />
      </div>
    </>
  );
};

export default page;
