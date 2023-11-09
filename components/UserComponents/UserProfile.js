"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  editUser,
  getUserbyID,
} from "@/app/GlobalRedux/Features/users/usersSlice";
import Loading from "@/app/announcement/loading";
import { Button } from "react-bootstrap";
import moment from "moment";
import { AiOutlinePlus } from "react-icons/ai";
import ButtonLoader from "@/utils/ButtonLoader";
import { useToast } from "@chakra-ui/react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    function getOneUser() {
      setLoading(true);
      dispatch(
        getUserbyID({
          token: userDetails.token,
          id: userDetails?.logInUser?.id,
        })
      ).then((res) => {
        setFname(res.payload.user.fname);
        setLname(res.payload.user.lname);
        setDob(moment(res.payload.user.user_meta.dob).format("L"));
        setCountry(res.payload.user.user_meta.country);
        setAddress(res.payload.user.user_meta.address);
        setLoading(false);
      });
    }
    getOneUser();
  }, []);
  const handleChange = async () => {
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("country", country);
    formData.append("address", address);
    formData.append("dob", dob);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const res = await dispatch(
        editUser({ formData, token: userDetails.token })
      );
      const { success, message, error } = res.payload;
      if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }

      setLoading(false);
      setEdit(false);
    } catch (err) {
      console.log(err);

      return err;
    }
  };
  const userDetails = useSelector((state) => state.user);
  // console.log("userDetails :>> ", userDetails);
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-blue-100 dark:bg-gray-700 text-black dark:text-white">
      <div className="h-full mb-10 ml-4">
        <div className="mx-auto w-full px-4 py-8 sm:px-8">
          <div className="overflow-y-hidden">
            <div className="flex justify-end ">
              <Button
                className="flex items-right gap-2 w-1/12 p-3 text-blue-950 mb-4"
                onClick={() => setEdit(true)}
              >
                Edit
              </Button>
            </div>

            <h1 className="mb-4 text-black text-3xl">My Profile</h1>

            <>
              {loading ? (
                <Loading />
              ) : (
                <div className="user-detail bg-white px-8 pt-8 pb-16 w-full">
                  <div className="user-image-box">
                    <div className="user-image">
                      {image ? (
                        <>
                          <img src={URL?.createObjectURL(image)} />
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          <AiOutlinePlus />
                        </>
                      ) : userDetails?.userData?.user?.user_meta?.image ? (
                        <>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${userDetails?.userData?.user?.user_meta?.image}`}
                          />
                          {edit && (
                            <>
                              {" "}
                              <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                              />
                              <AiOutlinePlus />
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {" "}
                          <img src={"/dummy-img.png"} />
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                          <AiOutlinePlus />
                        </>
                      )}
                    </div>

                    <p className="mb-3 text-2xl text-blue-950">
                      Alias: {userDetails?.userData?.user?.alias}
                    </p>
                  </div>

                  <div className="user-field">
                    <div className="user-label"> First Name</div>
                    {edit ? (
                      <input
                        className="border px-2 py-3 rounded"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    ) : (
                      <div className="user-text">{fname}</div>
                    )}
                  </div>
                  <div className="user-field">
                    <div className="user-label"> Last Name</div>
                    {edit ? (
                      <input
                        className="border px-2 py-3 rounded"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    ) : (
                      <div className="user-text">{lname}</div>
                    )}
                  </div>
                  <div className="user-field">
                    <div className="user-label"> Email</div>
                    <div className="user-text">
                      {userDetails?.userData?.user?.email}
                    </div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> Email verifed</div>
                    <div className="user-text">
                      {!userDetails?.userData?.user?.email_verified
                        ? "No"
                        : "Yes"}
                    </div>
                  </div>

                  <div className="user-field">
                    <div className="user-label"> address</div>
                    <div className="user-text">
                      {edit ? (
                        <input
                          className="border px-2 py-3 rounded"
                          value={address}
                          placeholder="address"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      ) : (
                        <div className="user-text">
                          {address || "No Data Found"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> country</div>
                    <div className="user-text">
                      {edit ? (
                        <input
                          className="border px-2 py-3 rounded"
                          value={country}
                          placeholder="country"
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      ) : (
                        <div className="user-text">
                          {country || "No Data Found"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="user-field">
                    <div className="user-label"> Date of Birth</div>
                    <div className="user-text">
                      {edit ? (
                        <input
                          className="border px-2 py-3 rounded"
                          type="date"
                          value={moment(dob, "MM/DD/YYYY").format("YYYY-MM-DD")}
                          placeholder="Date of Birth"
                          onChange={(e) =>
                            setDob(moment(e.target.value).format("L"))
                          }
                        />
                      ) : (
                        <div className="user-text">
                          {dob || "No Data Found"}
                        </div>
                      )}
                    </div>
                  </div>
                  {edit && (
                    <div>
                      <Button onClick={handleChange}>Update</Button>
                    </div>
                  )}
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
