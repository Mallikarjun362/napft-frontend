import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div
    className="w-full flex md:justify-center justify-between items-center flex-col p-4"
    style={{ position: 'absolute', bottom: 0 }}
  >
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.25] justify-center items-center">
        <img src={Logo} alt="logo" className="w-32" />
      </div>

      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          <Link to="/">Home</Link>
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Marketplace
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          <Link to="/about">About Us</Link>
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Personal Page
        </p>
      </div>

      <div className="flex flex-[0.25] justify-center items-center">
        <p className="text-white text-right text-xs">
          &copy;2022 All rights reserved
        </p>
      </div>
    </div>
  </div>
);

export default Footer;
