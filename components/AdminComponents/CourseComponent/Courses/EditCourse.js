"use client";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  editCourse,
  getSingleCourse,
} from "@/app/GlobalRedux/Features/courses/courseSlice";
import { getAllCategory } from "@/app/GlobalRedux/Features/category/categorySlice";
import { ImageURLtofile } from "@/utils/ImageURLto file";
import AddSection from "../Sections/AddSection";
import EditSection from "../Sections/EditSection";
import AddChapter from "../Chapters/AddChapter";
import EditChapter from "../Chapters/EditChapter";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import DeleteSection from "../Sections/DeleteSection";
import DeleteChapter from "../Chapters/DeleteChapter";

const EditCourse = ({ params }) => {
  const router = useRouter();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [sectionId, setSectionId] = useState("");
  const [chapterId, setChapterId] = useState("");
  const handleShow = () => setShow(true);
  const [chapterShow, setChapterShow] = useState(false);
  const handleChapterShow = () => setChapterShow(true);
  const [editSectionShow, setEditSectionShow] = useState(false);
  const handleEditSectionShow = (id) => {
    setEditSectionShow(true);
    setSectionId(id);
  };
  const [editChapterShow, setEditChapterShow] = useState(false);
  const handleEditChapterShow = (id) => {
    setEditChapterShow(true);
    setChapterId(id);
  };
  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [courseDetails, setCourseDetails] = useState({});
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState();
  const [outlineText, setOutlineText] = useState("");
  const [courseOutline, setCourseOutline] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [inputState, setInputState] = useState(false);
  const [inputSelectTypes, setInputSelectTypes] = useState([]);

  useEffect(() => {
    async function getCoursebyID() {
      const { payload } = await dispatch(
        getSingleCourse({ token: userDetails.token, id: params.course })
      );
      const { course } = payload;
      setCourseDetails(course);
      setCourseCode(course?.course_code);
      setCourseName(course?.course_name);
      setPrice(course?.price);
      setDescription(course?.description);
      setCourseCategory(course?.category.id);
      setCourseOutline(course?.courseOutline);
      const fileData = await ImageURLtofile(course?.image);
      setFile(fileData);
    }
    async function getCategories() {
      const { payload } = await dispatch(
        getAllCategory({ token: userDetails.token })
      );
      setAllCategory(payload.categories);
    }
    getCategories();
    getCoursebyID();
  }, [editSectionShow, editChapterShow, show, chapterShow]);

  const addInputSelect = () => {
    setInputState(true);
    setInputSelectTypes([...inputSelectTypes, ""]); // You can set an initial value here if needed
  };
  const addText = () => {
    setCourseOutline([...courseOutline, outlineText]);
    setOutlineText("");
    setInputSelectTypes([]);
    setInputState(false);
  };
  const handleChangeText = (e, index) => {
    const updatedCourseOutline = [...courseOutline];
    updatedCourseOutline[index] = e.target.value;
    setCourseOutline(updatedCourseOutline);
  };

  const handleDeleteCourseOutline = (indexToDelete) => {
    const newCourseOutline = [
      ...courseOutline.slice(0, indexToDelete),
      ...courseOutline.slice(indexToDelete + 1),
    ];
    setCourseOutline(newCourseOutline);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("course_name", courseName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", courseCategory);
    formData.append("image", file);
    courseOutline.forEach((item) => formData.append("courseOutline", item));

    try {
      const res = await dispatch(
        editCourse({ formData, token: userDetails.token, id: courseDetails.id })
      );
      const { error, success, message } = res.payload;
      if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.push("/admin/course-list?page=1");
        router.refresh();
      } else if (error) {
        toast({
          title: error,
          description: message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  let x = 0;
  return (
    <>
      <div className="h-full mb-10 md:ml-64">
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <div className="row">
            <div className="col-lg-9">
              <div className="col-lg-12 mb-4">
                <div className="flex gap-3 flex-wrap">
                  {file?.name ? (
                    <div className="user-image-box mb-0">
                      <div className="user-image">
                        <img alt="" src={URL?.createObjectURL(file)} />
                      </div>
                    </div>
                  ) : (
                    <div className="user-image-box mb-0">
                      <div className="user-image">
                        <img
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${file}`}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <h2 className="text-blue-950 text-3xl font-medium mb-2">
                      {courseName}
                    </h2>

                    <div className="col-lg-12 mb-2">
                      <label
                        htmlFor="blogContent"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Edit Course Image
                      </label>
                      <div className="user-image-box">
                        <span className="block upload-btn mb-3">
                          <input type="file" onChange={handleChange} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 text-right">
              <Popover className="relative">
                <Popover.Button className="rounded-md custom-btn text-white hover:text-white  border border-black bg-black hover:bg-black uppercase py-2 px-4">
                  Add Content
                </Popover.Button>
                <Popover.Panel className="absolute z-10 right-0 ">
                  <div className="add-content-list">
                    <button onClick={handleShow}>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                          />
                        </svg>
                      </span>
                      Add Lab
                    </button>
                    <button onClick={handleChapterShow}>
                      <span>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg>
                      </span>
                      Add Chapter
                    </button>
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          </div>
          <div className="row  w-full ">
            <div className="col-lg-12 mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Course Outline
              </label>
              <div className="relative">
                {courseOutline.length > 0 && (
                  <div>
                    {courseOutline.map((item, index) => (
                      <div
                        key={index}
                        className="mb-4 mt-4 relative flex flex-warp"
                      >
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
                          placeholder="course outline"
                          value={item}
                          onChange={(e) => handleChangeText(e, index)}
                        />

                        <button
                          className="ml-2 w-16 rounded-lg flex justify-center items-center bg-black "
                          onClick={() => handleDeleteCourseOutline(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="white"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {inputSelectTypes.length > 0 && (
                <div className="mb-4 mt-4 relative flex flex-warp">
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
                    placeholder="course outline"
                    value={outlineText}
                    onChange={(e) => {
                      setOutlineText(e.target.value);
                    }}
                  />
                  <button
                    className="ml-2 w-16 rounded-lg flex justify-center items-center bg-black text-white "
                    onClick={addText}
                  >
                    Add
                  </button>
                </div>
              )}
              {!inputState && (
                <button
                  className="flex gap-2 mt-2 mb-4"
                  onClick={addInputSelect}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="black"
                    className="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                  </svg>
                  Add Outline
                </button>
              )}
            </div>
            <div className="col-lg-6 mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Course Code
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
                placeholder=" Course Code"
                value={courseCode}
                onChange={(e) => {
                  setCourseCode(e.target.value);
                }}
              />
            </div>
            <div className="col-lg-6 mb-4">
              <label
                htmlFor="alias"
                className="block text-gray-700 font-bold mb-2"
              >
                Course Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
                placeholder=" Course Name"
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              />
            </div>
            <div className="col-lg-6 mb-4">
              <label
                htmlFor="alias"
                className="block text-gray-700 font-bold mb-2"
              >
                Course Price
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
                placeholder="$ Course Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="col-lg-6 mb-4">
              <label
                htmlFor="alias"
                className="block text-gray-700 font-bold mb-2"
              >
                Course Category
              </label>
              <select
                id="categories"
                className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
              >
                {allCategory?.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-12 mb-4">
              <label
                htmlFor="file"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
                placeholder="Write your description here..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="col-lg-12">
              <div className="row mb-3">
                <div className="col-lg-12">
                  <label
                    htmlFor="alias"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Course Content
                  </label>
                </div>
              </div>

              {courseDetails?.sections?.map(
                (section) => (
                  x++,
                  (
                    <Accordion
                      className="admin-course course-accordian"
                      defaultActiveKey="0"
                      key={section.id}
                    >
                      <Accordion.Item eventKey="0">
                        <Accordion.Header className="">
                          <h6 className="mb-0 font-semibold ">
                            <span className="section-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                />
                              </svg>
                            </span>
                            Lab {x} :
                            <span className="ml-2 font-normal">
                              {section.title}
                            </span>
                          </h6>

                          <button
                            className="edit-course no-css"
                            onClick={() => handleEditSectionShow(section.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-4 h-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>

                          <DeleteSection sectionId={section.id} />
                        </Accordion.Header>
                        {section?.chapters?.map((chapter) => {
                          return (
                            <Accordion.Body
                              className="acc-content-box"
                              key={chapter.id}
                            >
                              <div className="p-0 admin-acc-content acc-content-row block">
                                <div className="relative">
                                  <p className="relative mb-0 font-medium text-sm">
                                    <span className="chapter-icon ">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-4 h-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                                        />
                                      </svg>
                                    </span>
                                    <span className="ml-2 font-normal">
                                      {chapter.title}
                                    </span>
                                    <button
                                      className="edit-course no-css"
                                      onClick={() =>
                                        handleEditChapterShow(chapter.id)
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-4 h-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                      </svg>
                                    </button>
                                    <DeleteChapter chapterId={chapter.id} />
                                  </p>
                                </div>
                              </div>
                            </Accordion.Body>
                          );
                        })}
                      </Accordion.Item>
                    </Accordion>
                  )
                )
              )}
            </div>
            <div className="mt-5">
              <button
                onClick={handleSave}
                className="bg-orange-100 hover:bg-orange-200 text-white  py-3 px-4 rounded"
              >
                Save Course
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddSection show={show} setShow={setShow} courseDetails={courseDetails} />
      <EditSection
        sectionId={sectionId}
        editSectionShow={editSectionShow}
        setShow={setShow}
        setEditSectionShow={setEditSectionShow}
      />
      <AddChapter
        chapterShow={chapterShow}
        setChapterShow={setChapterShow}
        courseDetails={courseDetails}
      />
      <EditChapter
        chapterId={chapterId}
        editChapterShow={editChapterShow}
        setEditChapterShow={setEditChapterShow}
      />
    </>
  );
};

export default EditCourse;
