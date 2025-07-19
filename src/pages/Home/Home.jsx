import React from "react";
import Hero from "./Hero";
import Works from "./Works";
import SuccessCounter from "./SuccessCounter";
import SuccessStories from "./SuccessStories";
import PremiumProfiles from "./PremiumProfile";

const Home = () => {
  return (
    <div>
      <Hero />
      <Works />
      <PremiumProfiles />
      <SuccessCounter />
      <SuccessStories />
    </div>
  );
};

export default Home;
