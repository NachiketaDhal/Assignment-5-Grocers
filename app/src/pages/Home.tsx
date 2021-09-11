import React, { Fragment } from "react";

import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <HomeCards />
      <NewsLetter />
    </Fragment>
  );
};

export default Home;
