"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../app/GlobalRedux/Features/users/usersSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import LoginImg from "../../public/login.jpg";
import axios from "axios";
export default function Register() {
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);

  const [OTP, setOTP] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(600);
  useEffect(() => {
    if (modalShow) {
      const timer = setTimeout(() => {
        setIsExpired(true);
      }, remainingTime * 1000);
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [modalShow, remainingTime]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleFormSubmit = async () => {
    const response = await dispatch(addUser(watch()));
    const { error, message, success, user } = response?.payload;
    if (error) {
      toast({
        title: error,
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else if (success) {
      toast({
        title: message,
        description: `Yay!, you are successfully register ${response?.payload?.user?.fname}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      if (!user.email_verified) {
        setModalShow(true);
      }
    }
  };
  const userDetails = useSelector((state) => state.user);
  const handleOTPVerification = async () => {
    const data = {
      otp: OTP,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/verify-mail`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userDetails?.userData?.token}`,
          },
        }
      );
      const { success, message } = response.data;
      if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.push("/login");
      }
    } catch (error) {
      toast({
        title: error?.response?.data?.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  const handleResendOTP = async () => {
    setOTP("");
    setIsExpired(false);
    setRemainingTime(600);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/request-mail-verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userDetails?.userData?.token}`,
          },
        }
      );
      const { error, message, success } = response.data;
      if (error) {
        toast({
          title: error,
          description: message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setShow(true);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen overflow-scroll no-scrollbar items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen overflow-auto no-scrollbar">
          <Image
            src={LoginImg}
            priority
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="bg-blue-100 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12
  flex items-center justify-center h-screen overflow-auto no-scrollbar"
        >
          <div className="w-full h-100 pt-8 pb-16">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-950 md:text-2xl ">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div>
                <input
                  type="text"
                  {...register("alias", { required: "This is required" })}
                  id="alias"
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 mt-2 border focus:border-blue-500 focus:outline-none"
                  placeholder="alias Ex. Aashish01"
                  // onChange={handleChange}
                />
                <p className="text-red-600">{errors?.alias?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("fname", { required: "This is required" })}
                  id="fname"
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 mt-2 border focus:border-blue-500 focus:outline-none"
                  placeholder="First Name"
                  // onChange={handleChange}
                />
                <p className="text-red-600">{errors?.fname?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("lname", { required: "This is required" })}
                  id="lname"
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 mt-2 border focus:border-blue-500 focus:outline-none"
                  placeholder="Last name"
                  // onChange={handleChange}
                />
                <p className="text-red-600">{errors?.lname?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  {...register("email", {
                    required: "This is required",
                    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // regular expression for email addresses
                  })}
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 mt-2 border focus:border-blue-500 focus:outline-none"
                  placeholder="Your email"
                  // onChange={handleChange}
                />
                {errors.email?.type === "pattern" ? (
                  <p>Enter a valid email address</p>
                ) : (
                  <p className="text-red-600">{errors?.email?.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register("country", { required: "This is required" })}
                  id="country"
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 mt-2 border focus:border-blue-500 focus:outline-none"
                  placeholder="Your Country"
                  // onChange={handleChange}
                />
                <p className="text-red-600">{errors?.country?.message}</p>
              </div>
              <div>
                <input
                  type="password"
                  {...register("password", { required: "This is required" })}
                  id="password"
                  placeholder="Password here ..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 mt-2 border focus:border-blue-500 focus:outline-none"
                  // onChange={handleChange}
                />
                <p className="text-red-600">{errors?.password?.message}</p>
              </div>
              <div>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "This is required",
                  })}
                  id="confirm-password"
                  placeholder="Confirm password here ..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 mt-2 border focus:border-blue-500 focus:outline-none"
                  // onChange={handleChange}
                />
                <p className="text-red-600">
                  {errors?.confirmPassword?.message}
                </p>
              </div>
              <button
                type="submit"
                className="block py-3 px-4 font-medium text-center text-white bg-orange-100 hover:bg-red-500 active:bg-red-500 active:shadow-none rounded-lg shadow md:inline"
              >
                Create an account
              </button>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-blue-100 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-3 social-icons">
                  <div>
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`}
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <img
                        className="h-5 w-5"
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400 mb-5">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
      {/* modal starts */}
      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        className="otp-modal"
        centered
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-blue-950"
          >
            <p className="mb-0">Enter OTP sent on your registered Email</p>
          </Modal.Title>
          <button onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-4 mb-4">
            <label className="font-medium mb-2">Enter your OTP</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-300  border focus:border-blue-500 focus:outline-none"
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          {isExpired ? (
            <span>OTP has expired</span>
          ) : (
            <span>
              Time remaining:{" "}
              <span className="text-red-600">{formatTime(remainingTime)}</span>
            </span>
          )}
          {isExpired ? (
            <div classsName="mt-2">
              <Button
                className="custom-btn mt-3 text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
                onClick={handleResendOTP}
              >
                Resend OTP
              </Button>
            </div>
          ) : (
            <div classsName="mt-2">
              <Button
                className="custom-btn mt-3 text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
                onClick={handleOTPVerification}
              >
                Verify
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
