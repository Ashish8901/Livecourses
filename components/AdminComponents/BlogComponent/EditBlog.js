"use client";
import {
  editBlog,
  getAllBlogs,
  getSingleBlog,
} from "@/app/GlobalRedux/Features/blogs/blogsSlice";
import Loading from "@/app/blogs/loading";
import { ImageURLtofile } from "@/utils/ImageURLto file";
import { useToast } from "@chakra-ui/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditBlog = ({ blogId }) => {
  const userDetails = useSelector((state) => state.user);
  const AllBlogs = useSelector((state) => state.blogs);
  const router = useRouter();
  const toast = useToast();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getBlogbyId() {
      const response = await dispatch(
        getSingleBlog({ blog_id: blogId, token: userDetails.token })
      );
      setLoading(false);
      setTitle(response.payload?.blog?.title);
      setContent(response.payload.blog?.description);
      const fileData = await ImageURLtofile(response.payload.blog?.image);
      setFile(fileData);
    }
    getBlogbyId();
  }, [userDetails, blogId]);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
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
        editBlog({ formData, token: userDetails?.token, id: blogId })
      );
      const { error, message, success } = response.payload;
      if (success) {
        toast({
          title: "Blog Edited Successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.push(
          "/admin/blog-list" + "?" + `pageNumber=${AllBlogs.blogsData.page}`
        );
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
        <button
          className="flex items-center gap-2 text-blue-950 mb-4"
          onClick={() =>
            router.push(
              "/admin/blog-list" +
                "?" +
                `pageNumber=${AllBlogs?.blogsData?.page}`
            )
          }
        >
          <span>
            <svg
              viewBox="0 0 450 450"
              fill="currentColor"
              height="1.5em"
              width="1.5em"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={38}
                d="M244 400L100 256l144-144M120 256h292"
              />
            </svg>
          </span>
          <span className="relative top-0.5">Back</span>
        </button>
        <h1 className="mb-4 text-black text-3xl">Edit Blog</h1>
        <div className="row bg-white p-8 w-full ">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="mb-4">
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
              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Upload File:
                </label>

                {file?.name ? (
                  <>
                    <img
                      src={URL?.createObjectURL(file)}
                      alt="Uploaded Image"
                      height={300}
                      width={300}
                      className="mb-2 max-w-full"
                    />
                    <div className="block text-gray-700 font-bold mb-2">
                      Name:
                    </div>{" "}
                    <div>{file.name}</div>
                  </>
                ) : (
                  <>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/${file}`} />
                  </>
                )}
                <input
                  type="file"
                  id="file"
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
                  onChange={handleFileChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="blogContent"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Blog Content:
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={handleEditorChange}
                />
              </div>
            </>
          )}
          <div className="">
            <button
              className="bg-orange-500 hover:bg-blue-700 text-white  py-3 px-4 rounded"
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

export default EditBlog;
