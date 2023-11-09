"use client";
import Link from "next/link";
import { Listbox } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { getAllCategory } from "@/app/GlobalRedux/Features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "@/app/GlobalRedux/Features/courses/courseSlice";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
const AddCourse = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();
  const userDetails = useSelector((state) => state.user);

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [courseCategory, setCourseCategory] = useState();
  const [outlineText, setOutlineText] = useState("");
  const [courseOutline, setCourseOutline] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [inputState, setInputState] = useState(false);
  const [inputSelectTypes, setInputSelectTypes] = useState([]);
  const addInputSelect = () => {
    setInputState(true);
    setInputSelectTypes([...inputSelectTypes, ""]);
  };
  const addText = () => {
    addInputSelect();
    setCourseOutline([...courseOutline, outlineText]);
    setOutlineText("");
    // setInputSelectTypes([]);
    // setInputState(false);
  };
  const handleDeleteCourseOutline = (indexToDelete) => {
    const newCourseOutline = [
      ...courseOutline.slice(0, indexToDelete),
      ...courseOutline.slice(indexToDelete + 1),
    ];
    setCourseOutline(newCourseOutline);
  };

  const [file, setFile] = useState();
  function handleChange(e) {
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    async function getCategories() {
      const { payload } = await dispatch(
        getAllCategory({ token: userDetails.token })
      );
      setAllCategory(payload.categories);
      setCourseCategory(payload.categories[0].id);
    }
    getCategories();
  }, []);
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("courseCode", courseCode);
    formData.append("course_name", courseName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", courseCategory);
    formData.append("image", image);
    courseOutline.forEach((item) => formData.append("courseOutline", item));

    try {
      const res = await dispatch(
        addCourse({ formData, token: userDetails.token })
      );
      const { error, success, message } = res.payload;
      if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.push(`/admin/course-list/${res?.payload?.course?.id}`);
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

  return (
    <>
      <div className="h-full mb-10 md:ml-64">
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <h1 className="mb-4 text-black text-3xl">Add Course</h1>
          <div className="row bg-white p-8 w-full ">
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
            <div className="col-lg-12 mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Course Outline
              </label>
              <div className="relative">
                <div>
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
                            onChange={(e) => {
                              const newArr = [...courseOutline];
                              newArr[index] = e.target.value;
                              setCourseOutline(newArr);
                            }}
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
              </div>
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
                onChange={(e) => setCourseCategory(e.target.value)}
              >
                {allCategory.map((item) => (
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
            <div className="col-lg-12 mb-4">
              <label
                htmlFor="blogContent"
                className="block text-gray-700 font-bold mb-2"
              >
                Upload Course Image
              </label>
              <div className="user-image-box">
                <span className="block upload-btn mb-3">
                  <input type="file" onChange={handleChange} />
                </span>
                <div className="user-image">
                  <img alt="" src={file} />
                </div>
              </div>
            </div>
            <div className="">
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
    </>
  );
};

export default AddCourse;
