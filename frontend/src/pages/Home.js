import React from "react";
import Layout from "../components/Layouts/Layout";
import "../styles/HomeStyle.css";
import Section1 from "./Home/Section1";
import Section2 from "./Home/Section2";
import Section3 from "./Home/Section3";
import Section4 from "./Home/Section4";
import Section5 from "./Home/Section5";
import Section6 from "./Home/Section6";
import Section7 from "./Home/Section7";

const Home = () => {
  return (
    <>
      <Layout>
        {/* Home Section Hero Banner */}
        <Section1 />

        {/* Home Section About */}
        <Section2 />

        {/* Home Section Menu */}
        <Section3 />

        {/* Home Section Promotion */}
        <Section4 />

        {/* Home Section Shop */}
        <Section5 />

        {/* Home Section Blog */}
        <Section6 />

        {/* Home Section Contact */}
        <Section7 />
      </Layout>
    </>
  );
};

export default Home;
