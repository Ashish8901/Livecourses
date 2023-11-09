import Link from "next/link";
import Image from "next/image";
import dummy from "../../../public/dummy-img.png";
import React from "react";
import DeleteAnnouncement from "./DeleteAnnouncement";
import axios from "axios";
import moment from "moment";
import AnnouncementPagination from "./AnnouncementPagination";

async function fetchAllAnnouncements({ page, limit }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/announcements?limit=${limit}&page=${page}`
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data?.message;
  }
}
const page = async ({ searchParams }) => {
  const AllAnnoucements = await fetchAllAnnouncements({
    page: searchParams.page || 1,
    limit: 6,
  });
  let x = 0;

  return (
    <>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 dark:bg-gray-700 text-black dark:text-white">
        <div className="h-full mb-10 md:ml-64">
          <div className="mx-auto w-full px-4 py-8 sm:px-8">
            <div className="overflow-y-hidden">
              <div className="flex justify-between mb-4 flex-wrap gap-4">

                <Link href="/admin/add-announcements">
                  <button className="custom-btn text-black hover:text-white  border border-black hover:bg-black uppercase py-2 px-4 ">
                    Add Announcement
                  </button>
                </Link>
              </div>

              <div className="overflow-x-auto bg-white mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-white uppercase border-b dark:border-gray-700 bg-blue-950 ">
                      <th className="px-5 py-3">Index</th>
                      <th className="px-5 py-3">Announcement Title</th>
                      <th className="px-5 py-3">Created By</th>
                      <th className="px-5 py-3">Created at</th>
                      <th className="px-5 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500">
                    {AllAnnoucements?.announcements?.length === 0 ? (
                      <h2> No Data Found</h2>
                    ) : (
                      AllAnnoucements?.announcements?.map((data, index) => {
                        x++;
                        return (
                          <tr key={data.id} className=" hover:bg-gray-100 text-gray-700 border-b dark:border-gray-700">
                            <td className="px-5 py-3">
                              <p className="whitespace-no-wrap">{index + 1}</p>
                            </td>
                            <td className=" px-5 py-3 text-sm">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <Image
                                    className="object-cover w-full h-full rounded-full"
                                    src={dummy}
                                    alt=""
                                    loading="lazy"
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="whitespace-no-wrap mb-0">
                                    {data?.title}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className=" px-5 py-3 text-sm">
                              <p className="whitespace-no-wrap mb-0">
                                {data?.createdBy.fname}  {""}{data?.createdBy.lname}
                              </p>
                            </td>
                            <td className="px-5 py-3 text-sm">
                              <p className="whitespace-no-wrap mb-0">
                                {" "}

                                {moment(data?.created_at).format("ll")}
                              </p>
                            </td>
                            <td className="px-5 py-3 text-sm text-right">
                              <p className="whitespace-no-wrap mb-0">
                                <Link href={`/admin/admin-announcement/${data.id}`}>
                                  <button className="action-icon edit ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      x="0px"
                                      y="0px"
                                      width="20"
                                      height="20"
                                      viewBox="0,0,256,256"
                                      style={{ fill: "#40C057" }}
                                    >
                                      <g
                                        fill="#40c057"
                                        fillRule="nonzero"
                                        stroke="none"
                                        strokeWidth="1"
                                        strokeLinecap="butt"
                                        strokeLinejoin="miter"
                                        strokeMiterlimit="10"
                                        strokeDasharray=""
                                        strokeDashoffset="0"
                                        fontFamily="none"
                                        fontWeight="none"
                                        fontSize="none"
                                        textAnchor="none"
                                        style={{ mixBlendMode: "normal" }}
                                      >
                                        <g transform="scale(2,2)">
                                          <path d="M79.33594,15.66797c-1.27148,-0.0457 -2.56094,0.09414 -3.83594,0.43164c-3.4,0.9 -6.20039,3.09961 -7.90039,6.09961l-3.59961,6.5c-0.8,1.4 -0.30039,3.30156 1.09961,4.10156l17.30078,10c0.5,0.3 1,0.39844 1.5,0.39844c0.3,0 0.49883,0.00039 0.79883,-0.09961c0.8,-0.2 1.40078,-0.70039 1.80078,-1.40039l3.69922,-6.5c1.7,-3 2.20078,-6.49844 1.30078,-9.89844c-0.9,-3.4 -3.09961,-6.20039 -6.09961,-7.90039c-1.875,-1.0625 -3.94531,-1.65625 -6.06445,-1.73242zM60.09766,38.12695c-0.96875,0.07422 -1.89844,0.59766 -2.39844,1.47266l-30.19922,52.40039c-3.4,5.8 -5.29922,12.30039 -5.69922,18.90039l-0.80078,12.90039c-0.1,1.1 0.5,2.19883 1.5,2.79883c0.5,0.3 1,0.40039 1.5,0.40039c0.6,0 1.19922,-0.2 1.69922,-0.5l10.80078,-7.09961c5.5,-3.7 10.2,-8.60039 13.5,-14.40039l30.30078,-52.40039c0.8,-1.4 0.29844,-3.29961 -1.10156,-4.09961c-1.4,-0.8 -3.29961,-0.30039 -4.09961,1.09961l-30.29883,52.40039c-2.9,4.9 -6.90117,9.20039 -11.70117,12.40039l-5.79883,3.79883l0.39844,-6.89844c0.3,-5.7 2.00039,-11.30078 4.90039,-16.30078l30.30078,-52.40039c0.8,-1.4 0.30039,-3.29961 -1.09961,-4.09961c-0.525,-0.3 -1.12188,-0.41758 -1.70312,-0.37305zM49,121c-1.7,0 -3,1.3 -3,3c0,1.7 1.3,3 3,3h40c1.7,0 3,-1.3 3,-3c0,-1.7 -1.3,-3 -3,-3zM104,121c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z"></path>
                                        </g>
                                      </g>
                                    </svg>
                                  </button>
                                </Link>
                                <DeleteAnnouncement data={data} />
                              </p>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              {AllAnnoucements && AllAnnoucements?.announcements?.length >= 6 &&(
                 <AnnouncementPagination AllAnnoucements={AllAnnoucements} />
              )}
             
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default page;
