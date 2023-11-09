"use client";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import HeroSection from "@/components/UserComponents/HomePage/HeroSection";
import ExecutiveCourse from "@/components/UserComponents/HomePage/ExecutiveCourse";
import Courses from "@/components/UserComponents/HomePage/Courses";
import Subscribe from "@/components/UserComponents/HomePage/Subscribe";
import { loginUser } from "./GlobalRedux/Features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import ButtonLoader from "@/utils/ButtonLoader";
export default function Home() {
  const toast = useToast();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [OTP, setOTP] = useState(null);
  const [email, setEmail] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(600);
  const handleClose = () => setModalShow(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(loginUser(token)).then((res) => {
        if (res.payload.success && !res.payload.user.email) {
          setModalShow(true);
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (show) {
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
  }, [show, remainingTime]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  const handleAddEmail = async () => {
    try {
      setLoader(true);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/add-email`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${userDetails?.token}`,
          },
        }
      );

      const { message, success } = response.data;

      if (success) {
        setLoader(false);
        toast({
          title: message,
          description: "An OTP is sent to your registered Email",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        setEmail(null);
        setShow(true);
      }
    } catch (error) {
      setLoader(false);
      toast({
        title: error.response.data.error,
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  const handleOTPVerification = async () => {
    const data = {
      otp: OTP,
    };
    try {
      setLoader(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/verify-mail`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userDetails?.token}`,
          },
        }
      );

      const { success, message } = response.data;
      if (success) {
        setLoader(false);
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.push("/");
        setModalShow(false);
      }
    } catch (error) {
      setLoader(false);
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
      setLoader(true);
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
        setLoader(false);
        toast({
          title: error,
          description: message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (success) {
        setLoader(false);

        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setShow(true);
      }
    } catch (error) {
      setLoader(false);

      console.log("error :>> ", error);
    }
  };
  return (
    <div>
      <HeroSection />
      <ExecutiveCourse />
      <Courses />
      <Subscribe />
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
            Add your email for verification !
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
          {show ? (
            <>
              <div className="mt-4 mb-4">
                <label className="font-medium mb-2">Enter your OTP</label>
                <input
                  value={OTP}
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
                    className="custom-btn mt-3 text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
                    onClick={handleResendOTP}
                  >
                    {loader ? <ButtonLoader /> : "Resend OTP"}
                  </Button>
                </div>
              ) : (
                <div classsName="mt-2">
                  <Button
                    className="custom-btn mt-3 text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
                    onClick={handleOTPVerification}
                  >
                    {loader ? <ButtonLoader /> : "Verify"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mt-4 mb-4">
                <label className="font-medium mb-2">Enter email here</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-300  border focus:border-blue-500 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div classsName="mt-2">
                <Button
                  className="custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 bg-white"
                  onClick={handleAddEmail}
                >
                  {loader ? <ButtonLoader /> : "Submit"}
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
