const Hero = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="container flex flex-col md:flex-row items-center overflow-x-hidden mt-20">
      <div className="md:py-36 w-full">
        <h1 className="scroll-m-20 text-4xl text-primary font-extrabold tracking-tight max-w-xl">
          {title
            ? title
            : "Welcome to S&S Medical Institute.Your trusted healthcare provider"}
        </h1>
        <p className="max-w-xl leading-6 my-4 text-primary text-pretty">
          we believe in enhancing healthcare through innovation and technology.
          Our Hospital Management System (HMS) is designed to optimize every
          aspect of hospital administration and patient management.
        </p>
      </div>
      <div>
        <img
          src={image}
          className="max-md:hidden aspect-square max-w-[400px] mb-24"
        />
        </div>
      </div>
  );
};

export default Hero;
