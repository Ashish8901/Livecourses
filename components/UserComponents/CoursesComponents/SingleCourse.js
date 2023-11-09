"use client";
import React, { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import Accordion from "react-bootstrap/Accordion";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import ProfilePic from "../../../public/profile-pic.jpg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import VideoPlayer from "./VideoPlayer";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getSingleCourse } from "@/app/GlobalRedux/Features/courses/courseSlice";
import { Button } from "react-bootstrap";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createOrder } from "@/app/GlobalRedux/Features/orders/orderSlice";
import { useToast } from "@chakra-ui/react";

const SingleCourse = ({ params }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const userDetails = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getOneCourse() {
      await dispatch(
        getSingleCourse({
          token: userDetails.token,
          id: params.courseId,
        })
      );
    }
    getOneCourse();
  }, [dispatch, params.courseId]);

  const SingleCourse = useSelector((state) => state.courses.singleCourseData);

  const filter = [
    { id: 0, name: "All lectures", unavailable: false },
    { id: 1, name: "Current lecture", unavailable: false },
  ];
  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const sortby = [
    { id: 0, name: "Sort by most recent", unavailable: false },
    { id: 1, name: "Sort by oldest", unavailable: false },
  ];
  const [selectedSortby, setSelectedSortby] = useState(sortby[0]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const playVideo = (videoUrl, title, description) => {
    setSelectedChapter({ videoUrl, title, description });
  };
  let x = 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      //  if the user has already enrolled
      const response = await dispatch(
        createOrder({ courseId: params.courseId, token: userDetails.token })
      );

      if (
        response?.payload ===
        `You have already enrolled courses - ${SingleCourse?.course?.course_code}`
      ) {
        toast({
          title: "Course Already Purchased",
          description: "You have already enrolled in this course.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      } else if (
        response?.payload &&
        response?.payload?.paymentIntent?.client_secret
      ) {
        const paymentResult = await stripe.confirmCardPayment(
          response?.payload?.paymentIntent?.client_secret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: "User of Training App",
              },
            },
          }
        );

        if (paymentResult.error) {
          toast({
            title: "Payment Failed",
            description: paymentResult.error.message,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else if (paymentResult.paymentIntent.status === "succeeded") {
          toast({
            title: "Payment Successful",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      }
      setLoading(false);
      handleClose();
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment Failed",
        description: "An error occurred while processing the payment.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 pt-4">
              <div className="pb-16 ">
                <div className="video-player-container">
                  <VideoPlayer
                    videoUrl={
                      selectedChapter?.videoUrl ||
                      SingleCourse?.course?.sections[0]?.chapters[0]?.video
                    }
                    title={
                      selectedChapter?.title ||
                      SingleCourse?.course?.sections[0]?.chapters[0]?.title
                    }
                    description={
                      selectedChapter?.description ||
                      SingleCourse?.course?.sections[0]?.chapters[0]
                        ?.description
                    }
                  />
                </div>
                <div>
                  <button
                    onClick={() => handleShow()}
                    className="bg-blue-500 text-white font-bold p-3 rounded-lg"
                  >
                    Purchase this course
                  </button>
                </div>
                <Tabs
                  defaultActiveKey="overview"
                  id="course-tabs"
                  className="mb-3 custom-course-tabs"
                >
                  <Tab eventKey="overview" title="Overview">
                    <div className="border p-4 flex gap-3">
                      <span className="icon-overview">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          fill="currentColor"
                          className="bi bi-stopwatch"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                          <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                        </svg>
                      </span>
                      <div>
                        <h6 className="font-medium mb-2">
                          Schedule learning time
                        </h6>
                        <p className="mb-3">
                          Learning a little each day adds up. Research shows
                          that students who make learning a habit are more
                          likely to reach their goals. Set time aside to learn
                          and get reminders using your learning scheduler.
                        </p>
                        <div>
                          <button className="bg-black px-4 py-2 text-white mr-2">
                            Get started
                          </button>
                          <button className="border  px-4 py-2 text-black">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="notes" title="Notes">
                    <div className="pt-8 pb-8">
                      <div className="">
                        <div className="search-form flex flex-warp mb-3 ">
                          <input
                            className="w-full px-3 py-2 bg-gray-300  focus:border-blue-500 focus:outline-none"
                            type="search"
                            placeholder="Create a new note at 0:00"
                            id="site-search"
                          />
                          <button
                            type="submit"
                            className="w-12 flex justify-center items-center bg-black "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="white"
                              className="bi bi-plus-lg"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="relative">
                          <Listbox
                            value={selectedSortby}
                            onChange={setSelectedSortby}
                          >
                            <Listbox.Button className="tutor-form-control">
                              <span>
                                {selectedSortby.name}{" "}
                                <span className="filter-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-chevron-down"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                    />
                                  </svg>
                                </span>
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="tutor-form-select-dropdown">
                              {sortby.map((Sortby) => (
                                <Listbox.Option
                                  key={Sortby.id}
                                  value={Sortby}
                                  disabled={Sortby.unavailable}
                                  className="hover:text-white hover:bg-orange-100"
                                >
                                  {Sortby.name}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Listbox>
                        </div>
                        <div className="relative">
                          <Listbox
                            value={selectedFilter}
                            onChange={setSelectedFilter}
                          >
                            <Listbox.Button className="tutor-form-control">
                              <span>
                                {selectedFilter.name}{" "}
                                <span className="filter-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-chevron-down"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                    />
                                  </svg>
                                </span>
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="tutor-form-select-dropdown">
                              {filter.map((Filter) => (
                                <Listbox.Option
                                  key={Filter.id}
                                  value={Filter}
                                  disabled={Filter.unavailable}
                                  className="hover:text-white hover:bg-orange-100"
                                >
                                  {Filter.name}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Listbox>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="announcements" title="Announcements">
                    <div className="p-8">
                      <div className="p-3 flex gap-3">
                        <span className="profile-icon w-10">
                          <Image
                            height={40}
                            width={40}
                            className="rounded-full"
                            alt=""
                            src={ProfilePic}
                          />
                        </span>
                        <div>
                          <h6 className="mb-0 font-medium text-xl">Stephen</h6>
                          <p className="text-sm mb-0">
                            posted an announcement - 10 months ago
                          </p>
                        </div>
                      </div>
                      <h3 className="text-2xl mb-2 text-black">
                        Total Course Update
                      </h3>
                      <p className="mb-2">Hi Friends.</p>
                      <p className="mb-2">
                        I've completely updated Modern React with Redux. It
                        includes tons of new content. Here are some of the
                        highlights:
                      </p>
                      <ul className="list-disc mb-4">
                        <li>
                          <p>Many new quizzes + exercises</p>
                        </li>
                        <li>
                          <p>Added interactive cheatsheets</p>
                        </li>
                        <li>
                          <p>
                            More focus on giving you repeatable steps for common
                            tasks.&nbsp; For example, I've broken down state
                            design into a super-repeatable 9 steps process that
                            will produce a quality design for just about any
                            kind of component
                          </p>
                        </li>
                        <li>
                          <p>
                            More focus on making truly reusable components that
                            do more than just simple styling
                          </p>
                        </li>
                        <li>
                          <p>
                            Redux Toolkit (RTK) is now used instead of plain
                            Redux
                          </p>
                        </li>
                        <li>
                          <p>
                            Data fetching with RTK is shown with both
                            AsyncThunks and Redux Toolkit Query
                          </p>
                        </li>
                      </ul>
                      <p className="mb-2">
                        <strong>
                          If you want to continue the old version of the course,
                          then you'll find the old videos in the second half.{" "}
                        </strong>{" "}
                        They start at around Section 24. These old videos will
                        be removed from the course in 4-6 weeks, possibly more
                        if requested.
                      </p>
                      <p className="mb-2">
                        <strong>
                          If you were in the middle of taking the course, you're
                          probably wondering if you should finish the old
                          version, or start over with the new content.
                        </strong>
                        &nbsp; I'd recommend finishing up whatever section you
                        were working on, then move to the newer version of the
                        course.&nbsp; The sections are roughly in the same order
                        - they cover JSX, then, props, then state, etc, so
                        moving between versions of the course should be pretty
                        seamless.
                      </p>
                    </div>
                  </Tab>
                  <Tab eventKey="reviews" title="Reviews">
                    <div className="p-8">
                      <h2 className="text-lg text-black">Reviews</h2>
                      <div className="p-3 flex gap-3 mb-4 border-b pb-4">
                        <span className="review-Icon uppercase">nz</span>
                        <div className="rating-left">
                          <h6 className="mb-0 font-semibold text-md text-black">
                            Nathan Z.
                          </h6>
                          <div className="rating-content">
                            <div className="rating">
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i
                                className="fa fa-star-o"
                                aria-hidden="true"
                              ></i>
                            </div>
                            <span>3 days ago</span>
                          </div>
                          <p className="text-sm mb-0">
                            It was nice . The way the instructor Stephen Grider
                            has taken the course forward step by step guiding
                            through the process how to deal with even little
                            things in React from scratch.
                          </p>
                        </div>
                      </div>
                      <div className="p-3 flex gap-3 mb-4 border-b pb-4">
                        <span className="review-Icon uppercase">MS</span>
                        <div className="rating-left">
                          <h6 className="mb-0 font-semibold text-md text-black">
                            Mariko S.
                          </h6>
                          <div className="rating-content">
                            <div className="rating">
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i
                                className="fa fa-star-o"
                                aria-hidden="true"
                              ></i>
                              <i
                                className="fa fa-star-o"
                                aria-hidden="true"
                              ></i>
                            </div>
                            <span>3 weeks ago</span>
                          </div>
                          <p className="text-sm mb-0">
                            It was nice . The way the instructor Stephen Grider
                            has taken the course forward step by step guiding
                            through the process how to deal with even little
                            things in React from scratch.
                          </p>
                        </div>
                      </div>
                      <div>
                        <button className=" w-full border border-black text-black py-2 hover:bg-black hover:text-white">
                          See More Review
                        </button>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="courses-content-list">
                <h1 className="border-b text-xl text-black pb-2 mb-4 uppercase font-semibold">
                  Course content
                </h1>
                {SingleCourse?.course?.sections.map((item) => {
                  x++;
                  return (
                    <Accordion
                      className="course-accordian"
                      defaultActiveKey="0"
                      flush
                      key={item.id}
                    >
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="">
                          <h6 className="mb-0 font-semibold">
                            Lab {x}: {item.title}
                          </h6>
                          <p className="mb-0 text-xs pt-1 font-normal ">
                            9 / 10 | 35min
                          </p>
                        </Accordion.Header>
                        <Accordion.Body className="acc-content-box">
                          {item.chapters.map((item) => {
                            return (
                              <div
                                className="acc-content-row block"
                                key={item.id}
                              >
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-black relative top-1"
                                    defaultChecked
                                    id="checkbox"
                                    name="check-course"
                                  />
                                  <label className="text-sm font-normal block">
                                    <p
                                      onClick={() =>
                                        playVideo(
                                          item.video,
                                          item.title,
                                          item.description
                                        )
                                      }
                                      className="mb-1"
                                    >
                                      <Link href="">{item.title}</Link>
                                    </p>
                                    <p className="flex mb-0 items-center tex-xs gap-2">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-play-btn"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                      </svg>
                                      <span>{item?.video_duration} min</span>
                                    </p>
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form onSubmit={handlePayment}>
            <Modal.Header closeButton>
              <Modal.Title>Purchase the course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CardElement
                options={{
                  hidePostalCode: true,
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#3a120a",
                      "::placeholder": {
                        color: "#dbd8d7",
                      },
                    },
                    invalid: {
                      color: "red",
                    },
                  },
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                disabled={!stripe}
                className="custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
              >
                Pay Now
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </section>
    </>
  );
};

export default SingleCourse;
