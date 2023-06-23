import React from "react";

import H from "./components/HeroSection";
import Trusted from "./components/Trusted";
import Services from "./components/Services";
import FeatureProduct from "./components/FeatureProduct";
const Home = () => {
  const data = {
     name : "Bin Safeer Mart",
    };
  return<>
  <H mydata={data}/>
  <FeatureProduct/>
<Services/>
<Trusted/>

  </> 
  
};



export default Home;
