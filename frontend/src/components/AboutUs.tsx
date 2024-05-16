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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            adipisci nihil pariatur neque ea distinctio corrupti, molestiae
            voluptate, alias ab illo voluptates esse exercitationem odit non.
            Quam neque magni inventore!
          </li>
          <li className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          </li>
          <li className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            adipisci nihil pariatur neque ea distinctio corrupti, molestiae
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
