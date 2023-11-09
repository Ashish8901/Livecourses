import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import TrainingImg from '../../../public/training-img.jpg'
const ExecutiveCourse = () => {
  return (
    <>
      <section className="executive-section pt-16 pb-56">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h5 className="style-text font-medium ">Executive Training</h5>
            </div>
            <div className="col-lg-9 ">
              <h1 className="text-blue-950 mb-4 text-5xl font-semibold">
                What is this about
              </h1>
              <h5 className="font-normal text-gray-500 mb-5">
                Starting 2024, we will be providing Software Security training.
                We are confident that our training will definitely take your
                skills to the next level in your career.
              </h5>
              <div>
                <Link
                  href="/about-us"
                  className="custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 "
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="member-section pt-16  pb-16">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h5 className="style-text font-medium">
                Along with training, we help in career coach, mock interviews to
                make prepare you for the next move to software security related
                jobs.
              </h5>
            </div>
            <div className="col-lg-9">
              <div className="traning-img">
                <Image src={TrainingImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ExecutiveCourse