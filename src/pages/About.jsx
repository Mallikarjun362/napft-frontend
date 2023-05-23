import React from "react";
import "./About.css";
import Avatar from "../assets/avatar.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <section id="home">
      <Footer></Footer>
      <div className="home-text" data-aos="fade-down">
        <strong>Hello, it's us</strong>
        <br />
        <h1>Taking you on a Digital Journey</h1>
        <p>
          Napft is a new and exciting platform for creating and trading
          non-fungible tokens (NFTs). NFTs have exploded in popularity in recent
          years, and Napft is poised to be at the forefront of this trend.
          <br />
          <br />
          At its core, Napft is an online marketplace where artists and creators
          can showcase their work and sell it as NFTs. The platform is designed
          to be user-friendly, allowing anyone to create and sell their own NFTs
          with ease. Napft offers a range of customization options for NFTs,
          including the ability to add audio, video, and interactive elements.
          This means that creators can use Napft to showcase their work in ways
          that were previously impossible.
          <br />
          <br />
          In addition to being a marketplace, Napft also offers a range of tools
          and resources for creators. For example, the platform provides
          analytics tools that allow creators to track how their NFTs are
          performing and make informed decisions about their pricing and
          marketing strategies. Napft also offers a community forum where
          creators can connect with each other, share tips and advice, and
          collaborate on new projects.
          <br />
          <br />
          One of the most exciting features of Napft is its commitment to
          sustainability. The platform uses blockchain technology to ensure that
          each NFT is unique and cannot be duplicated, which is a key feature of
          NFTs. However, the blockchain technology used by Napft is designed to
          be energy-efficient, meaning that it has a much lower environmental
          impact than other blockchain-based systems.
          <br />
          <br />
          Overall, Napft is a powerful and innovative platform for creating and
          trading NFTs. Whether you're an artist, musician, or content creator,
          Napft offers a range of tools and resources to help you showcase your
          work and connect with a global audience. With its user-friendly
          interface, commitment to sustainability, and growing community of
          creators, Napft is poised to become a major player in the world of
          NFTs.
        </p>
      </div>

      <div className="home-img" data-aos="fade-up">
        <div className="img-box">
          <img src={Avatar} alt="Avatar" />

          <h2>
            NapFT
            <br /> <span> Let's dive into Digital Art </span>
          </h2>

          <div className="social">
            <a href="https://www.instagram.com/invites/contact/?i=kod6v5d1uzo2&utm_content=pbge72p">
              <i class="fa-brands fa-instagram"></i>
            </a>

            <a href="#!">
              <i className="fa-brands fa-facebook" width="18"></i>
            </a>
          </div>

          <a href="#!" className="hire-me">
            Rate Us
          </a>
        </div>
      </div>

      <Header></Header>
    </section>
  );
};

export default About;
