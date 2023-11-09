import {
  editSection,
  getSingleSection,
} from "@/app/GlobalRedux/Features/courses/courseSlice";
import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";

const EditSection = ({
  sectionId,
  editSectionShow,
  setEditSectionShow,
  setShow,
}) => {
  const handleClose = () => setShow(false);
  const handleEditSectionClose = () => setEditSectionShow(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const userDetails = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (sectionId) {
      const fetchSingleSection = async () => {
        const { payload } = await dispatch(
          getSingleSection({ token: userDetails.token, sectionId })
        );
        setTitle(payload?.courseSection?.title);
        setDescription(payload?.courseSection?.description);
      };
      fetchSingleSection();
    }
  }, [sectionId]);

  const handleEditSection = async () => {
    try {
      const data = {
        title,
        description,
      };
      const { payload } = await dispatch(
        editSection({ token: userDetails.token, sectionId, data })
      );
      const { error, success, message } = payload;
      if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        handleEditSectionClose();
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
      show={editSectionShow}
      onHide={handleClose}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-black"
    >
      <Modal.Header>
        <Modal.Title>Edit Section</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row ">
          <div className="col-lg-12 mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Section ID
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder=" ID"
              value={sectionId}
            />
          </div>
          <div className="col-lg-12 mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder=" Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
          onClick={handleEditSection}
        >
          Save Section
        </button>
        <button
          className="custom-btn rounded-md border py-2"
          onClick={handleEditSectionClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSection;
