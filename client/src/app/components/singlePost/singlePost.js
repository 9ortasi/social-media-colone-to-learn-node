"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import "./style.css"
function SinglePost({ post, liked, like, showLink = true,likeCount,showDeletePost,deletfunc }) {
  const router = useRouter();
//post: post content
//liked is the current user liked the post or not
  const handlePostClick = () => {
    if (showLink) {
      router.push(`/post/${post.id}`);
    }
  };
  

  return (
    <div className={`${showLink ? "singlePostHover" : ""} singlePost`}>
        <div className="postContent postUsername UpperPost">
          <p className='PostUsernameText'>@{post.username}</p>
          {showDeletePost && <button className='deletePostButton' onClick={()=>{deletfunc(post.id)}}>X</button>}

          </div>
        <div onClick={showLink ? handlePostClick : undefined} style={showLink ? { cursor: 'pointer' } : {}}>

        <div className="postContent postTitle"><h5>{post.title}</h5></div>
        <div className="postContent postText">{post.postText}</div>
      </div>
      <div className='likeSection'>
        <button 
          className={`likeButton ${liked ? "liked" : ""}`} 
          onClick={() => { like(post.id) ;console.log(liked)}}
        >
          like
        </button>
        <div className="likeCount">{likeCount}</div>
      </div>
    </div>
  );
}

export default SinglePost;