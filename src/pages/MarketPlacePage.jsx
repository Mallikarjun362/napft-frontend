// Importing Libraries
/// Main
import React, { useEffect, useState } from "react";
import axios from "axios";
/// Secondary
import { main_express_backend_bace_url } from "../utils/constants.js"; // importing base api url
import { getAlchemyContract } from "../utils/blockchain_services.js"; // Returns the contract
import "./MarketPlacePage.css"; // Loading css styles
/// Teritiary
import Header from "../components/Header"; // Header Component
import Footer from "../components/Footer"; // Footer Component
import NftDetailCard from "../components/NftDetailCard"; // NFT Detail card Component
/// RUF
// import { setGlobalState, useGlobalState, getGlobalState } from "../store";

const MarketPlacePage = (props) => {
  const [nft_list, set_nft_list] = useState([]);
  // On loading
  useEffect(async () => {
    // A function to load all nfts from backend
    async function load_nfts() {
      const alchemy_contract = await getAlchemyContract(); // Returns the contract
      const no_of_nfts = parseInt(await alchemy_contract.GetCurrentToken(), 16); // return Numnber of NFTs created
      const api_url = main_express_backend_bace_url + "/api/nft/range_of_nfts"; // Base Backend API url
      // Retrives and stores the NFTs details
      axios
        .post(api_url, { start: 1, end: no_of_nfts })
        .then((response) => {
          set_nft_list(response.data.nfts);
        })
        .catch((error) => {
          console.log("Error Loading NFTs from Backend");
        });
    }
    // calling the load_nft function
    await load_nfts();
  }, []); // Empty array to indicate no dependecies. only runs once
  // Rendereing the page
  return (
    <div className="gradient-bg-hero">
      <div className="">
        <Header />
      </div>
      <br />
      <div className="p-[30px]">
        {nft_list.length > 0 ? (
          <div className="mygrid">
            {nft_list.reverse().map((ele, index) => (
              <NftDetailCard key={index} NFT={ele} />
            ))}
          </div>
        ) : (
          <center className="pt-[200px] pb-[200px] text-[100px]">
            Loading...
          </center>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default MarketPlacePage;
