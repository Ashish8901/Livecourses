"use client";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { loginUser } from "../../app/GlobalRedux/Features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import LoginImg from "../../public/login.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [OTP, setOTP] = useState(null);
  const handleClose = () => setModalShow(false);
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
    const response = await dispatch(loginUser(watch()));
    const { error, message, success, user, access_token } = response.payload;
    if (error) {
      toast({
        title: error,
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else if (success) {
      if (user.role.role_name === "Admin") {
        router.push("/admin");
      } else {
        if (!user.email_verified) {
          setModalShow(true);
        } else {
          router.push("/");
        }
      }
      toast({
        title: "Login Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  const userDetails = useSelector((state) => state.user);
  const handleEmailVerification = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/request-mail-verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userDetails?.token}`,
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
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      );
      const { success, message, error } = response.data;
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
        router.push("/");
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
  };
  return (
    <>
      {/* component */}
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
          className="bg-blue-100 w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12
  flex items-center justify-center h-screen overflow-auto no-scrollbar"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-10 text-blue-950">
              Log in to your account
            </h1>
            <form
              className="mt-6"
              action="#"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  {...register("username", { required: "This is required" })}
                  id="username"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 mt-2 border focus:border-blue-500 focus:outline-none"
                  autoComplete=""
                />
                <p className="text-red-600">{errors?.username?.message}</p>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  {...register("password", { required: "This is required" })}
                  id="password"
                  placeholder="Enter Password"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-300 mt-2 border focus:border-blue-500
           focus:outline-none"
                />
                <p className="text-red-600">{errors?.password?.message}</p>
              </div>
              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full block bg-orange-100 hover:bg-red-500 focus:bg-red-500 text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>
            <hr className="my-6 border-gray-300 w-full" />
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
                {/* <div>
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                      alt=""
                    />
                  </a>
                </div> */}
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
                <div>
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/github`}
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/475654/github-color.svg"
                      alt=""
                    />
                  </a>
                </div>
                {/* <div>
                  <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/twitter`}
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://seeklogo.com/images/T/twitter-x-logo-0339F999CF-seeklogo.com.png?v=638264860180000000"
                      alt=""
                    />
                  </a>
                </div> */}
              </div>
            </div>

            <p className="mt-8 text-gray-600">
              Need an account?{" "}
              <Link
                href="/signup"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="otp-modal"
      >
        <Modal.Header>
          <Modal.Title
            className="text-blue-950"
            id="contained-modal-title-vcenter"
          >
            Please verify your email !
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
          <p>Email Verification required</p>

          {!show ? (
            <Button
              className="custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
              onClick={handleEmailVerification}
            >
              Send OTP
            </Button>
          ) : (
            <>
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
                  <span className="text-red-600">
                    {formatTime(remainingTime)}
                  </span>
                </span>
              )}
              {isExpired ? (
                <div classsName="mt-2">
                  <Button
                    className="custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </Button>
                </div>
              ) : (
                <div classsName="mt-2">
                  <Button
                    className="custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
                    onClick={handleOTPVerification}
                  >
                    Verify
                  </Button>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={handleEmailVerification}>Verify</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
