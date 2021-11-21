import React from 'react';

import { NavbarTop } from '../components/navbar/navbar.component';

export const UserContextCreate = React.createContext(); 

function UserContext() {

    const user = JSON.parse(localStorage.getItem('user'));


    console.log(user);

    return(
        <React.Fragment>
            <UserContextCreate.Provider value={ user }> 
                <NavbarTop> </NavbarTop>
            </UserContextCreate.Provider>
        </React.Fragment>
    );
}