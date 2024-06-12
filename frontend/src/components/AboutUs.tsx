import React from "react";
import AboutUsImg from "@/assets/about_us.jpg";

const AboutUs: React.FC = () => {
  return (
    <div className="container md:grid md:grid-cols-12 md:gap-4 max-md:mt-8">
      <img src={AboutUsImg} className="w-fit col-span-4" />
      <div className="col-span-6 col-start-6 w-full ">
        <h2 className="scroll-m-20 h1 max-sm:mt-4">Who are we?</h2>
        <ul className="list-disc px-4 mt-2 text-pretty">
          <li className="">
            we are dedicated to revolutionizing healthcare management through
            cutting-edge technology and innovative solutions. With a commitment
            to excellence and a passion for improving patient care, we provide
            comprehensive Hospital Management Systems (HMS) that cater to the
            diverse needs of medical institutions worldwide.
          </li>
          <li className="">
            Our mission is to empower hospitals and healthcare providers with
            the tools they need to deliver exceptional care. We strive to create
            seamless, efficient, and secure management systems that enhance the
            overall patient experience and streamline hospital operations.
          </li>
          <li className="">
            As we continue to grow and evolve, we invite you to join us on our
            mission to transform healthcare management. Whether you're a small
            clinic or a large medical center, MediCare is here to support you
            every step of the way.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
