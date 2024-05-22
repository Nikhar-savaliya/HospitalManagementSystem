import Hero from "@/components/Hero";
import AboutUS from "@/components/AboutUs";
import Departments from "@/components/Departments";
import MessageForm from "@/components/MessageForm";
import heroImage from "@/assets/hero_image.jpg";

const Home = () => {
  return (
    <section className="w-screen flex flex-col overflow-x-hidden">
      <Hero image={heroImage} title="" />
      <AboutUS />
      <Departments />
      <MessageForm />
    </section>
  );
};

export default Home;
