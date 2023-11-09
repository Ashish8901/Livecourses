"use client";
import React, { useEffect } from "react";
import Pagination from "react-js-pagination";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import Link from "next/link";
import { getAllCourses } from "@/app/GlobalRedux/Features/courses/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/app/blogs/loading";
const CoursesGrid = () => {
  const dispatch = useDispatch();

  const Courses = useSelector((state) => state.courses);
  const userDetails = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [productCount, setProductCount] = useState(6);
  const [limit, setLimit] = useState(8);
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    async function AllCourses() {
      const data = await dispatch(
        getAllCourses({
          token: userDetails.token,
          pageNumber: currentPage,
          keyword: searchWord,
          limit: limit,
        })
      );
      setProductCount(data?.payload?.total);
    }
    AllCourses();
  }, [searchWord, currentPage]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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

  return (
    <>
      <section className="pt-16 pb-16">
        <div className="container">
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
                      onChange={(e) => setSearchWord(e.target.value)}
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
          <div className="row">
            {Courses?.loading ? (
              <Loading />
            ) : (
              Courses?.courses?.courses?.map((item) => {
                return (
                  <div className="col-lg-3 col-md-6" key={item.id}>
                    <div className="course-box">
                      <div className="course-img">
                        <img
                          className="hover-img card-img-top"
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image}`}
                        />
                      </div>
                      <div className="course-content">
                        <div className="author-info">
                          <span className="author-name">
                            {item.course_code}
                          </span>{" "}
                        </div>
                        <h3 className="course-title">
                          <Link href={`/courses/${item.id}`}>
                          {item.course_name}
                          </Link>
                        </h3>
                        <div className="course-meta">
                          <span className="course-meta-content">
                            {/* <span className="course-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-file-earmark-text"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                              </svg>
                            </span> */}
                            {item.description}
                          </span>
                        </div>
                        <div className="course-author">
                          <div className="offer-tag">
                            {" "}
                            {/* <ins>
                              <span className="amount">
                                <span className="price-symbol">$</span>
                                {item.price}
                              </span>
                            </ins>{" "} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex table-pagination justify-center pt-8">
            <ul className="inline-flex items-center gap-1 ">
              <li>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={limit}
                  totalItemsCount={productCount}
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

export default CoursesGrid;
