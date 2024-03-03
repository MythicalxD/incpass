import React from "react";
import Header from "./components/Header";
import Platform from "./components/Platform";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Satisfaction from "./components/Satisfaction";

function Home() {
  return (
    <>
      <Header />
      <Platform />
      <Features />
      <Pricing />
      <img src="/img/t1.png" className="test-1" style={{ width: "100%" }}></img>
      <img src="/img/t2.png" className="test-2" style={{ width: "100%" }}></img>
      <Satisfaction />
    </>
  );
}

export default Home;
