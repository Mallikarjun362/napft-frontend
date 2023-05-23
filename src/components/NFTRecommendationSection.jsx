import React from 'react';
import NFTRecommendationTile from './NFTRecommendationTile';
const NFTRecommendationSection = ({ recommendation_list, ...props }) => {
  const n = 8;
  return (
    <div
      style={{
        backgroundColor: '#fff2',
        borderRadius: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '20px',
        gap: '30px',
        justifyContent: 'space-evenly',
      }}
    >
      {recommendation_list.slice(0, n).map((ele, idx) => (
        <NFTRecommendationTile key={idx} nft={ele} />
      ))}
    </div>
  );
};

export default NFTRecommendationSection;
