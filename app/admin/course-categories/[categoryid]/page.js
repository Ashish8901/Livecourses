"use client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getSingleCategory,
  editCategory,
} from "@/app/GlobalRedux/Features/category/categorySlice";
import ButtonLoader from "@/utils/ButtonLoader";
import Loading from "./loading";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const validateSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
});
const page = ({ params }) => {
  const { categoryid } = params;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  const userDetails = useSelector((state) => state.user);
  useEffect(() => {
    async function GetOneCategory() {
      try {
        const res = await dispatch(
          getSingleCategory({
            token: userDetails.token,
            categoryId: categoryid,
          })
        );
        const { category } = res?.payload;
        setValue("name", category?.name);
        setContent(category?.description);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching category:", error);
      }
    }
    GetOneCategory();
  }, [categoryid, dispatch, setValue, userDetails.token]);

  const handleEditCategory = async (data) => {
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
    
    setLoader(true);

    try {
      const response = await dispatch(
        editCategory({
          data: { ...data, description: content },
          categoryId: categoryid,
          token: userDetails?.token,
        })
      );
      setLoader(false);
      const { error, message, success } = response?.payload;
      if (success) {
        toast({
          title: "Category Updated Successfully!!",
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
      setLoader(false);
      console.log("error :>> ", error);
    }
  };
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  return (
    <div className="h-full mb-10 md:ml-64">
      {loading ? (
        <Loading/>
      ) : (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <h1 className="mb-4 text-black text-3xl">Add Category</h1>
          <form
            onSubmit={handleSubmit(handleEditCategory)}
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
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={handleEditorChange}
              />
            </div>
            <div className="">
              <button
                className="flex gap-3 bg-orange-100 hover:bg-orange-200 text-white  py-3 px-4 rounded"
                type="submit"
              >
                {loader && <ButtonLoader />} Save Category
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
