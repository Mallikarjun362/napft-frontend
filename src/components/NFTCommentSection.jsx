import React, { useState } from 'react';
import { setGlobalState, getGlobalState, setAlert } from '../store';
import axios from 'axios';
import { main_express_backend_bace_url } from '../utils/constants';

const Comment = ({ cmt }) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (cmt.content) {
    cmt.comment_content = cmt.content;
  }
  return (
    <div
      style={{
        minHeight: '50px',
        backgroundColor: '#fff4',
        width: '70%',
        margin: '10px',
        textAlign: 'left',
        borderRadius: '10px',
        padding: '10px',
        color: '#fffe',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'white', fontWeight: 'bold' }}>
          {cmt.user_metamask_ID}
        </span>
        {/* <span>
          {cmt.date.getDate()} / {monthNames[cmt.date.getMonth()].slice(0, 3)} /{' '}
          {cmt.date.getFullYear()}
        </span> */}
      </div>
      <p> {cmt.comment_content}</p>
    </div>
  );
};

const NFTCommentSection = ({ comments_list, NFT_token_ID }) => {
  const [comments, setComments] = useState([...comments_list]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentInput = event.target.elements.commentInput;
    const newComment = commentInput.value.trim();
    if (newComment === '') {
      return alert('EMPTY COMMENT');
    }
    const new_comment = {
      NFT_token_ID: NFT_token_ID,
      user_metamask_ID: getGlobalState('connectedAccount'),
      comment_content: newComment,
      date: Date.now(),
      JWT: getGlobalState('JWT'),
    };
    if ((new_comment.user_metamask_ID === '') | (new_comment.JWT === '')) {
      alert('Connect your account to comment');
    } else {
      const end_point = main_express_backend_bace_url + '/api/nft/comment';
      axios
        .post(end_point, { ...new_comment })
        .then(() => {
          setComments((preState) => [...preState, new_comment]);
          commentInput.value = '';
        })
        .catch((err) => {
          alert('Commenting failed!!');
        });
    }
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        backgroundColor: '#6666',
        borderRadius: '20px',
      }}
    >
      <form onSubmit={handleCommentSubmit} style={{ display: 'flex' }}>
        <textarea
          style={{
            width: '100%',
            backgroundColor: '#fff0',
            borderColor: '#ffff',
            color: 'white',
            borderWidth: '0.5px',
            borderRadius: '10px',
          }}
          name="commentInput"
          placeholder="Add a comment"
        ></textarea>
        <button
          style={{
            backgroundColor: '#fff5',
            height: '60%',
            margin: '20px',
            padding: '10px',
            color: 'white',
            borderRadius: '10px',
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
      <br />
      <div
        style={{
          justifyContent: 'left',
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          color: 'white',
        }}
      >
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((comment, index) => (
          <Comment key={index} cmt={comment} />
        ))}
      </div>
    </div>
  );
};

export default NFTCommentSection;
