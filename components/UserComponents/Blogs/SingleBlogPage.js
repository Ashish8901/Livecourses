"use client";
import { getSingleBlog } from "@/app/GlobalRedux/Features/blogs/blogsSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import Loading from "@/app/blogs/loading";
import { useRouter } from "next/navigation";

const SingleBlogPage = ({ blogId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const AllBlogs = useSelector((state) => state.blogs);
  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    if (!userDetails.token) {
      router.push("/blogs");
    }
    dispatch(getSingleBlog({ blog_id: blogId, token: userDetails.token }));
  }, [userDetails]);

  return (
    <>
      {AllBlogs.loading ? (
        <Loading />
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Link href="/blogs">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mb-8"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>{" "}
          </Link>
          <article className="overflow-hidden rounded-lg shadow">
            <img
              alt="Office"
              src={`${process.env.NEXT_PUBLIC_API_URL}/${AllBlogs?.singleBlogData?.blog?.image}`}
              className="h-56 w-full object-cover"
            />
            <div className="bg-white p-4 sm:p-6">
              <time className="block text-xs text-gray-500">
                {moment(AllBlogs?.singleBlogData?.blog?.created_at).format(
                  "LL"
                )}
              </time>
              <h1 className="heading-blog mt-0.5 text-xl font-semibold text-gray-900">
                {AllBlogs?.singleBlogData?.blog?.title}
              </h1>
              <p
                className="mt-2 text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: AllBlogs?.singleBlogData?.blog?.description
                    .replace(/<p>/g, "")
                    .replace(/<\/p>/g, ""),
                }}
              ></p>
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default SingleBlogPage;
