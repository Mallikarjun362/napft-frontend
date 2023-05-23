import Logo from '../assets/logo.png';
import { connectWallet } from '../utils/blockchain_services';
import { useGlobalState, truncate } from '../store';
import { Link } from 'react-router-dom';

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  return (
    <nav className="w-4/5 flex md:justify-center justify-between items-center py-4 mx-auto">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img className="w-32 cursor-pointer" src={Logo} alt="NapFT Logo" />
      </div>
      <ul
        className="md:flex-[0.5] text-white md:flex hidden list-none flex-row justify-between items-center flex-initial"
        style={{ marginRight: '40px' }}
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
      </ul>
      {connectedAccount ? (
        <button className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2 rounded-full cursor-pointer">
          {truncate(connectedAccount, 4, 4, 11)}
        </button>
      ) : (
        <button
          className="shadow-xl shadow-black text-white bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2 rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Header;
