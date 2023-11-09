import Image from "next/image";
import React from "react";
import blog1 from "../../../public/blog-1.jpg";
import axios from "axios";
import moment from "moment";

async function fetchAnnouncementById(id) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/announcements/${id}`
  );
  return response.data;
}
const page = async ({ params }) => {
  const { announcement } = await fetchAnnouncementById(params.announcementId);
  return (
    <>
      <section>
        <div className="entry-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="entry-heading">{announcement?.title}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="main--content m-auto mt-5 mb-3 rounded-lg  p-3">
            <div className="row main-row--content">
              <div className="col-md-8">
                <div className="designation-box">
                  <h2 className="">{announcement.title}</h2>
                  <h5>{moment(announcement.created_at).format("LL")}</h5>
                </div>

                <div className="about--box mt-5">
                  <p>{announcement.description}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card--img mb-2">
                  <Image src={blog1} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
