import React from 'react';
import { getGlobalState } from '../store';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const get_price = (price_timeline) => {
  return price_timeline.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  })[0].price;
};
const format_price = (price) => {
  try {
    return ethers.utils.formatEther(
      get_price(NFT.section_price_info.price_timeline)
    );
  } catch {
    return price;
  }
};

// FOR PERSONAL PAGE
const MyNftTile = ({ NFT }) => {
  // console.log( NFT);
  const connectedAccount = getGlobalState('connectedAccount');
  const [imageSrc, setImageSrc] = React.useState(
    `https://gateway.pinata.cloud/ipfs/${NFT.IPFS_hash}`
  );
  const fallbackImageSrc = '../assets/nft_placeholder.jpg';
  const handleImageError = () => {
    setImageSrc(fallbackImageSrc);
  };
  return (
    <div
      // className='m-[10px] rounded-[15px] bg-[#1F2937]'
      className="m-[10px] shadow-xl shadow-black rounded-[15px] overflow-hidden bg-gray-800"
      style={{ maxHeight: '550px' }}
    >
      <center>
        <div>
          <Link to={`/nft-detail-page/${NFT.NFT_token_ID}`}>
            <img
              style={{
                objectFit: 'cover',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                width: 'inherit',
                width: '100%',
                height: '300px',
              }}
              src={imageSrc}
              onError={handleImageError}
              alt="Image"
            />
          </Link>
        </div>
      </center>
      <div style={{ padding: '10px', color: '#aaa' }}>
        <div style={{ margin: '10px 5px', fontSize: '20px' }}>
          <span
            style={{
              border: '1px solid white',
              padding: '5px',
              marginRight: '10px',
            }}
          >
            {NFT.NFT_token_ID}
          </span>
          <span
            style={{
              color: 'white',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {NFT.section_basic_info.title}
          </span>
        </div>
        <p
          style={{
            color: 'white',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          Owner : {NFT.section_basic_info.owner_metamask_ID}
        </p>
        <p>
          Price :{' '}
          {format_price(get_price(NFT.section_price_info.price_timeline))} MATIC
        </p>
      </div>
    </div>
  );
};

export default MyNftTile;
