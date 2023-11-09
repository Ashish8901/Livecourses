import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardImg from "../../../public/courses.jpg";
import CardImg1 from "../../../public/courses1.jpg";
import CardImg2 from "../../../public/courses2.jpg";

const Courses = () => {
  return (
    <>
      <section className="course-section member-section pt-16  pb-16">
        <div className="container">
          <h1 className="text-center text-blue-950 mb-3 text-5xl font-semibold">
            See Our Courses
          </h1>
          <p className="font-normal text-gray-500 mb-5 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="course-img">
                  <Image
                    className="hover-img card-img-top"
                    alt=""
                    src={CardImg}
                  />
                </div>
                <div className="card-content">
                  <div className="card-body">
                    <h6 className="course-code mb-2"> RT-CloudSec23</h6>
                    <h5 className="card-title font-medium">
                      Cloud Stack Security and Automation
                    </h5>

                    <p className="card-text text-gray-500">
                      Online instructor lead, 50 hrs including lab
                    </p>
                  </div>
                  <div className="course-outine text-gray-500">
                    <h6>Course Outline -</h6>
                    <ul>
                      <li>Fundamentals of Cloud Concept CISSP NIST </li>
                      <li>Cloud Security Architecture & Design NIST other</li>
                      <li>Cloud Infrastructure as Security</li>
                      <li>Cloud Development Security (DevSec)</li>
                      <li>Cloud Operations Security (SecOps) </li>
                      <li>Governance, Regulatory, Compliance</li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="divider"></div>
                    <Link href="/courses" className="card-link text-orange-100">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="course-img">
                  <Image
                    className="hover-img card-img-top"
                    alt=""
                    src={CardImg1}
                  />
                </div>
                <div className="card-content text-gray-500">
                  <div className="card-body">
                    <h6 className="course-code mb-2"> RT-CoreSec23</h6>
                    <h5 className="card-title font-medium">
                      Data & Network Security
                    </h5>

                    <p className="card-text text-gray-500">
                      Online instructor lead, 30 hrs including lab
                    </p>
                  </div>
                  <div className="course-outine">
                    <h6>Course Outline -</h6>
                    <ul>
                      <li>Information & Network Security Concept </li>
                      <li>Symmetric Ciphers </li>
                      <li>Block Ciphers and modes of Block Cipher</li>
                      <li>Advanced Encryption Standard </li>
                      <li>Asymmetric Ciphers </li>
                      <li>RSA and Diffie Hellman Key Exchange </li>
                      <li>Cryptographic Hash Function and MAC</li>
                      <li>Digital Signature & Types</li>
                      <li>IP Security, Kerberos Protocol</li>
                      <li>Cloud Security Basics</li>
                    </ul>
                  </div>
                  <div className="card-body ">
                    <div className="divider"></div>
                    <Link href="/courses" className="card-link text-orange-100">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="course-img">
                  <Image
                    className="hover-img card-img-top"
                    alt=""
                    src={CardImg2}
                  />
                </div>
                <div className="card-content text-gray-500">
                  <div className="card-body">
                    <h6 className="course-code mb-2">RT-AppSec23</h6>
                    <h5 className="card-title font-medium">
                      Application Security
                    </h5>
                    <p className="card-text text-gray-500">
                      Online instructor lead, 40 hrs including lab
                    </p>
                  </div>
                  <div className="course-outine">
                    <h6>Course Outline -</h6>
                    <ul>
                      <li>Application Security Concept</li>
                      <li>Architecture & Design of Secure Software</li>
                      <li>Threat modeling</li>
                      <li>Application Security Requirements (ASR)</li>
                      <li>Application Security Implementation</li>
                      <li>Testing Secure Application</li>
                      <li>Application Security Compliance</li>
                      <li>Secure Coding using Java, OWASP Top 10 / SANS 25</li>
                      <li>HTTP Security</li>
                    </ul>
                  </div>
                  <div className="card-body ">
                    <div className="divider"></div>
                    <Link href="/courses" className="card-link text-orange-100">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <Link href="/courses">
                <button className="py-3 custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-0 px-4 ">
                  See More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Courses;
