import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HowWorks from "../components/HowWorks";
import Description from "../components/Description";
import Testimonials from "../components/Testimonials";
import Footer from "./../components/Footer";
import Faq from "../components/Faq";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowWorks />
      <Testimonials />
      <Description />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
