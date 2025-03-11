"use client"
import React from 'react'
import "./globals.css"
import "./style.css"
import axios from "axios";
import { useEffect, useState } from "react";
import SinglePost from './components/singlePost/singlePost';
import { useRouter } from 'next/navigation';
import { useAuth } from './helpers/AuthContextProvider';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const [listOfMyPosts, setListOfMyPosts] = useState([])

  const router = useRouter()
  const { authState, setAuthState } = useAuth();

  useEffect(() => {
    if (authState.loading === true) { return;}
    if (authState.status === false) {router.push("/login");}
    else{
       axios.get("http://localhost:3001/posts", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      setListOfPosts(response.data.listOfPosts)
      setLikedPosts(response.data.likedPosts.map((val) => { return val.PostId }))
      setListOfMyPosts(response.data.listOfPosts.reduce((acc, val) => {


        if (val.username == response.data.username) {
          acc.push(val.id);
        }
        return acc;
      }, [])
    )

    })
}}, [authState])
  
  const like = (PostId) => {
    axios.post("http://localhost:3001/likes", { PostId: PostId }, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response) => {
      if (response.data == "liked") {
        setListOfPosts(
          listOfPosts.map((value) => {
            if (value.id !== PostId) return value
            return { ...value, Likes: [...value.Likes, 0] }
          })
        )
        setLikedPosts((prevLikedPosts) => [...prevLikedPosts, PostId]); 
      } else {
        setListOfPosts(
          listOfPosts.map((value) => {
            if (value.id !== PostId) return value
            return { ...value, Likes: value.Likes.slice(0, -1) }
          })
        )
        const remove = likedPosts.filter((item) => item !== PostId);
        setLikedPosts(remove)
      }
    })
  }
  
  const liked = (id) => {
    return likedPosts.includes(id)
  };


  const deletePost=(id)=>{
    axios.delete(`http://localhost:3001/posts/${id}`,{headers:
      {
        accessToken:localStorage.getItem("accessToken"),
      },
    }).then((response)=>{
      const remove = listOfPosts.filter((item) => item.id !== id);
        setListOfPosts(remove)
    })
  }

  return (
    <div className="allPosts">
      {listOfPosts.map((post, key) => (
        <SinglePost 
          key={post.id}
          post={post}
          liked={liked(post.id)}
          like={like}
          showLink={true}
          likeCount={post.Likes.length}
          showDeletePost={listOfMyPosts.includes(post.id)}
          deletfunc={deletePost}

        />
      ))}      
    </div>
  )
}

export default Home