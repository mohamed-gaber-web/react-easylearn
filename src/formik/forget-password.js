import React from 'react';
import { Formik, Field, Form } from 'formik';

import * as Yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';
import { updatedPassword } from '../api.constants';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// create validation with YUP

const LoginSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    confirmPassword: Yup.string().required('Required'),
  });

  let msgError = (msg) =>  toast.error(msg , {
    position: toast.POSITION.TOP_LEFT
  });  

  let msgSuccess = () =>  toast.success("Password Updated success !", {
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


export default function ForgetPassword() {

    return(
        <div className="forget-pass">
            <Formik 
                initialValues = {{ // * Note don't change [ initialValues ]
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }}
                validationSchema={LoginSchema}
                onSubmit = { (values) => {
                    // when submit form send data
                    axios.put(`${ updatedPassword }`, values)
                    .then(response => {
                        console.log(response)
                        if ( response.data.success === true ) {
                            msgSuccess();
                        } else {
                            msgError(response.data.arrayMessage[0]);
                        }
                        // console.log(response);
                    }).catch(err => {
                        console.log(err);
                    })
                }}
            >

            {({ errors, touched }) => (

                <Form>
                    <div className="form-group">                
                        <label htmlFor="c-pass"> Current Password </label>
                        <Field type="password" name="currentPassword" id="c-pass" className="form-control" placeholder="password" />
                        {errors.currentPassword && touched.currentPassword ? (<ErrorMsg>{errors.currentPassword}</ErrorMsg>) : null}
                    </div> 
                    <div className="form-group">                
                        <label htmlFor="n-pass"> New Password </label>
                        <Field type="password" name="newPassword" id="n-pass" className="form-control" placeholder="password" />
                        {errors.newPassword && touched.newPassword ? (<ErrorMsg>{errors.newPassword}</ErrorMsg>) : null}
                    </div> 
                    <div className="form-group">                
                        <label htmlFor="co-pass"> Confirm Password </label>
                        <Field type="password" name="confirmPassword" id="co-pass" className="form-control" placeholder="password" />
                        {errors.confirmPassword && touched.confirmPassword ? (<ErrorMsg>{errors.confirmPassword}</ErrorMsg>) : null}
                    </div> 
                    <button className="btn btn-primary btn-block" type="submit" > Update Password </button>
                    <ToastContainer />
                </Form>
            )}
            
            </Formik>


        </div>
    );
}