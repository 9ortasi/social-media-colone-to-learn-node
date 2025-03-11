"use client"
import React from 'react'
//import { useParams } from 'react-router-dom'
import axios from 'axios'
//import { useRouter } from "next/navigation";
import { use,useEffect,useState } from 'react'
import "./style.css"
import { Formik,Form,Field,ErrorMessage } from 'formik'
import { useAuth } from '../../helpers/AuthContextProvider'
import SinglePost from '@/app/components/singlePost/singlePost'
import { useRouter } from 'next/navigation'

function Post({params}) {
    const {id}= use(params)
    const [post,setPost]=useState(null)
    const [comments,setComments]=useState([])
    const [liked,setLiked]=useState(false)
    const [likeCount,setLikeCount]=useState(0)
    const[username,setUsername]=useState()
    const router=useRouter()
    useEffect(()=>{
    //this use effect to know the username
    axios.get("http://localhost:3001/auth/validToken",{headers:
      {
        accessToken:localStorage.getItem("accessToken"),
      },}).then((response)=>{
        setUsername(response.data.username)
      })
  },[])
    useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`,{
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response)=>{
      setPost(response.data.singlePost)
      setLiked(response.data.likedPost)
      setLikeCount(response.data.likeCount)

    })
  }  
  ,[])
  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
      setComments(response.data)
    })
  }  
  ,[])

  const initialValues={
    comment:"",
    PostId:id,
  }

   const { authState, setAuthState } = useAuth();
  
   const like = (postId) => {
    axios.post("http://localhost:3001/likes", { PostId: postId }, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((response) => {
      if (response.data == "liked") {
        setLiked(true)
        const mid=likeCount+1
        setLikeCount(mid)

      }
      else{
        setLiked(false)
        const mid=likeCount-1
        setLikeCount(mid)


      }

    })

  }
   
  const addComment=(data,{resetForm})=>{
    axios.post("http://localhost:3001/comments",data,{
     headers:{
      accessToken:localStorage.getItem("accessToken")
     }
    
    }).then((response)=>{
      if(response.data.error){alert("you are not logged in")}
      else{
      setComments([...comments,response.data])
      
      }

    })
    resetForm()


  }
  const deleteComment=(cid)=>{
    console.log(comments)
    axios.delete(`http://localhost:3001/comments/${cid}`,{
      headers:{
       accessToken:localStorage.getItem("accessToken")
      } 
    }
    ).then(
      (response)=>{

        setComments(comments.filter((val)=>{
          return val.id!=cid
        }))
      }
    )
  }
  const deletePost=(id)=>{
    axios.delete(`http://localhost:3001/posts/${id}`,{headers:
      {
        accessToken:localStorage.getItem("accessToken"),
      },
    }).then((response)=>{
      router.push("/")
      
    })
  }


  if(!post) return (<p>{id}</p>)
  return (

    <div className="allPosts">
    <SinglePost
    key={id} 
    post={post} 
    liked={liked} 
    like={like} 
    showLink={false}
    likeCount={likeCount}
    showDeletePost={post.username==username}
    deletfunc={deletePost}
    />
      

      <div className='commenAndFormContainer'>

      <Formik onSubmit={addComment} initialValues={initialValues}>
              <Form className='commentFormContainer'>
                  <label></label>
                  <Field className="CommentField" autoComplete="off" id="commentInput" name="comment" placeholder="Example : Adem" />
                  <button type="submit" className='submitComment'>send</button>
              </Form>
            </Formik>


        <div className='allCommentsContainer'>

        {comments.map((value,key)=>{
        return(
          <div key={key} className='commentContainer'>
            <p ><span className='commentUsername'>@{value.username}:</span> {value.comment}</p>
            {value.username==authState.username &&  <button onClick={()=>{deleteComment(value.id)}}>X</button>}

           
          </div>
        );
      })}
      </div>
      </div>

    </div>

);
}

export default Post
