"use client";
import moment from "moment";
import { AiOutlineNotification } from "react-icons/ai";
import { BiSolidOffer } from "react-icons/bi";
import { BsLaptop } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnnouncements } from "../GlobalRedux/Features/announcements/announcementSlice";
import Loading from "../blogs/loading";
import { Button } from "react-bootstrap";

const page = () => {
  const dispatch = useDispatch();
  const announcementData = useSelector((state) => state.announcement);
  const [visibleAnnouncements, setVisibleAnnouncements] = useState(6);
  const loadMoreAnnouncements = () => {
    setVisibleAnnouncements((prevCount) => prevCount + 6);
  };
  useEffect(() => {
    try {
      dispatch(getAllAnnouncements({}));
    } catch (error) {
      console.log("error :>> ", error);
    }
  }, []);

  return (
    <>
      <section>
        <div className="entry-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="entry-heading">Announcement</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container about-us-points mt-12 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="card notification-card border-card-one">
                <div className="card-content">
                  <div className="card-body">
                    <div className="card-icons d-flex justify-center ">
                      <BsLaptop />
                    </div>
                    <h5 className="card-title font-medium mt-3 text-center">
                      Upcoming courses
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card notification-card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="card-icons d-flex justify-center ">
                      <BiSolidOffer />
                    </div>
                    <h5 className="card-title font-medium mt-3 text-center">
                      New offers
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card notification-card border-card-three">
                <div className="card-content">
                  <div className="card-body">
                    <div className="card-icons d-flex justify-center ">
                      <AiOutlineNotification />
                    </div>

                    <h5 className="card-title font-medium mt-3 text-center">
                      Giveaways
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="flex-container flex-wrap grid gap-1 mb-5">
            <div class="w-full">
              <div class="bg-white sm:rounded-lg p-4 py-5 shadow-lg mb-1rem">
                {announcementData?.loading ? (
                  <Loading />
                ) : (
                  announcementData?.announcementData?.announcements
                    ?.slice(0, visibleAnnouncements)
                    ?.map((item) => {
                      return (
                        <>
                          <div class="support-chat-msg flex">
                            <div class="flex gap-1 w-11/12">
                              <div class="text-content">
                                <div class="text-dark font-medium ">
                                  {" "}
                                  <Link href={`/announcement/${item.id}`}>
                                    {item?.title}
                                  </Link>
                                </div>
                                <p class="f-14 mb-0"
                                  dangerouslySetInnerHTML={{
                                    __html: item?.description
                                      .replace(/<p>/g, "")
                                      .replace(/<\/p>/g, ""),
                                  }}
                                ></p>
                                <p class="pt-1 text-blue text-sm">
                                  {moment(item.created_at).format("LLL")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          {visibleAnnouncements <
            announcementData?.announcementData?.announcements?.length && (
              <Button
                onClick={loadMoreAnnouncements}
                className="load-more-button"
              >
                Load More
              </Button>
            )}
        </div>
      </section>
    </>
  );
};

export default page;
