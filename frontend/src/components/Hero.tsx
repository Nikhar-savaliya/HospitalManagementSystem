import React from "react";
import heroImage from "@/assets/hero_image.jpg";

const Hero: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-2 place-items-center">
      <div className="py-36">
        <h1 className="scroll-m-20 text-4xl text-primary font-extrabold tracking-tight max-w-xl py-4">
          Welcome to S&S Medical Institute.Your trusted healthcare provider
        </h1>
        <p className="max-w-xl leading-6 my-4 text-primary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          corrupti ratione inventore eius voluptatibus aliquam adipisci, ab
          officiis. Voluptatum, delectus at. Quasi quam officia sapiente. Ab
          quas magni dignissimos illo.
        </p>
      </div>
      <div>
        <img
          src={heroImage}
          className="max-sm:hidden aspect-square max-w-[400px] m-4"
        />
      </div>
    </div>
  );
};

export default Hero;