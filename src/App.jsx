import { useEffect } from "react";
import { getAllNFTs, isWallectConnected } from "./utils/blockchain_services.js";
import Alert from "./components/Alert";
import Artworks from "./components/Artworks";
import CreateNFT from "./components/CreateNFT";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Loading from "./components/Loading";
import ShowNFT from "./components/ShowNFT";
import Transactions from "./components/Transactions";
import UpdateNFT from "./components/UpdateNFT";
// import About from './components/About'

const App = () => {
  useEffect(async () => {
    await isWallectConnected();
    await getAllNFTs();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Artworks />
      <Transactions />
      <CreateNFT />
      <ShowNFT />
      <UpdateNFT />
      {/* <About /> */}
      <Footer />
      <Alert />
      <Loading />
    </div>
  );
};

export default App;