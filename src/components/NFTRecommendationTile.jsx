import React from 'react';
import { IPFS_endpoint } from '../utils/constants';

const NFTRecommendationTile = ({ nft }) => {
  return (
    <a href={`/nft-detail-page/${nft.NFT_token_ID}`}>
      <div
        style={{
          width: '250px',
          backgroundColor: '#fff8',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: ' 5px 5px 15px #fff5',
        }}
        className="hover:scale-110 transform transition-transform duration-200"
      >
        <img
          src={IPFS_endpoint + '/' + nft.IPFS_hash}
          alt="NFT"
          style={{ height: '200px', objectFit: 'cover', width: '100%' }}
        />
        <h3
          style={{
            color: '#fff',
            textAlign: 'left',
            padding: '15px',
            fontSize: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div
            style={{
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {nft.section_basic_info.title}
          </div>
          <span
            style={{
              border: '2px solid',
              padding: '1px 10px',
              borderRadius: '10px',
            }}
          >
            {nft.NFT_token_ID}
          </span>
        </h3>
      </div>
    </a>
  );
};

export default NFTRecommendationTile;
