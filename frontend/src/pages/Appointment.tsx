import Hero from "@/components/Hero";
import aboutUsStockImage from "@/assets/about_us_stock_image.jpg";
import AppointmentForm from "@/components/AppointmentForm";

const Appointment = () => {
  return (
    <div>
      <Hero title={"Book An Appointment"} image={aboutUsStockImage} />
      <AppointmentForm />
    </div>
  );
};

export default Appointment;
