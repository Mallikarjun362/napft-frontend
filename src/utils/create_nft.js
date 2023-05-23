import { getGlobalState, setGlobalState } from '../store';
export function check_accounted_connected() {
    if (!ethereum) { return false; }
    else { return true; }
}

export function get_connected_account() {
    return getGlobalState('connectedAccount');
}

export async function connect_wallet() {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setGlobalState('connectedAccount', accounts[0])
    } catch (error) {
        console.error("ERROR", "while connecting account.");
    }
}

export function is_user_authenticated(){
    
}