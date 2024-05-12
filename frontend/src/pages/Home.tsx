import Biography from "@/components/Biography";
import Departments from "@/components/Departments";
import Hero from "@/components/Hero";
import MessageForm from "@/components/MessageForm";

const Home = () => {
  return (
    <div className="container flex flex-col gap-24">
      <Hero />
      <Biography />
      <Departments />
      <MessageForm />
    </div>
  );
};

export default Home;
