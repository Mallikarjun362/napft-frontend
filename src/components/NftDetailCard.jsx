// Importing Libraries
/// Primary
import React from "react";
// Secondary
import { buyNFT } from "../utils/blockchain_services";
import { check_valid_IPFS_hach } from "../utils/misc_functions.js"; // Just a fucntion that checks validity of an ipfs hash using basic criteria.
import nft_placeholder from "../assets/nft_placeholder.jpg"; // Just an image
import ToolTip from "./ToolTip";
// import { IpfsImage } from "react-ipfs-image";

// Local utility functiond
const load_image = ({ hash, is_valid_image }) => {
  const img_style = {
    objectFit: "cover",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    width: "inherit",
    width: "100%",
    height: "200px",
  };
  if (is_valid_image) {
    return (
      <img
        style={img_style}
        src={"https://gateway.pinata.cloud/ipfs/" + hash}
        crossOrigin="anonymous"
      />
    );
  } else {
    return (
      <img
        style={img_style}
        alt="Error due to Invalid IPFS Hash "
        src={nft_placeholder}
      />
    );
  }
};
const get_price = (price_timeline) => {
  return price_timeline.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  })[0].price;
};

// Main Component
const NftDetailCard = ({ NFT }) => {
  const is_valid_image = check_valid_IPFS_hach(NFT.IPFS_hash);
  const nft_price = get_price(NFT.section_price_info.price_timeline);
  // Rendering the component
  return (
    <div
      className="m-[10px] shadow-xl shadow-black rounded-[15px] overflow-hidden bg-gray-800"
      style={{
        maxHeight: "550px",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>{load_image({ hash: NFT.IPFS_hash, is_valid_image })}</div>
      <div
        style={{
          marginTop: "10px",
          padding: "15px",
          color: "#aaa",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ToolTip
            text={NFT.section_basic_info.title}
            body={
              <a href={`./nft-detail-page/${NFT.NFT_token_ID}`}>
                <h3
                  style={{
                    fontSize: "35px",
                    color: "#ddd",
                    whiteSpace: "nowrap",
                    maxWidth: "270px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {NFT.section_basic_info.title}
                </h3>
              </a>
            }
          />

          <div
            style={{
              borderWidth: "0.5px",
              padding: "5px 10px",
              borderRadius: "10px",
              borderColor: "#aaa",
              width: "80px",
            }}
          >
            <p style={{ fontSize: "13px" }}>Token ID</p>
            <p
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >{`${NFT.NFT_token_ID}`}</p>
          </div>
        </div>
        <br />
        <p
          style={{
            whiteSpace: "nowrap",
            width: "100%",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          Owner : {`${NFT.section_basic_info.owner_metamask_ID}`}
        </p>
        <p>Price : {nft_price} MATIC</p>
        <center>
          <button
            onClick={() => {
              buyNFT(NFT.NFT_token_ID);
            }}
            className="buybutton text-[white] mt-3"
          >
            Purchase Now
          </button>
        </center>
      </div>
    </div>
  );
};

export default NftDetailCard;
