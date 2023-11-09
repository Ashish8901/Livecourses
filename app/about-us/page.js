import Image from "next/image";
import Link from "next/link";
import React from "react";
import AboutImg from '../../public/about.jpg'
const index = () => {
  return (
    <>
      <section>
        <div className="entry-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="entry-heading">About Us</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container about-us-points mt-12 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <h5 className="card-title font-medium mb-2">
                      Over 120+ Customer
                    </h5>
                    <p className="card-text text-gray-500">
                      Business Consultancy International is your gateway to a
                      successful future in business. Start today to learn more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <h5 className="card-title font-medium mb-2">
                      Video Courses Daily
                    </h5>
                    <p className="card-text text-gray-500">
                      Business Consultancy International is your gateway to a
                      successful future in business. Start today to learn more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <h5 className="card-title font-medium mb-2 ">
                      International gateway
                    </h5>
                    <p className="card-text text-gray-500">
                      Business Consultancy International is your gateway to a
                      successful future in business. Start today to learn more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white pt-20 pb-20">
          <div className="container">
            <div className="row items-center">
              <div className="col-lg-5">
                <div className="about-img">
                  <Image alt="" src={AboutImg} />
                </div>
              </div>
              <div className="col-lg-7 ">
                <div className="ms-5">
                  <h1 className="text-4xl font-semibold text-blue-950 mb-4">
                    We Offer Coaching Courses
                  </h1>
                  <p className="card-text text-gray-500 mb-3">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Nulla consequat massa quis enim.
                    Donec pede justo, fringilla vel, aliquet nec, vulputate
                    eget, arcu.
                  </p>
                  <p className="card-text text-gray-500">
                    Cum sociis natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Donec quam felis, ultricies
                    nec, pellentesque eu, pretium quis, sem. Nulla consequat
                    massa quis enim. Donec pede justo, fringilla vel, aliquet
                    nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                    imperdiet a, venenatis vitae, justo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-services pt-20 pb-20">
          <div className="container">
            <div className="row">
              <div className="col-lg-6"></div>
              <div className="col-lg-6">
                <div className="about-facility bg-white">
                  <h1 className="text-blue-950 text-4xl mb-7">
                    We Can Help You In Different Situations by this Course
                  </h1>
                  <p className="text-gray-500 mb-4">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis
                  </p>
                  <ul className="sqaure-list mb-8 pl-5 ">
                    <li>Coaching Courses for Life Call us</li>
                    <li>Every Video included in package</li>
                    <li>We have best support community</li>
                    <li>24/7 we are Online</li>
                  </ul>
                  <div>
                    <Link
                      href="/"
                      className="custom-btn text-orange-100 hover:text-white rounded-lg border-2 border-orange-100 hover:bg-orange-100 uppercase py-3 px-4 "
                    >
                      View all courses
                    </Link>
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

export default index;
