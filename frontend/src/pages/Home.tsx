import AboutUS from "@/components/AboutUs";
import Departments from "@/components/Departments";
import Hero from "@/components/Hero";
import MessageForm from "@/components/MessageForm";

const Home = () => {
  return (
    <section className="w-screen flex flex-col overflow-x-hidden">
      <Hero />
      <AboutUS />
      <Departments />
      <MessageForm />
    </section>
  );
};

export default Home;
