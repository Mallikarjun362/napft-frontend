import { createGlobalState } from "react-hooks-global-state";

// State
const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: "scale-0",
  updateModal: "scale-0",
  showModal: "scale-0",
  alert: { show: false, msg: "", color: "" },
  loading: { show: false, msg: "" },
  nft: null,
  transactions: [],
  contract: null,
  nfts: [],
  nftDetailsList: [],
  // STANDARD GLOBAL APPLICATION STATE
  user_liked_nfts: [],
  user_owned_nfts: [],
  nft_list: [],
  connectedAccount: "",
  JWT: "",
});

// Functions
const setAlert = (msg, color = "green") => {
  setGlobalState("loading", false);
  setGlobalState("alert", { show: true, msg, color });
  setTimeout(() => {
    setGlobalState("alert", { show: false, msg: "", color });
  }, 6000);
};

const setLoadingMsg = (msg) => {
  const loading = getGlobalState("loading");
  setGlobalState("loading", { ...loading, msg });
};


export {
  useGlobalState,
  setGlobalState,
  getGlobalState,

  setAlert,
  setLoadingMsg,
};
