"use client";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Image from "next/image";
import dummyuser from "../../../public/dummy-img.png";
import Button from "react-bootstrap/Button";
import { useToast } from "@chakra-ui/react";
import moment from "moment";
import Pagination from "react-js-pagination";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import {
  createQuestion,
  createAnswer,
  getAllQuestions,
  getSingleQuestion,
} from "../../../app/GlobalRedux/Features/discussion/discussionSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/app/discussion/loading";
import doublearrowright from "../../../public/double-arrow-right.svg";
import chevronlefticon from "../../../public/chevron-left-icon.svg";
import doublearrowleft from "../../../public/double-arrow-left.svg";
import chevronrighticon from "../../../public/chevron-right-icon.svg";
import ButtonLoader from "@/utils/ButtonLoader";

const Discussion = () => {
  const toast = useToast();
  // const router= useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const [show, setShow] = useState(false);
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.discussion.discussionData);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionCount, setQuestionCount] = useState(8);
  const [totalQuestions, setTotalQuestions] = useState(questions?.total);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("loading", loading);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const FetchAllQuestions = async () => {
    const data = await dispatch(
      getAllQuestions({
        token: userDetails?.token,
        page: currentPage,
        limit: questionCount,
      })
    );
  };
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    FetchAllQuestions();
  }, [currentPage, isSubmit]);

  const handleQuestionSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (!isLoading) {
        const response = await dispatch(
          createQuestion({
            data: { question: data.question },
            token: userDetails?.token,
          })
        );
        reset();
        const { error, message, success } = response.payload;

        handleResponse(error, message, success);
        setIsLoading(false);
        handleClose();
        setIsSubmit(!isSubmit);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error submitting question:", err);
    }
  };

  const handleAnswerSubmit = async (id) => {
    try {
      setLoading(true);
      if (!loading) {
        const response = await dispatch(
          createAnswer({
            data: { questionId: id, answer },
            token: userDetails?.token,
          })
        );
        handleClose();
        const { error, message, success } = response.payload;
        handleResponse(error, message, success);
        setLoading(false);
        setIsSubmit(!isSubmit);
      }
    } catch (err) {
      setLoading(false);
      console.error("Error submitting answer:", err);
    }
  };

  const handleResponse = (error, message, success) => {
    if (error) {
      toastError(message);
    } else if (success) {
      toastSuccess(message);
    }
  };

  const toastError = (message) => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const toastSuccess = (message) => {
    toast({
      title: message,
      description: "",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="modal-btn-box my-3 d-flex justify-content-end">
        <Button variant="" onClick={handleShow} className="">
          Add a question
        </Button>
      </div>

      {!questions ? (
        <Loading />
      ) : (
        questions?.questions?.map((ques, index) => {
          return (
            <Accordion key={ques?.id}>
              <Accordion.Item eventKey="0">
                <div className="ques-box">
                  <Accordion.Header>
                    <div>
                      <h4>{ques?.question}</h4>
                      <p>
                        By{" "}
                        <span className=" text-orange-700">
                          {" "}
                          {ques.createdBy.fname} {ques.createdBy.lname}{" "}
                        </span>{" "}
                        on{" "}
                        <span className="date-box italic    text-gray-700">
                          {moment(ques?.created_at).format("ll")}
                        </span>{" "}
                      </p>
                    </div>
                  </Accordion.Header>
                </div>
                <Accordion.Body>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAnswerSubmit(ques?.id);
                    }}
                  >
                    <div className="mb-3 d-flex gap-5">
                      <div>
                        <div className="faq-img-box mb-2">
                          <Image src={dummyuser} alt="" />
                        </div>
                      </div>

                      <div className="answer-box">
                        <Form.Control
                          as="textarea"
                          style={{ height: "100px" }}
                          placeholder="Leave an answer here"
                          name="answer"
                          onChange={(e) => {
                            setAnswer(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="submit-btn-box">
                      <button
                        type="submit"
                        className="btn  flex justify-between items-center "
                      >
                        {loading && (
                          <i class="fa fa-circle-o-notch fa-spin"></i>
                        )}{" "}
                        Submit
                      </button>
                    </div>
                  </form>
                  {ques?.answers
                    ? ques?.answers?.map((answer) => {
                        return (
                          <>
                            <div className="mb-3 d-flex gap-5">
                              <div className="user-details">
                                <div className="faq-img-box m-auto mb-2">
                                  <Image src={dummyuser} alt="" />
                                </div>
                                <p className="text-[12px] text-center mb-1">
                                  {answer.createdBy.fname}{" "}
                                  {answer.createdBy.lname}
                                </p>
                                <div className="date-box text-center">
                                  <p>
                                    {moment(answer?.created_at).format("ll")}
                                  </p>
                                </div>
                              </div>
                              <div className="answer-box">
                                <p>{answer?.answer}</p>
                              </div>
                            </div>
                            <hr />
                          </>
                        );
                      })
                    : ""}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })
      )}
      {questions && totalQuestions >= 8 && (
        <div className="flex table-pagination justify-center">
          <ul className="inline-flex items-center gap-1 ">
            <li>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={questionCount}
                totalItemsCount={totalQuestions}
                pageRangeDisplayed={5}
                nextPageText={
                  <Image unoptimized src={chevronrighticon} alt="hh" />
                }
                prevPageText={
                  <Image unoptimized src={chevronlefticon} alt="hh" />
                }
                firstPageText={
                  <Image unoptimized src={doublearrowleft} alt="hh" />
                }
                lastPageText={
                  <Image unoptimized src={doublearrowright} alt="hh" />
                }
                onChange={handlePageChange}
                itemClassName="page-item"
                linkClassName="page-link"
                activeClassName="pageItemActive"
                activeLinkClassName="pageLinkActive"
              />
            </li>
          </ul>
        </div>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={handleSubmit(handleQuestionSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Ask a question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              as="textarea"
              placeholder="Leave a question here"
              name="question"
              {...register("question", { required: "Question is required" })}
            />
            {errors && errors?.question && (
              <p className="errorMessage">{errors?.question?.message}</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              className="custom-btn flex  text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
            >
              <p className="mb-0 flex justify-between items-center">
                {isLoading && <ButtonLoader />} Submit
              </p>
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Discussion;
