"use client";
import Pagination from "react-js-pagination";
import { Spinner, useToast } from "@chakra-ui/react";
import { Listbox } from "@headlessui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "@/app/GlobalRedux/Features/blogs/blogsSlice";
import Loading from "@/app/blogs/loading";

const AllBlogPage = () => {
  const filter = [
    { id: 0, name: "Categories", unavailable: false },
    { id: 1, name: "IT & Software", unavailable: false },
    { id: 2, name: "Finance & Accounting", unavailable: false },
  ];
  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const sortby = [
    { id: 0, name: "Recently Accessed", unavailable: false },
    { id: 1, name: "Recently Enrolled", unavailable: false },
    { id: 2, name: "Title: A-to-Z", unavailable: false },
    { id: 2, name: "Title: z-to-A", unavailable: false },
  ];
  const [selectedSortby, setSelectedSortby] = useState(sortby[0]);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const AllBlogs = useSelector((state) => state.blogs);
  const userDetails = useSelector((state) => state.user);
  const [activePage, setActivePage] = useState(1);
  const [productCount, setProductCount] = useState(12);
  const [totalPage, setTotalPages] = useState(AllBlogs?.blogsData?.total);
  const [searchText, setSearchText] = useState("");
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    dispatch(getAllBlogs({ limit: productCount, pageNumber: pageNumber }));
  };

  useEffect(() => {
    dispatch(
      getAllBlogs({
        limit: productCount,
        pageNumber: activePage,
        keyword: searchText,
      })
    );
  }, [dispatch, searchText, activePage]);
  const handleBlog = (id) => {
    if (userDetails.token) {
      router.push(`/blogs/${id}`);
    } else {
      toast({
        title: "Unauthorized access",
        description: "Please login to see the blogs",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <section className="bg-blue-100 pb-16">
        <div className="entry-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="entry-heading">All Blogs</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-20">
          <div className="row">
            <div className="col-lg-12">
              <div className="filter-course flex justify-between items-end mb-16">
                <div className="filter-left flex wrap gap-4">
                  {/* <div className="relative">
                    <h6>Sort by</h6>
                    <Listbox
                      value={selectedSortby}
                      onChange={setSelectedSortby}
                    >
                      <Listbox.Button className="tutor-form-control">
                        <span>
                          {selectedSortby.name}{" "}
                          <span className="filter-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-chevron-down"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                              />
                            </svg>
                          </span>
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="tutor-form-select-dropdown">
                        {sortby.map((Sortby) => (
                          <Listbox.Option
                            key={Sortby.id}
                            value={Sortby}
                            disabled={Sortby.unavailable}
                            className="hover:text-white hover:bg-orange-100"
                          >
                            {Sortby.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>
                  </div>
                  <div className="relative">
                    <h6>Filter by</h6>
                    <Listbox
                      value={selectedFilter}
                      onChange={setSelectedFilter}
                    >
                      <Listbox.Button className="tutor-form-control">
                        <span>
                          {selectedFilter.name}{" "}
                          <span className="filter-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-chevron-down"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                              />
                            </svg>
                          </span>
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="tutor-form-select-dropdown">
                        {filter.map((Filter) => (
                          <Listbox.Option
                            key={Filter.id}
                            value={Filter}
                            disabled={Filter.unavailable}
                            className="hover:text-white hover:bg-orange-100"
                          >
                            {Filter.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>
                  </div> */}
                </div>
                <div className="filter-right">
                  <form className="search-form flex flex-warp ">
                    <input
                      className="w-full px-3 py-2 bg-gray-300  focus:border-blue-500 focus:outline-none"
                      type="search"
                      placeholder="Search here....."
                      id="site-search"
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="w-12 flex justify-center items-center bg-black "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="white"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {AllBlogs.loading === true ? (
            <>
              <Loading />
            </>
          ) : (
            <div className="row">
              {
                AllBlogs?.blogsData?.blogs?.map((elem, index) => {
                  return (
                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                      <article
                        key={index}
                        className=" overflow-hidden  transition hover:shadow-lg"
                      >
                        <img
                          alt="Office"
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${elem.image}`}
                          className="hover-img h-56 w-full object-cover"
                        />

                        <div className="bg-white p-4 sm:p-6 blog-content">
                          {/* <p className="text-gray-500 text-sm mb-1">
                          By {elem.createdBy.fname}
                        </p> */}
                          <time
                            dateTime="2022-10-10"
                            className="block text-xs text-gray-500"
                          >
                            {moment(elem.created_at).format("LL")}
                          </time>

                          <h3 className="blog-heading mt-0.5 text-2xl text-blue-950">
                            {elem.title}
                          </h3>

                          {/* <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                            dangerouslySetInnerHTML=
                            {`${elem.description}`}
                          </p> */}
                          <p
                            className="mt-2 line-clamp-3 text-sm text-gray-500"
                            dangerouslySetInnerHTML={{
                              __html: elem.description
                                .replace(/<p>/g, "")
                                .replace(/<\/p>/g, ""),
                            }}
                          ></p>

                          <div className="divider"></div>
                          <button
                            key={index}
                            onClick={() => handleBlog(elem.id)}
                            className="card-link text-orange-100"
                          >
                            Read More
                          </button>
                        </div>
                      </article>
                    </div>
                  );
                })
                // )
              }
            </div>
          )}
          <div className="flex table-pagination justify-center">
            <ul className="inline-flex items-center gap-1 ">
              <li>
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={productCount}
                  totalItemsCount={totalPage}
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
        </div>
      </section>
    </>
  );
};

export default AllBlogPage;
