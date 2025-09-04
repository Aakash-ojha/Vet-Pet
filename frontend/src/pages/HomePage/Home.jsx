import React from "react";
import Header from "./Header";
import SpecialityMenu from "./SpecialityMenu";
import TopDoctors from "../Doctors/TopDoctors";
import Banner from "./Banner";
import SlideToggle from "./SlideToggle";
import Shop from "../Shop/Shop";

const Home = () => {
  return (
    <div>
      <SlideToggle />
      {/* <Shop /> */}
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
