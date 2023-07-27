import { getGlobalState, setGlobalState } from "../store";
import { connectWallet } from "./blockchain_services";
import jwt from 'jwt-decode'

function isAlphaNumeric(str) {
    var code, i, len;
    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
    }
    return true;
};
export const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
        var start = text.substring(0, startChars);
        var end = text.substring(text.length - endChars, text.length);
        while (start.length + end.length < maxLength) {
            start = start + ".";
        }
        return start + end;
    }
    return text;
};

export const check_valid_IPFS_hach = (hash_str) => hash_str.length > 30 & isAlphaNumeric(hash_str);

export function onSiteLoad() {
    connectWallet().then(() => {
        const account = getGlobalState("connectedAccount")
        const global_jwt = getGlobalState("JWT");
        let jwt_token = localStorage.getItem(`JWT-${account}`);
        if (global_jwt == "") {
            jwt_token = JSON.parse(jwt_token);
            // CHECKING IF EXPIRED
            const token_data = jwt(jwt_token.token)
            const [t_now, t_exp] = [Number.parseInt(Date.now() / 1000), token_data.exp]
            const time_left_in_sec = t_exp - t_now
            if (time_left_in_sec <= 0) {
                // return alert("JWT EXPIRED");
                // JWT EXPIRED
                return
            }
            setGlobalState("JWT", jwt_token.token);
        }
    })
}