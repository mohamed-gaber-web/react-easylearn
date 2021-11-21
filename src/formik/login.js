import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';

import * as Yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';
import { loginAPI } from '../api.constants';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory } from 'react-router-dom';

import Storage from '../services/storage.service.js';
// create validation with YUP

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });

  let msgError = () =>  toast.error("Email Or Password Is Wrong !", {
    position: toast.POSITION.TOP_LEFT
  });  

  let msgSuccess = () =>  toast.success("Login Is Succesfuly !", {
    position: toast.POSITION.TOP_LEFT
  }); 


const ErrorMsg = styled.div`
    background-color: rgb(220 53 69 / 80%);
    padding: 9px 0;
    margin: 10px 0;
    border-radius: 6px;
    color: rgb(255 255 255);
    text-align: center;
`;


export default function LoginForm() {
    let history = useHistory();
    let storage = new Storage();
    const [isShowPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!isShowPassword);
    }

    return(
        <div className="login_form">
            <Formik 
                initialValues = {{ // * Note don't change [ initialValues ]
                    email: '',
                    password: '',
                    showPassword: ''
                }}
                validationSchema={LoginSchema}
                onSubmit = { (values) => {
                    // when submit form send data
                    axios.post(`${ loginAPI }`, values).then(response => {
                        const data = response['data'];
                        if( data.success === true ) {
                            storage.setAccessToken(response['data'].result);
                            localStorage.setItem('userAuth', true)
                            // storage.setExpiresIn(
                            //     new Date(response['.expires']).getTime() / 1000 // .expires
                            // )
                            // msgSuccess();
                            history.push('/');
                        }else {
                            msgError();
                            history.push('/login');
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }}
            >

            {({ errors, touched }) => (

                <Form>
                    <div className="form-group">                
                        <label htmlFor="email"> Email </label>
                        <Field type="email" name="email" id="email" className="form-control" placeholder="email" />
                        {errors.email && touched.email ? (<ErrorMsg>{errors.email}</ErrorMsg>) : null}
                    </div> 
                    <div className="form-group">                
                        <label htmlFor="pass"> Password  </label>
                        <div className="pass-group">
                            <Field 
                                type={isShowPassword ? 'text' : 'password'} 
                                name="password" 
                                id="pass" 
                                className="form-control" 
                                placeholder="password" 
                            />
                            <i  onClick={ toggleShowPassword } className="icon-pass bi bi-eye-fill"></i>
                        </div>

                        {errors.password && touched.password ? (<ErrorMsg>{errors.password}</ErrorMsg>) : null}
                    </div> 
                    <button className="btn btn-primary btn-block mt-4" type="submit" > Login </button>
                    <ToastContainer />
                </Form>
            )}
            
            </Formik>


        </div>
    );
}