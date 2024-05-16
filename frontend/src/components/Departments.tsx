import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];

  return (
    <div className="container">
      <h2 className="h1 mt-16 mb-8 animate-in">Departments</h2>
      <Carousel className="max-w-6xl mx-auto">
        <CarouselContent className="space-x-2">
          {departmentsArray.map((dep) => {
            return (
              <CarouselItem className="md:basis-1/3 lg:basis-1/5 rounded-md py-4 w-fit text-center border bg-secondary/20 text-xl font-semibold text-secondary-foreground">
                {dep.name}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="max-md:hidden" />
        <CarouselNext className="max-md:hidden" />
      </Carousel>
    </div>
  );
};

export default Departments;
