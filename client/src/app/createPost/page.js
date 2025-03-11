"use client"
import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
//import { useNavigate } from 'react-router-dom'
import { useRouter } from "next/navigation";
import "./style.css"
import { useAuth } from '../helpers/AuthContextProvider'
function CreatePost() {
  
  const router = useRouter()
  const { authState, setAuthState } = useAuth();
  useEffect(() => {
    if (authState.loading === true) return; // Prevents redirect until authState is set
    if (authState.status === false) {
      router.push("/login");
    }
  }, [authState]);
  //let navigate=useNavigate()
  const initialValues = {
    title: "",
    postText: "",
  }
    
  
  
  const onSubmit = (data) => {
    console.log(data)
    axios.post("http://localhost:3001/posts",data,{
      headers:{
        accessToken:localStorage.getItem("accessToken")
      }
    }).then((response) => {
      router.push(`/`)

    })
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("you must input a title"),
    postText: Yup.string().required(),
  })
  return (
    <div className="createPostContainer">
      <h1>Create a New Post</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="postForm">

          <div className="formGroup">
            <label htmlFor="title">Title:</label>
            <ErrorMessage name="title" component="div" className="error" />
            <Field
              autoComplete="off"
              id="title"
              name="title"
              placeholder="Example: 7aj Mousa"
              className="inputField"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="postText">Post:</label>
            <ErrorMessage name="postText" component="div" className="error" />
            <Field
              autoComplete="off"
              id="postText"
              name="postText"
              placeholder="Example: I feel great today"
              className="inputField"
              as="textarea"
            />
          </div>

          <button type="submit" className="submitButton">
            Share
          </button>
        </Form>
      </Formik>
    </div>
  );

}

export default CreatePost
