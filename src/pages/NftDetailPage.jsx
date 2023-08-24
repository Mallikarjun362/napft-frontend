import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { connectWallet } from '../utils/blockchain_services.js';
// Constants
import { main_express_backend_bace_url } from '../utils/constants.js';
// Components
import './NftDetailPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer.jsx';

// Sections of the page
import NFTDetailSection from '../components/NFTDetailSection';
import NFTChartSection from '../components/NFTChartSection';
import NFTRecommendationSection from '../components/NFTRecommendationSection.jsx';
import NFTCommentSection from '../components/NFTCommentSection';
import { getGlobalState, useGlobalState } from '../store/index.js';

// HTML FORM TO EDIT NFT DETAILS
const NFTEditForm = ({ NFT, updatePageData }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const connectedAccount = useGlobalState('connectedAccount')[0];
  const JWT = useGlobalState('JWT')[0];
  // FORM FIELDS
  const [title, setTitle] = useState(NFT.section_basic_info.title); // 1
  const [tags, setTags] = useState(NFT.section_additional_info.tags.join(',')); // 2
  const [description, setDescription] = useState(
    NFT.section_basic_info.description
  ); // 3
  const submission_handler = async (e) => {
    e.preventDefault();
    const data = {
      title,
      tags,
      description,
      NFT_token_ID: NFT.NFT_token_ID,
    };
    if ((connectedAccount === '') & (JWT === '')) {
      return alert('ACCOUNT NOT CONNECTED PROPERLY');
    }
    await axios
      .post(main_express_backend_bace_url + '/api/nft/update', {
        JWT,
        user_metamask_ID: connectedAccount,
        ...data,
      })
      .then(() => {
        alert('UPDATE SUCCESS');
        updatePageData();
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        return alert('UPDATE FAILED');
      });
  };
  return (
    <div
      style={{
        backgroundColor: '#fff2',
        padding: '20px',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '30px',
        color: 'white',
      }}
    >
      <h2 style={{ fontSize: '20px' }}>
        Edit details{' '}
        <button
          className="basic-button"
          onClick={() => setToggleEdit((preState) => !preState)}
          style={{
            marginLeft: '10px',
          }}
        >
          Edit
        </button>
      </h2>
      {toggleEdit ? (
        <form action="" onSubmit={submission_handler}>
          {/* TABLE */}
          <table>
            <tbody>
              <tr>
                <th>Generate Embeddings</th>
                <td>:</td>
                <td>
                  <button
                    className="basic-button"
                    onClick={(e) => {
                      e.preventDefault();
                      if ((connectedAccount === '') & (JWT === '')) {
                        return alert('ACCOUNT NOT CONNECTED PROPERLY');
                      }
                      axios
                        .post(
                          main_express_backend_bace_url +
                            '/api/nft/generate_embeddings',
                          {
                            NFT_token_ID: NFT.NFT_token_ID,
                            user_metamask_ID: connectedAccount,
                            JWT,
                          }
                        )
                        .then(() => alert('GENERATED SUCCESSFULLY'))
                        .catch((err) => {
                          console.log(err);
                          alert('GENERATION FAILURE');
                        });
                    }}
                  >
                    Generate
                  </button>
                </td>
              </tr>
              <tr>
                <th>Title</th>
                <td>:</td>
                <td>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </td>
              </tr>
              <tr>
                <th>Tags</th>
                <td>:</td>
                <td>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Enter tags"
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                  />
                </td>
              </tr>
              <tr>
                <th>Description</th>
                <td>:</td>
                <td>
                  <textarea
                    type="textarea"
                    name="description"
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button type="submit" className="basic-button">
            Submit
          </button>
        </form>
      ) : null}
    </div>
  );
};

// MAIN COMPONENT=======================================================================================================================
const NftDetailPage = () => {
  const { tokenid } = useParams();
  const [nftDetail, setNftDetail] = useState({});
  const [rec, setRec] = useState([]);
  const connectedAccount = useGlobalState('connectedAccount')[0];
  const JWT = useGlobalState('JWT')[0];
  const updatePageData = async () => {
    const target_endpoint =
      main_express_backend_bace_url + '/api/nft/nft_detail';
    try {
      // console.log('NFTDetailPage.JSX:180', JWT, connectedAccount);
      await axios
        .post(target_endpoint, {
          NFT_token_ID: tokenid,
          // JWT,
          // user_metamask_ID: connectedAccount,
        })
        .then((response) => {
          // console.log(response.data);
          setNftDetail(response.data.nft);
          // console.log(response.data.nft.section_additional_info.comments);
          setRec(response.data.recommendations);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log('Error Fetching Data from Backend', e);
    }
    return () => {};
  };
  // componentDidMount behaviour
  useEffect(async () => {
    await connectWallet();
    const target_endpoint =
      main_express_backend_bace_url + '/api/nft/nft_detail';
    try {
      axios
        .post(target_endpoint, {
          NFT_token_ID: tokenid,
          JWT: getGlobalState('JWT'),
          user_metamask_ID: getGlobalState('connectedAccount'),
        })
        .then((response) => {
          // console.log(response.data);
          setNftDetail(response.data.nft);
          // console.log(response.data.nft.section_additional_info.comments);
          setRec(response.data.recommendations);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log('Error Fetching Data from Backend', e);
    }
    return () => {};
  }, []);
  if (!(Object.keys(nftDetail).length > 0)) {
    return (
      <div className="gradient-bg-hero" style={{ minHeight: '100vh' }}>
        <div className="">
          <Header />
        </div>
        <center className="pt-[30vh] text-[50px] text-white">Loading...</center>
      </div>
    );
  } else {
    return (
      <div className="gradient-bg-hero" style={{ minHeight: '110vh' }}>
        <div className="">
          <Header />
        </div>
        <center>
          <div
            style={{
              width: '70%',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
            }}
          >
            <NFTDetailSection
              nftDetail={nftDetail}
              JWT={JWT}
              updatePageData={updatePageData}
            />
            {nftDetail.section_basic_info.owner_metamask_ID.toLowerCase() ===
            connectedAccount.toLowerCase() ? (
              <NFTEditForm NFT={nftDetail} updatePageData={updatePageData} />
            ) : null}
            <NFTChartSection
              timeline={nftDetail.section_price_info.price_timeline}
            />
            <NFTRecommendationSection recommendation_list={rec} />
            <NFTCommentSection
              comments_list={nftDetail.section_additional_info.comments}
              NFT_token_ID={nftDetail.NFT_token_ID}
            />
          </div>
        </center>
        <Footer />
      </div>
    );
  }
};

export default NftDetailPage;
