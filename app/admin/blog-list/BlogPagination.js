"use client";
import { useCallback, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "@/app/GlobalRedux/Features/blogs/blogsSlice";

const BlogPagination = ({ blogsData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const searchParams = useSearchParams();
  const userDetails = useSelector((state) => state.user);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    router.push(
      "/admin/blog-list" +
        "?" +
        `${createQueryString("pageNumber", String(pageNumber))}`
    );
  };

  useEffect(() => {
    dispatch(
      getAllBlogs({
        limit: blogsData.limit,
        pageNumber: activePage,
        token: userDetails.token,
      })
    );
  }, [activePage]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex table-pagination justify-center">
      <ul className="inline-flex items-center gap-1 ">
        <li>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={blogsData.limit}
            totalItemsCount={blogsData?.total}
            onChange={handlePageChange}
            pageRangeDisplayed={5}
            nextPageText={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            }
            prevPageText={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            }
            firstPageText={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-double-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            }
            lastPageText={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-double-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            }
            itemClassName="page-item"
            linkClassName="page-link"
            activeClassName="pageItemActive"
            activeLinkClassName="pageLinkActive"
          />
        </li>
      </ul>
    </div>
  );
};

export default BlogPagination;
