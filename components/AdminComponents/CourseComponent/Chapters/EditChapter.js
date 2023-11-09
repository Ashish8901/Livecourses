"use client";
import {
  editChapter,
  getSingleChapter,
} from "@/app/GlobalRedux/Features/courses/courseSlice";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const EditChapter = ({ editChapterShow, setEditChapterShow, chapterId }) => {
  const handleEditChapterClose = () => setEditChapterShow(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const userDetails = useSelector((state) => state.user);
  const [sectionId, setSectionId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  useEffect(() => {
    if (chapterId) {
      async function fetchChapterbyId() {
        const { payload } = await dispatch(
          getSingleChapter({ token: userDetails.token, chapterId })
        );
        setSectionId(payload?.chapter?.section.id);
        setTitle(payload?.chapter?.title);
        setDescription(payload?.chapter?.description);
        setVideo(payload?.chapter?.video);
      }
      fetchChapterbyId();
    }
  }, [chapterId]);

  const handleEditChapter = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    formData.append("sectionId", sectionId);

    try {
      const { payload } = await dispatch(
        editChapter({ token: userDetails.token, formData, chapterId })
      );
      const { error, success, message } = payload;
      if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        handleEditChapterClose();
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
      show={editChapterShow}
      onHide={handleEditChapterClose}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-black"
    >
      <Modal.Header>
        <Modal.Title>Edit Chapter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row ">
          {/* <div className="col-lg-12 mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Course Id
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder=" Id"
            />
          </div> */}
          <div className="col-lg-12 mb-4">
            <label
              htmlFor="alias"
              className="block text-gray-700 font-bold mb-2"
            >
              Section Id
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder=" Id"
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

          <div className="col-lg-12 mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-bold mb-2"
            >
              Upload Video:
            </label>
            <input
              type="file"
              id="file"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="custom-btn rounded-md border bg-black text-white py-2"
          onClick={handleEditChapter}
        >
          Save Chapter
        </button>
        <button
          className="custom-btn rounded-md border py-2"
          onClick={handleEditChapterClose}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditChapter;
