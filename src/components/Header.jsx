// LIBRARY IMPORTS
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// APPLICATION IMPORTS
import { onSiteLoad, truncate } from '../utils/misc_functions';
import { connectWallet } from '../utils/blockchain_services';
import { connectToBackend } from '../utils/authentication';
import { useGlobalState } from '../store';
import Logo from '../assets/logo.png';

const Header = () => {

  const [connectedAccount] = useGlobalState('connectedAccount');
  const [JWT] = useGlobalState('JWT');

  useEffect(() => {
    onSiteLoad();
  }, []);

  const btn1 = connectedAccount ? (
    <button className="  text-white bg-green-500 hover:bg-green-600 md:text-s p-2 rounded-tl-full rounded-bl-full cursor-pointer">
      {truncate(connectedAccount, 6, 4, 15)}
    </button>
  ) : (
    <button
      className="  text-white bg-[#e32970] hover:bg-[#bd255f] md:text-s p-2 rounded-tl-full rounded-bl-full cursor-pointer"
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  );

  const btn2 = JWT ? (
    <button
      className="text-white bg-green-500 hover:bg-green-600 md:text-s p-2 rounded-tr-full rounded-br-full"
      onClick={connectToBackend}
    >
      Connected
    </button>
  ) : (
    <button
      className="text-white bg-[#e32970] hover:bg-[#bd255f] md:text-s p-2 rounded-tr-full rounded-br-full cursor-pointer"
      onClick={connectToBackend}
    >
      Connect To Napft
    </button>
  );

  return (
    <nav className="w-4/5 flex md:justify-center justify-between items-center py-4 mx-auto gap-5">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img className="w-32 cursor-pointer" src={Logo} alt="NapFT Logo" />
      </div>
      <ul
        className="md:flex-[0.5] text-white md:flex hidden list-none flex-row justify-between items-center flex-initial rounded-full shadow-lg shadow-[#fff3]"
        style={{
          marginRight: '40px',
          backgroundColor: '#fff3',
          padding: '0px 0px',
        }}
      >
        <li className="mx-4 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link to="/marketplace">MarketPlace</Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link to="/about">About Us</Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link to="/personalpage">Personal Page</Link>
        </li>
        <li style={{ display: 'flex' }}>
          {btn1}
          <div
            style={{ height: '40px', backgroundColor: 'white', width: '2px' }}
          ></div>
          {btn2}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
