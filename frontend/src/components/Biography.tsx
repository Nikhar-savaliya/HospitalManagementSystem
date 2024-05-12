import React from "react";
import AboutUs from "@/assets/about_us.jpg";

const Biography: React.FC = () => {
  return (
    <div className="flex items-start gap-8">
      <img src={AboutUs} className="max-w-lg" />
      <div>
        <h2 className="scroll-m-20 text-3xl text-primary font-extrabold tracking-tight max-w-xl py-4">
          Who are we?
        </h2>
        <ul className="list-disc px-4">
          <li className="max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            adipisci nihil pariatur neque ea distinctio corrupti, molestiae
            voluptate, alias ab illo voluptates esse exercitationem odit non.
            Quam neque magni inventore!
          </li>
          <li className="max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          </li>
          <li className="max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            adipisci nihil pariatur neque ea distinctio corrupti, molestiae
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Biography;
