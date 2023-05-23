import React, { useState } from 'react';
import { setGlobalState, getGlobalState, setAlert } from '../store';

const Comment = ({cmt}) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (<div style={{minHeight:"50px",backgroundColor:"#fff4",width:"70%",margin:"10px",textAlign:"left",borderRadius:"10px",padding:"10px",color:"#fffe"}}>
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <span style={{color:"white",fontWeight:"bold"}}>{cmt.author}</span>
      <span>{cmt.date.getDate()} / {monthNames[cmt.date.getMonth()].slice(0,3)} / {cmt.date.getFullYear()}</span>
    </div>
    <p> {cmt.content}</p>
  </div>);
}


const NFTCommentSection = () => {

  const [comments, setComments] = useState([]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentInput = event.target.elements.commentInput;
    const newComment = commentInput.value.trim();
    const new_comment = {
      author: getGlobalState("connectedAccount"),
      content: newComment,
      date: new Date(),
    }
    console.log(await signMessage(newComment,getGlobalState("connectedAccount")));
    if (new_comment.author === "") {
      alert("Connect your account to comment");
    } else {
      setComments([...comments, new_comment]);
      commentInput.value = '';
    }
  };

  return (
    <div style={{ width: "100%", padding: "20px", backgroundColor: "#6666", borderRadius: "20px" }}>
      <form onSubmit={handleCommentSubmit} style={{ display: "flex" }}>
        <textarea
          style={{
            width: "100%", backgroundColor: "#fff0",
            borderColor: "#ffff", color: "white", borderWidth: "0.5px", borderRadius: "10px"
          }}
          name="commentInput"
          placeholder="Add a comment"></textarea>
        <button
          style={{
            backgroundColor: "#fff5", height: "60%", margin: "20px", padding: "10px", color: "white",
            borderRadius: "10px"
          }}
          type="submit">Submit</button>
      </form>
      <br />
      <div style={{justifyContent:"left",display:"flex",justifyContent:"flex-start",flexDirection:"column",color:"white"}}>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((comment, index) => (
          <Comment key={index} cmt={comment} />
        ))}
      </div>
    </div>
  );
};

export default NFTCommentSection;



