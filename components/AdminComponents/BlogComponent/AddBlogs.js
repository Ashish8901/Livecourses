"use client";
import { addBlog } from "@/app/GlobalRedux/Features/blogs/blogsSlice";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CKeditor from "./CKeditor";

const AddBlogs = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const toast = useToast();
  const [editorLoaded, setEditorLoaded] = useState(false);
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const userDetails = useSelector((state) => state.user);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleSaveBlog = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", content);

    try {
      const response = await dispatch(
        addBlog({ formData, token: userDetails?.token })
      );
      const { error, message, success } = response.payload;
      if (success) {
        toast({
          title: "Blog Created",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.push("/admin/blog-list");
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
      console.log("error :>> ", error);
    }
  };
  return (
    <div className="h-full mb-10 md:ml-64">
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <h1 className="mb-4 text-black text-3xl">Add Blogs</h1>
        <div className="row bg-white p-8 w-full">
          <div className="col-lg-6 mb-4">
            <label
              htmlFor="alias"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="alias"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="col-lg-6 mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-bold mb-2"
            >
              Upload File:
            </label>
            <input
              type="file"
              id="file"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              onChange={handleFileChange}
            />
          </div>
          <div className="col-lg-12 mb-4">
            <label
              htmlFor="blogContent"
              className="block text-gray-700 font-bold mb-2"
            >
              Blog Content:
            </label>
            <CKeditor
              className="min-h-ck"
              name="description"
              onChange={(data) => {
                setContent(data);
              }}
              editorLoaded={editorLoaded}
            />
            {/* {typeof window !== "undefined" && (
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={handleEditorChange}
          />
        )} */}
          </div>
          <div className="">
            <button
              className="bg-orange-100 hover:bg-orange-200 text-white  py-3 px-4 rounded"
              onClick={handleSaveBlog}
            >
              Save Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogs;
