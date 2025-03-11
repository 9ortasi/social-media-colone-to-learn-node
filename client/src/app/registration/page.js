"use client"

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./style.css"
//import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
function Register() {
    //let navigate = useNavigate();
    const router = useRouter()
    const initialValues = {
        username: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(2).max(15).required("username required"),
        password: Yup.string().min(2).max(20).required("password required"),
    });
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            if(response.data.error){alert("username already used")}
            else{router.push(`/login`)}

        })
    }
    return (

        <div className="register-wrapper">
            <div className="register-container">
                <h1 className="register-title">Registration</h1>
                {/* <Formik initialValues={} onSubmit={} validationSchema={}></Formik>*/}
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                    <Form className="register-form">
                        <label className="register-label">Username:</label>
                        <ErrorMessage className="error-message" name='username' component="div" />
                        <Field className="register-input" autoComplete="off" id="inputCreatePost" name="username" placeholder="Example : Adem" />

                        <label className="register-label">Password:</label>
                        <ErrorMessage className="error-message" name='title' component="span" />
                        <Field className="register-input" autoComplete="off" id="inputCreatePost" name="password" type="password" />

                        <button className="register-button" type="submit">Register</button>
                    </Form>
                </Formik>
            </div>
        </div>);
}

export default Register;
