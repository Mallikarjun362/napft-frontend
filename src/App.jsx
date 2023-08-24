import { useEffect, useState } from 'react';
import { getAllNFTs, isWallectConnected } from './utils/blockchain_services.js';
import Alert from './components/Alert';
import Artworks from './components/Artworks';
import CreateNFT from './components/CreateNFT';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Loading from './components/Loading';
import ShowNFT from './components/ShowNFT';
import Transactions from './components/Transactions';
import UpdateNFT from './components/UpdateNFT';
import { onSiteLoad } from './utils/misc_functions';
import { getAlchemyContract } from './utils/blockchain_services.js'; // Returns the contract
import { main_express_backend_bace_url } from './utils/constants.js';
import axios from 'axios';
import NftDetailCard from './components/NftDetailCard.jsx';
// import About from './components/About'

const App = () => {
  const [recentNfts, setRecentNfts] = useState([]);
  useEffect(async () => {
    // A function to load all nfts from backend
    async function load_nfts() {
      const alchemy_contract = await getAlchemyContract(); // Returns the contract
      const no_of_nfts = parseInt(await alchemy_contract.GetCurrentToken(), 16); // return Numnber of NFTs created
      const api_url = main_express_backend_bace_url + '/api/nft/recent_nfts'; // Base Backend API url
      // Retrives and stores the NFTs details
      // if (recentNfts.length > 0) {
      //   return;
      // }
      axios
        .post(api_url, {})
        .then((response) => {
          // set_nft_list(response.data.nfts);
          // console.log(response.data.recent_nfts);
          setRecentNfts(response.data.recent_nfts);
        })
        .catch((error) => {
          console.log('Error Loading NFTs from Backend');
        });
    }
    // calling the load_nft function
    await load_nfts();
  }, []); // Empty array to indicate no dependecies. only runs once
  // useEffect(async () => {
  //   await isWallectConnected();
  //   await getAllNFTs();
  // }, []);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="w-4/5">
            <h1 className="text-[#fff9] text-3xl font-bold">Recent NFTs</h1>
            <br />
            <div className="mygrid">
              {[...recentNfts].map((ele, index) => (
                <NftDetailCard key={index} NFT={ele} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Artworks />
      <Transactions />
      <CreateNFT />
      <ShowNFT />
      <UpdateNFT />
      {/* <About /> */}
      <Footer />
      <Alert />
      <Loading />
    </div>
  );
};

export default App;
