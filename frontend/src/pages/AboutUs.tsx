import Hero from "@/components/Hero";
import AboutUS from "@/components/AboutUs";
import aboutUsStockImage from "@/assets/about_us_stock_image.jpg";

const AboutUs = () => {
  return (
    <>
      <Hero title={"Know us better"} image={aboutUsStockImage} />
      <AboutUS />
    </>
  );
};

export default AboutUs;
