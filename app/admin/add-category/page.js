"use client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CKeditor from "./CKEditor";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCategory } from "@/app/GlobalRedux/Features/category/categorySlice";
import ButtonLoader from "@/utils/ButtonLoader";

const validateSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
});
const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const userDetails = useSelector((state) => state.user);

  const handleCreateCategory = async (data) => {
    if (!content) {
      toast({
        title: "Error",
        description: "Category Content is required",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);

    try {
      const response = await dispatch(
        addCategory({
          data: { ...data, description: content },
          token: userDetails?.token,
        })
      );
      setLoading(false);
      const { error, message, success } = response?.payload;
      if (success) {
        toast({
          title: "Category Created",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.push("/admin/course-categories");
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
      setLoading(false);
      console.log("error :>> ", error);
    }
  };
  return (
    <div className="h-full mb-10 md:ml-64">
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <h1 className="mb-4 text-black text-3xl">Add Category</h1>
        <form
          onSubmit={handleSubmit(handleCreateCategory)}
          className="row bg-white p-8 w-full"
        >
          <div className="col mb-4">
            <label
              htmlFor="alias"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="alias"
              name="name"
              className="w-full px-4 py-3 rounded-lg bg-gray-300 border focus:border-blue-500 focus:outline-none"
              placeholder="Title"
              {...register("name")}
            />

            {errors && errors?.name && (
              <p className="errorMessage">{errors?.name?.message}</p>
            )}
          </div>

          <div className="col-lg-12 mb-4">
            <label
              htmlFor="blogContent"
              className="block text-gray-700 font-bold mb-2"
            >
              Category Content:
            </label>
            <CKeditor
              className="min-h-ck"
              name="description"
              value={editorLoaded}
              onChange={(data) => {
                setContent(data);
              }}
              editorLoaded={editorLoaded}
            />
          </div>
          <div className="">
            <button
              className="flex gap-3 bg-orange-100 hover:bg-orange-200 text-white  py-3 px-4 rounded"
              type="submit"
            >
              {loading && <ButtonLoader />} Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
