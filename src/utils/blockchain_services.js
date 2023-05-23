// Importing Libraries
/// Main
import Web3 from 'web3';
import { ethers } from "ethers";
import { setGlobalState, getGlobalState, setAlert } from '../store';
import abi from '../abis/NftMarket.json'
import axios from "axios";
import { CONTRACT_ADDRESS,ALCHEMY_API_KEY } from '../utils/constants';

// Local utility functions



// Clean code 
























// Ruf code
const getEtheriumContract = async () => {
  const connected_account = getGlobalState('connectedAccount')
  if (connected_account) {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS)
    return contract
  } else {
    return getGlobalState('contract')
  }
}




const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}





const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0])
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}




const structuredNfts = (nfts) => {
  return nfts
    .map((nft) => ({
      id: Number(nft.id),
      owner: nft.owner.toLowerCase(),
      cost: window.web3.utils.fromWei(nft.cost),
      title: nft.title,
      description: nft.description,
      metadataURI: nft.metadataURI,
      timestamp: nft.timestamp,
    }))
    .reverse()
}




const getAllNFTs = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEtheriumContract()
    const nfts = await contract.methods.getAllNFTs().call()
    const transactions = await contract.methods.getAllTransactions().call()
    setGlobalState('nfts', structuredNfts(nfts))
    setGlobalState('transactions', structuredNfts(transactions))
  } catch (error) {
    reportError(error)
  }
}
const updateNFT = async ({ id, cost }) => {
  try {
    cost = window.web3.utils.toWei(cost.toString(), 'ether')
    const contract = await getEtheriumContract()
    const buyer = getGlobalState('connectedAccount')

    await contract.methods.changePrice(Number(id), cost).send({ from: buyer })
  } catch (error) {
    reportError(error)
  }
}






///============================================================= My Mint Function
const getAlchemyContract = async () => {
  const alchemy_provider = new ethers.providers.AlchemyProvider('maticmum', ALCHEMY_API_KEY);
  const alchemy_contract = new ethers.Contract(CONTRACT_ADDRESS, abi, alchemy_provider);
  return alchemy_contract;
}

const get_NFT_details_from_MongoDB = async ({ start, end }) => {
  const online_url = "https://napft-backend.vercel.app/api/nft/";
  const result = await axios.get(online_url, { params: { start: start, end: end } }).then(res => {
    // console.log("get from Mongo",res.data);
    return res.data;
  }).catch(err => {
    console.log(`Error getting NFT Details from MongoDB ${start}-${end}`);
  });
  return result;
}

const getContract = async () => {
  await connectWallet()
  const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/sdwDCJvTN9o-Rw5T87Rud5BHpt_F8mzN"));
  const address = '0xA149eae19266e92aC3060DA3827013164417adE1';
  const web3Contract = new web3.eth.Contract(abi, address);
  return web3Contract;
}

const mintNFT2 = async ({ price, IpfsHash, title = "My NFT title", description = "Some Description...." }) => {
  try {
    const CONTRACT_ADDRESS = '0xA149eae19266e92aC3060DA3827013164417adE1';
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const NFT = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    const tx = await NFT.creatToken(IpfsHash, ethers.utils.parseEther(`${price}`))
    const rc = await tx.wait();
    const event = rc.events.find(event => event.event === 'Transfer');
    const [from, to, value] = event.args;
    // value is basically token id of latest transaction.
    console.log(from, to, value);
    // Uploading to the Backend
    const new_nft = {
      IPFS_hash: IpfsHash,
      NFT_token_ID: parseInt((value["_hex"]), 16),
      title: title,
      price: price,
      description: description,
      primary_category: "uncategorized",
      tags: [],
      votes: 0,
      transaction_history: [],
      creator_metamask_id: `${getGlobalState('connectedAccount')}`,
      owner_metamask_id: `${getGlobalState('connectedAccount')}`,
      price_timeline: [],
      trend_number: Math.floor(Math.random() * 100),
      image_feature_representation: [],
      date_created: Date(),
      media_type: 'image',
      view_count: 0,
      comments: [],
    };
    console.log("New NFT:", new_nft)

    const online_url = "https://napft-backend.vercel.app/api/nft/"
    axios.post(online_url, new_nft).then((responce) => {
      console.log("Success", responce);
    }).catch((error) => {
      console.log("Error", error);
    })
    return value
  } catch (error) {
    console.log(error);
  }
}

const buyNFT = async (tokenId) => {
  const web3Contract = await getContract();
  const getPrice = await web3Contract.methods.GetNftPrice(tokenId).call();
  const price = ethers.utils.parseEther(`${getPrice}`);
  const ethContract = getEtheriumContract();
  const res = await ethContract.buy(tokenId, { value: getPrice });
  console.log(res);
}









// AUTHENTICATION RELATED
/// Signing a Message using Metamask.
const signMessage = async (message, account) => {
  const web3 = new Web3(window.ethereum);
  return (await web3.eth.personal.sign(message, account));
}
/// Complete Authentication using Metamask with ExpressJS Backend.
const authenticate = async () => {
  let account = getGlobalState("connectedAccount");
  if (account !== "") {
    const signature = signMessage("Hello", account);
    console.log(signature);
  }
}













export {
  signMessage,
  authenticate,
  getAllNFTs,
  connectWallet,
  mintNFT2,
  buyNFT,
  updateNFT,
  isWallectConnected,
  getContract,
  getAlchemyContract,
  get_NFT_details_from_MongoDB,
}