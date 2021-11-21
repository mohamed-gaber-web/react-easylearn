import React from 'react';

import RegisterForm  from "../../formik/register";

export function Register() {
    return(
        <div className="register">
            <div className="container">
                <h2 className="mt-5 mb-5"> Register Page </h2>
                <RegisterForm />
            </div>
        </div>
    );
}