// LIBRARY IMPORTS
import { useEffect, useState } from 'react';
import axios from 'axios';

// APPLICATION IMPORTS
// UI COMPONENTS IMPORTS
import NftDetailCard from './components/NftDetailCard.jsx';
import Transactions from './components/Transactions';
import UpdateNFT from './components/UpdateNFT';
import CreateNFT from './components/CreateNFT';
import Artworks from './components/Artworks';
import Loading from './components/Loading';
import ShowNFT from './components/ShowNFT';
import Footer from './components/Footer';
import Header from './components/Header';
import Alert from './components/Alert';
import Hero from './components/Hero';

// UTILITIES IMPORTS
import { getAllNFTs, isWallectConnected } from './utils/blockchain_services.js';
import { main_express_backend_bace_url } from './utils/constants.js';
import { getAlchemyContract } from './utils/blockchain_services.js';
import { onSiteLoad } from './utils/misc_functions';

const App = () => {
  const [recentNfts, setRecentNfts] = useState([]);

  useEffect(() => {
    (async function () {
      const alchemy_contract = await getAlchemyContract();
      const no_of_nfts = parseInt(await alchemy_contract.GetCurrentToken(), 16);
      const api_url = main_express_backend_bace_url + '/api/nft/recent_nfts';
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
    })();
  }, []);

  // useEffect(async () => {
  //   await isWallectConnected();
  //   await getAllNFTs();
  // }, []);

  return (
    <div className="gradient-bg-hero" style={{ minHeight: '100vh' }}>
      <div>
        <Header />
        <Hero />
        {/* CODE TO SHOW RECENT NFTS */}
        <div
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex',
            width: '100%',
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
      
      {/* DEAD CODE */}
      {/* <Artworks />
      <Transactions />
      <CreateNFT />
      <ShowNFT />
      <UpdateNFT /> */}

      <Footer />
      <Alert />
      <Loading />
    </div>
  );
};

export default App;
