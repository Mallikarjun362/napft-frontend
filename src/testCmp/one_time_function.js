import { getAlchemyContract, getEtheriumContract } from '../utils/blockchain_services.js';
import axios from 'axios';
import { ethers } from 'ethers';
// const { getAlchemyContract } = require('../utils/blockchain_services.js');
// const axios = require('axios');
// const ethers = require('ethers');

async function upload_to_mongo({ IpfsHash, creator, owner, price, token_id_in_dec }) {
    const new_nft = {
        IPFS_hash: IpfsHash,
        NFT_token_ID: token_id_in_dec,
        title: "My New NFT",
        price: ethers.utils.formatEther(`${price}`),
        description: "Some Description.....!!!",
        primary_category: "uncategorized",
        tags: [],
        votes: 0,
        transaction_history: [],
        creator_metamask_id: creator,
        owner_metamask_id: owner,
        price_timeline: [],
        trend_number: Math.floor(Math.random() * 100),
        image_feature_representation: [],
        date_created: Date(),
        media_type: 'image',
        view_count: 0,
        comments: [],
    };
    // console.log("New NFT:", new_nft)

    const online_url = "https://napft-backend.vercel.app/api/nft/"
    await axios.post(online_url, new_nft).then((responce) => {
        console.log("Success ", token_id_in_dec, responce);
    }).catch((error) => {
        console.log("Error", error);
    })
}

async function hello_mongo() {
    const val = await getAlchemyContract()
    for (let index = 6; index <= 47; index++) {
        try {
            let nftDetail = await val.GetNFTDetails(index);
            const { IpfsHash, creator, owner, price } = nftDetail;
            upload_to_mongo({ IpfsHash, creator, owner, price, token_id_in_dec: index })
        } catch (err) {
            console.log("ERROR", err);
        }
    }
}

async function getHighestNftTokenNumber() {
    const alchemy_contract = await getAlchemyContract(); // Returns the contract
    const url = "http://localhost:4000/api/nft/create/";
    // const no_of_nfts = parseInt(await alchemy_contract.GetCurrentToken(), 16); // return Numnber of NFTs created
    for (let index = 53; index < 60; index++) {
        let details = await alchemy_contract.GetNFTDetails(index);
        // console.log(details);
        let nft = {
            IPFS_hash: details["IpfsHash"],
            NFT_token_ID: index,
            title: "Dummy Title",
            creator_metamask_ID: details["creator"],
            owner_metamask_ID: details["owner"],
            price: Number(BigInt(details["price"]).toString(10)),
        }
        console.log(nft);
        await axios.post(url, { nft: nft }).then((responce) => {
            console.log("Success ", index, responce);
        }).catch((error) => {
            console.log("Error", error);
        })
        console.log("============================================================================================");
    }
    // const contract = await getEtheriumContract()
    // console.log(contract);
    // const nfts = await contract.methods.getAllNFTs().call();
    // console.log(nfts);
}
getHighestNftTokenNumber();