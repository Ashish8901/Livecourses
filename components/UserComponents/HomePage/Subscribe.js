"use client";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const Subscribe = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    const data = { email };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscribers`,
        data
      );
      const { message, success } = response.data;
      if (success) {
        toast({
          title: message,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setEmail("");
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <section className="pt-20 pb-20">
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-center text-blue-950 mb-3 text-5xl font-semibold">
                Want to Receive Fresh News?
              </h1>
            </div>
            <div className="col-lg-12">
              <div className="">
                <p className="font-normal text-gray-500 mb-5 text-center">
                  Subscribe to our daily newsletter to stay ahead of the
                  trending cources and updates
                </p>
                <div>
                  <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                      <form className="flex gap-2 flex-warp ">
                        <input
                          className="w-3/5 px-4 py-3 rounded-lg bg-gray-300  border focus:border-blue-500 focus:outline-none"
                          type="email"
                          placeholder="Email address"
                          name="mail"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={handleSubscribe}
                          className="custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-0 px-4 "
                        >
                          subscribe Now
                        </button>
                      </form>
                    </div>
                    <div className="col-lg-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscribe;
