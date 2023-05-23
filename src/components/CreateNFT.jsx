// Importing Libraries
/// Core standard libraries
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { create } from 'ipfs-http-client';
import axios from 'axios';
/// Custome code components
import {
  useGlobalState,
  setGlobalState,
  setLoadingMsg,
  setAlert,
} from '../store';
import { mintNFT2 } from '../utils/blockchain_services.js';

// Main Component
/*
Component - Doc :
Component structure :
Form fields :
1. [ ] <input type="text"> (text) image
2. [ ] <input> (text) title
3. [ ] <input> (number) price
4. [ ] <textarea> (text) description
5. [ ] <text> (text) tags {format : Comma seperated values}
6. [ ] <input> 

*/
const CreateNFT = () => {
  // Reading Global State
  const [modal] = useGlobalState('modal');
  // Component State Variables
  /// Form Fields
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [imgBase64, setImgBase64] = useState(null);
  const [tags, setTags] = useState('');

  // Local Helper functions
  /// 1. Image Change Event Handler
  const change_image = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };
  /// 2. CLose Model Butten onCLick Event Handler
  const close_modal = () => {
    setGlobalState('modal', 'scale-0');
    reset_form();
  };
  /// 3. To reset the fields of the form
  const reset_form = () => {
    setFileUrl('');
    setImgBase64(null);
    setTitle('');
    setPrice('');
    setDescription('');
  };
  /// 4. (Handle Submission) Submit button onCLick Event Handler
  const handle_submission = async (e) => {
    e.preventDefault();
    if (!title || !price || !description) return;
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div className="bg-[rgb(21,28,37)] shadow-xl shadow-[#e32970] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-gray-400">Add NFT</p>
            <button
              type="button"
              onClick={close_modal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          {/* Selected Image */}
          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="NFT"
                className="h-full w-full object-cover cursor-pointer"
                src={
                  imgBase64 ||
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'
                }
              />
            </div>
          </div>
          {/* ============================================================================================================================================================================================= */}
          {/* Form field 1 (File): Input Field to choose NFT Image  */}
          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/webp"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#19212c] file:text-gray-400 hover:file:bg-[#1d2631] cursor-pointer focus:ring-0 focus:outline-none"
                onChange={change_image}
                required
              />
            </label>
          </div>
          {/* Form field 2 (text):  Title */}
          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          {/* Form field 3 (number) : Ammount*/}
          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="price"
              placeholder="Price (Eth)"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          {/* Form field 4 (text):  Tags */}
          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block w-full text-sm text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              type="text"
              name="tags"
              placeholder="Tags"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
            />
          </div>
          {/* Form field 4 (text) : Description */}
          <div className="flex flex-row justify-between items-center bg-gray-800 rounded-xl mt-5">
            <textarea
              className="block w-full text-sm resize-none text-slate-500 bg-transparent border-0 focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
          {/* Input Field = Description */}

          {/* Minting Function */}
          <button
            type="submit"
            onClick={handle_submission}
            className="flex flex-row justify-center items-center w-full text-white text-md bg-[#e32970] hover:bg-[#bd255f] py-2 px-5 rounded-full drop-shadow-xl border border-transparent hover:bg-transparent hover:text-[#e32970] hover:border hover:border-[#bd255f] focus:outline-none focus:ring mt-5"
          >
            Mint Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
