import React from "react";
import Header from "../components/Header";
import Identicon from "react-identicons";
import { setGlobalState, useGlobalState, getGlobalState } from "../store";
import MyNftTile from "../components/MyNftTile";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { getContract } from "../utils/blockchain_services.js";

const PersonalPage = (props) => {
  const connectedAccount = getGlobalState("connectedAccount");
  // console.log(connectedAccount);
  const [nftDetailsList, setNftDetailsList] = useState([]);
  // too get and set the contract to "myContract" variable
  useEffect(() => {
    async function helloContract() {
      const val = await getContract();
      setMyContract(val);
      const noOfNFTs = await val.methods.GetCurrentToken().call();
      // console.log(noOfNFTs);
      let tempList = [];
      for (let i = noOfNFTs; i >= 5; i--) {
        let nftDetail = await val.methods.GetNFTDetails(i).call();
        nftDetail.tokenId = i;
        // console.log(nftDetail);
        tempList.push(nftDetail);
      }
      setGlobalState("nftDetailsList", tempList);
      setNftDetailsList(tempList);
    }
    const helloList = getGlobalState("nftDetailsList");
    if (helloList.length == 0) {
      helloContract();
    } else {
      setNftDetailsList(helloList);
    }
  }, []); // Working

  return (
    <div className="gradient-bg-hero">
      <div className="">
        <Header />
      </div>
      <center>
        <div className="h-[400px] w-[40%] bg-[#eeeeee44] rounded-md flex justify-around">
          <Identicon
            size={100}
            className="h-10 w-10 object-fill rounded-full "
          />
          <div style={{ fontWeight: "bold", color: "white" }}>
            {getGlobalState("connectedAccount")}
          </div>
        </div>
      </center>
      <div className="min-h-[200px] bg-[#ffffff11] rounded-2xl m-[100px] p-[30px]">
        <center>
          <h2 style={{ fontSize: "40px", color: "#ffffffaa" }}>My NFTs</h2>
        </center>
        {nftDetailsList.length > 0 ? (
          <div className="mygrid">
            {nftDetailsList
              .filter((val) => connectedAccount == `${val.owner}`.toLowerCase())
              .map((ele, index, arr) => (
                <MyNftTile className="myitem" key={index} NFT={ele} />
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
      <br />
      <Footer />
    </div>
  );
};

export default PersonalPage;
