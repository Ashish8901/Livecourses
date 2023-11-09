"use client";
import { addSection } from "@/app/GlobalRedux/Features/courses/courseSlice";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

const AddSection = ({ show, setShow, courseDetails }) => {
  // const handleEditSectionClose = () => setEditSectionShow(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateSection = async () => {
    try {
      const data = {
        courseId: courseDetails?.id,
        title,
        description,
      };
      const { payload } = await dispatch(
        addSection({ token: userDetails.token, data })
      );
      const { error, success, message } = payload;
      if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        handleClose();
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
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-black"
    >
      <Modal.Header>
        <Modal.Title>Add Section</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row ">
          <div className="col-lg-12 mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Course ID
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder="Course ID"
              value={courseDetails?.id}
            />
          </div>
          <div className="col-lg-12 mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Course Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder="Course name"
              value={courseDetails?.course_name}
            />
          </div>
          <div className="col-lg-12 mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Lab Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-lg-12 mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-bold mb-2"
            >
              Lab Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="custom-btn rounded-md border bg-black text-white py-2"
          onClick={handleCreateSection}
        >
          Create Section
        </button>
        <button
          className="custom-btn rounded-md border py-2"
          onClick={handleClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSection;
