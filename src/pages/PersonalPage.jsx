import React from 'react';
import Header from '../components/Header';
import Identicon from 'react-identicons';
import { setGlobalState, useGlobalState, getGlobalState } from '../store';
import MyNftTile from '../components/MyNftTile';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { getContract } from '../utils/blockchain_services.js';
import default_profile_pic from '../assets/default_profile_pic.jpg';
import axios from 'axios';
import { main_express_backend_bace_url } from '../utils/constants';
import { onSiteLoad } from '../utils/misc_functions';
import { connectWallet } from '../utils/blockchain_services.js';
// MAIN PAGE
const PersonalPage = (props) => {
  // const [connectedAccount,setConnectedAccount] = useState(getGlobalState('connectedAccount'))
  // const [local_JWT,set_local_JWT] = useState(getGlobalState('JWT'));
  // connectWallet();
  const [ownedNftList, setOwnedNftList] = useState([]);
  let connectedAccount = useGlobalState('connectedAccount')[0];
  let local_JWT = useGlobalState('JWT')[0];
  useEffect(async () => {
    await connectWallet();
    // console.log('RUNNING USE-EFFECT');
    const end_point =
      main_express_backend_bace_url + '/api/user/get_user_owned_nfts';
    // console.log(connectedAccount);
    // console.log(local_JWT);
    if ((connectedAccount !== '') & (local_JWT !== '')) {
      axios
        .post(end_point, { user_metamask_ID: connectedAccount, JWT: local_JWT })
        .then((server_response) => {
          // console.log(server_response.data.owned_nfts);
          setOwnedNftList(server_response.data.owned_nfts);
        });
    } else {
      // console.log(connectedAccount, local_JWT);
    }
  }, []);
  const cmp1 = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div
        style={{
          borderRadius: '100%',
          border: '2px solid white',
          padding: '5px',
        }}
      >
        <img
          src={default_profile_pic}
          alt="Profile Pic"
          style={{ height: '150px', width: '150px', borderRadius: '100%' }}
        />
      </div>
      <div>
        <p style={{ color: 'white', fontSize: '35px' }}>User name</p>
        <span style={{ color: '#fffb', fontSize: '25px' }}>
          0x {connectedAccount.slice(2).toUpperCase()}
        </span>
      </div>
    </div>
  );
  const cmp2 = (
    <div>
      <h1 style={{ fontSize: '20px', color: 'white' }}>
        Owned NFTs ({ownedNftList.length})
      </h1>
      <div className="mygrid">
        {ownedNftList
          .sort((a, b) => b.NFT_token_ID - a.NFT_token_ID)
          .map((ele, idx) => (
            <MyNftTile NFT={ele} key={idx} />
          ))}
      </div>
    </div>
  );
  return (
    <div className="gradient-bg-hero">
      {/* APP BAR */}
      <div className="">
        <Header />
      </div>
      {/* MAIN PAGE */}
      <div
        style={{ minHeight: '100vh', paddingLeft: '15%', paddingRight: '15%' }}
      >
        {/* SUBPAGE */}
        <div
          style={{
            backgroundColor: '#fff4',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          {/* COMPONENTS */}
          {cmp1}
          {cmp2}
        </div>
      </div>
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default PersonalPage;
