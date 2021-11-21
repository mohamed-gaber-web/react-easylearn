import React, { useEffect, useState } from 'react';
import ForgetPassword from '../../formik/forget-password';

export function Profile() {

    const [profile, setProfile] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setProfile(user)
        // return () => {
        //     cleanup  
        // }
    }, [])

    return (
        <div className="profile container">
            <div className="row">
                <div className="col-md-6">
                    <div className="profile-img">
                        {/* <img src={ profile.imgParh } alt="" />  */}
                    </div>
                    <ul class="list-group mt-5">
                        <li className="list-group-item"><b> Firstname : </b> { profile.firstname }</li>
                        <li className="list-group-item"><b> Lastname : </b> { profile.lastname }</li>
                        <li className="list-group-item"><b> Email : </b> { profile.email }</li>
                        <li className="list-group-item"><b> Birthday : </b> { profile.birthdate }</li>
                        <li className="list-group-item"><b> Phone : </b> { profile.phoneNumber }</li>
                        <li className="list-group-item"> 
                            <button className="btn btn-primary btn-block"> Update </button>
                        </li>
                    </ul>
                </div>

                <div className="col-md-6">
                    <ul class="list-group mt-5">
                        <ForgetPassword />
                    </ul>
                </div>
            </div>            
        </div>
    );
}  