import Web3 from "web3";
import { getGlobalState, setGlobalState } from "../store";
import axios from "axios";
import { main_express_backend_bace_url } from "./constants";
import { json } from "d3";

import { connectWallet } from './blockchain_services.js';

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

export async function connectToBackend() {
    const account = getGlobalState('connectedAccount');
    let token = null;
    try {
        if (account !== "") {
            let response = await axios.post(main_express_backend_bace_url + "/api/user/connect_1", { metamask_ID: account, });
            const nounceMessage = response.data.nounce;
            let signature = await signMessage(nounceMessage, account);
            response = await axios.post(main_express_backend_bace_url + "/api/user/connect_2", { signature, metamask_ID: account, })
            token = response.data.token;
        } else {
            alert("Connect Account !!!");
            return;
        }
    } catch (err) {
        alert("Authentication Failed")
    }
    setGlobalState("JWT", token);
    localStorage.setItem(`JWT-${account}`, JSON.stringify({
        token,
        createdOn: Date.now(),
    }));
}

//==================================================================
// ON PAGE LOAD : CHECK THE JWT TOKEN
// export async function check_local_jwt() {
//     let account = getGlobalState('connectedAccount');
//     if (account == "") {
//         // ACCOUNT NOT CONNECTED
//         connectWallet().then((val)=>{
//             account = getGlobalState('connectedAccount');
//         });
//         // 1. CHECK IF JWT EXISTS
//         let jwt = localStorage.getItem(`JWT-${account}`);
//     } else {

//     }
// }