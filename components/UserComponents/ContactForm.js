"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AboutImg from "../../public/contact.jpg";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";

const ContactForm = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const adminSettings = useSelector((state) => state.settings);
  const [settings, setSettings] = useState(adminSettings?.settingsData?.settings);
  
  const handleSave = async () => {
    const data = { name, email, message };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/email/contact-us`,
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
    <section>
      <div className="entry-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="entry-heading">Contact Us</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white pt-20 pb-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <h1 className="text-center text-blue-950 mb-3 text-5xl font-normal">
                We’re Here To Help You
              </h1>
              <p className="font-normal text-gray-500 mb-5 text-center">
                We are waiting for you on our office in London or in way,
                contact us via the contact form below your idea. We are here to
                answer any question.
              </p>
            </div>
            <div className="col-lg-2"></div>
          </div>
          <div className="row ">
            <div className="col-lg-6">
              <div className="about-img">
                <Image alt="" src={AboutImg} />
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="ms-5">
                <div className="form-field">
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-300  border focus:border-blue-500 focus:outline-none"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <input
                    className="w-full px-4 py-3 rounded-lg bg-gray-300  border focus:border-blue-500 focus:outline-none"
                    type="email"
                    placeholder="Email address"
                    name="mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-gray-300  border focus:border-blue-500 focus:outline-none"
                    placeholder="Write your thoughts here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button
                    onClick={handleSave}
                    className="custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 "
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container contact-page about-us-points mt-12 mb-5">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <h5 className="card-title font-medium mb-2">Address -</h5>
                  <p className="card-text text-gray-500">
                    {settings?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <h5 className="card-title font-medium mb-2">Phone -</h5>
                  <p className="card-text text-gray-500">
                    <Link href="tel:6097510502">
                      {settings?.phone}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <h5 className="card-title font-medium mb-2 ">Email -</h5>
                  <p className="card-text text-gray-500">
                    <Link href="mailto:support@revanatech.com">
                      {settings?.email}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
