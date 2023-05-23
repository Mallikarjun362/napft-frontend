import React from "react";
import { getGlobalState } from "../store";
import { ethers } from "ethers";

// For Personal Page
const MyNftTile = (props) => {
  const connectedAccount = getGlobalState("connectedAccount");
  const [imageSrc, setImageSrc] = React.useState(`https://gateway.pinata.cloud/ipfs/${props.NFT.IpfsHash}`);
  const fallbackImageSrc = "../assets/nft_placeholder.jpg";
  const handleImageError = () => {
    setImageSrc(fallbackImageSrc);
  };
  return (
    <div
      // className='m-[10px] rounded-[15px] bg-[#1F2937]'
      className="m-[10px] shadow-xl shadow-black rounded-[15px] overflow-hidden bg-gray-800"
      style={{ maxHeight: "550px" }}
    >
      <center>
        <div>
          <img
            style={{
              objectFit: "cover",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              width: "inherit",
              width: "100%",
              height: "300px",
            }}
            src={imageSrc} onError={handleImageError} alt="Image"
          />
        </div>
      </center>
      <div style={{ padding: "10px", color: "#aaa" }}>
        <p>Token Id : {props.NFT.tokenId}</p>
        <p style={{ color: "white" }}>Owner : {props.NFT.owner}</p>
        <p>Creator : {props.NFT.creator}</p>
        <p>Price : {ethers.utils.formatEther(props.NFT.price)} MATIC</p>
        <br />
      </div>
    </div>
  );
};

export default MyNftTile;
