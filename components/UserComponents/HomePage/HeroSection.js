import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/hero-img2.png";
const HeroSection = () => {
  return (
    <>
      <section className="hero-section pt-16 pb-16 ">
        <div className="container">
          <div className="row items-center">
            <div className="col-lg-6 text-white">
              <div className="hero-text">
                <h1 className="text-7xl mb-4 font-normal ">Who we are</h1>
                <p className="mb-5 text-lg font-light">
                  With over 20 years in banking and consulting experience in the
                  USA and educational background in the field. We have
                  experience in helping enterprises secure their applications.
                </p>
                <div>
                  <Link
                    href="/signup"
                    className="custom-btn  hover:text-white rounded-lg border-2 border-white hover:bg-orange-100 uppercase py-3 px-4 "
                  >
                    Get Start
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-5">
              <div className="hoer-img">
                <Image alt="" src={Logo} />
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
