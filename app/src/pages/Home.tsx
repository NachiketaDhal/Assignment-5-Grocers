import React, { Fragment } from "react";

import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <HomeCards />
      <NewsLetter />
      <Footer />
    </Fragment>
  );
};

export default Home;
