import React from "react";
import Hero from "./Hero";
import Works from "./Works";
import SuccessCounter from "./SuccessCounter";
import SuccessStories from "./SuccessStories";

const Home = () => {
  return (
    <div>
      <Hero />
      <Works />
      <SuccessCounter />
      <SuccessStories />
    </div>
  );
};

export default Home;
