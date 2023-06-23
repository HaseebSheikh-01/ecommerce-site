import React from "react";
import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/ProductContext";

const About = () => {
 
 const {myName} = useProductContext();
  
 const data = {
  name : "Ecommerce Site",
   };
 
  return (
    <>
  <h3 >
  {myName}
  </h3>
  <HeroSection mydata={data}/>;
  </>
);


};

export default About;
