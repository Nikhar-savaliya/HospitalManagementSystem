import Biography from "@/components/Biography";
import Departments from "@/components/Departments";
import Hero from "@/components/Hero";
import MessageForm from "@/components/MessageForm";

const Home = () => {
  return (
    <div className="container">
      <Hero />
      <Biography />
      <Departments />
      <MessageForm />
    </div>
  );
};

export default Home;
