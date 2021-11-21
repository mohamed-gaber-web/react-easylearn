import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import styled from 'styled-components';

import { recommendedBy } from '../api.constants';

// create validation with YUP

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.number().required('Required'),
    gender: Yup.string().required('Required'),
    password: Yup.string().required('Password is required'),
    cPassword: Yup.string()
       .oneOf([Yup.ref('password'), null], 'Passwords not matching'),
    // checked: Yup.string().required('Please check terms and condition')
  });

const ErrorMsg = styled.div`
    background-color: rgb(220 53 69 / 80%);
    padding: 9px 0;
    margin: 10px 0;
    border-radius: 6px;
    color: rgb(255 255 255);
    text-align: center;
`;


export default function RegisterForm() {

    const [reco, setReco] = useState([]);

    useEffect(() => {
        axios.get(`${ recommendedBy }?Offset=0&Limit=10`)
        .then(response => {
            console.log(response.data.result);
            setReco(response.data.result);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return(
        <div className="register_form">
            <Formik 
                initialValues = {{ // * Note don't change [ initialValues ]
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    gender: '',
                    password: '',
                    cPassword: '',
                    recommended: 0,
                    birthday: new Date() ,
                    checked: null
                }}
                validationSchema={SignupSchema}
                onSubmit = { (values) => {
                    // when submit form send data
                    console.log(values); 
                }}
            >

            {({ errors, touched, handleChange, handleBlur, values }) => (

                <Form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">                
                            <label htmlFor="firstName"> Firstname </label>
                            <Field type="text" name="firstName" id="firstName" className="form-control" placeholder="firstname" />
                            {errors.firstName && touched.firstName ? (<ErrorMsg>{errors.firstName}</ErrorMsg>) : null}
                            </div> 

                            <div className="form-group">                
                                <label htmlFor="email"> Email </label>
                                <Field type="email" name="email" id="email" className="form-control" placeholder="email" />
                                {errors.email && touched.email ? (<ErrorMsg>{errors.email}</ErrorMsg>) : null}
                            </div> 
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">                
                                <label htmlFor="lastName"> Lastname </label>
                                <Field type="text" name="lastName" id="lastName" className="form-control" placeholder="lastname" />
                                {errors.lastName && touched.lastName ? (<ErrorMsg>{errors.lastName}</ErrorMsg>) : null}
                            </div> 

                            <div className="form-group">                
                                <label htmlFor="phone"> Phone number </label>
                                <Field type="number" name="phoneNumber" id="phone" className="form-control" placeholder="phone" />
                                {errors.phoneNumber && touched.phoneNumber ? (<ErrorMsg>{errors.phoneNumber}</ErrorMsg>) : null}
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className='col-md-6'>
                            <div className="form-group">                
                                <label htmlFor="password"> Password </label>
                                <Field type="password" name="password" id="password" className="form-control" placeholder="password" />
                                {errors.password && touched.password ? (<ErrorMsg>{errors.password}</ErrorMsg>) : null}
                            </div> 
                        </div>

                        <div className='col-md-6'>
                            <div className="form-group">                
                                <label htmlFor="cpassword"> Confirm Password </label>
                                <Field type="password" name="cPassword" id="cpassword" className="form-control" placeholder="confirm password" />
                                {errors.cPassword && touched.cPassword ? (<ErrorMsg>{errors.cPassword}</ErrorMsg>) : null}
                            </div> 
                        </div>
                    </div>

                    <div className="form-group">Gender
                    <div className="form-check">
                        <Field type="radio" id="male" className="form-check-input" name="gender" value="male" />
                        <label htmlFor="male" class="form-check-label">Male</label>
                    </div>

                    <div className="form-check">
                        <Field id="female" type="radio" className="form-check-input" name="gender" value="female" />
                        <label htmlFor="female" class="form-check-label">Female</label>
                    </div>
                    {errors.gender && touched.gender ? (<ErrorMsg>{errors.gender}</ErrorMsg>) : null}
                 </div>

                 <div className="form-group">
                     <label htmlFor="birthday"> Birthday </label>
                     <Field id="birthday" className="form-control" type="date" name="birthday" />
                 </div>

                <div className="form-group">
                <label htmlFor="recommended"> Recommended </label>
                    <select
                        id="recommended"
                        value={ values.recommended }
                        className="form-control"
                        name="recommended"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option value="0" label="Select a recommended" />
                        {
                            reco.map(r => {
                                const id = parseInt(r.id);
                                return <option key={r.id} value={ id } label={r.recommendedByTranslations[0].name} />
                            })
                        }

                    </select>
                </div>

                <div role="group" aria-labelledby="checkbox-group">
                    <Field type="checkbox" id="check" name="checked" value="checked" /> 
                    <label htmlFor="check" className="terms">
                        I agree terms and conditions
                    </label>
                    {/* {errors.checked && touched.checked ? (<ErrorMsg>{errors.checked}</ErrorMsg>) : null} */}
                </div>


                <button className="btn btn-primary" type="submit" > Register </button>
            </Form>
            )}
            
            </Formik>


        </div>
    );
}