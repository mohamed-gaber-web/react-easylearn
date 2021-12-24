import React from 'react';

import {  Route } from 'react-router-dom'

import { Register } from "./auth/register/register";
import { Login } from './auth/login/login';
import { AllCourses } from './pages/courses/all-courses/allCourses.page';
import { MyCourses } from './pages/courses/my-courses/my-courses.page';
import { CourseDetails } from './pages/courses/course-details/courseDetails.page';
import { NavbarTop } from './components/navbar/navbar.component';
import { UserCourseDetails } from './pages/courses/user-course-details/user-course-details.page';
import { Profile } from './pages/profile/profile.page';
import { NotFound } from './pages/not found/not-found.page';

import AuthService from './services/auth.service';
import ProtectedRoute from './protected-route/protected-route';
import { CourseMaterial } from './pages/courses/courseMtaterial/courseMaterial';

export const UserContext = React.createContext();
export const UserAuth = React.createContext();

export default function App () {

    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = new AuthService().isLoggedIn();
    
    return(
        <div>
            <UserContext.Provider value={user}>
                <UserAuth.Provider value={isLoggedIn}>
                    <NavbarTop />
                </UserAuth.Provider>
            </UserContext.Provider>

            <ProtectedRoute path="/" exact component={ AllCourses } />
            <Route path="/login" exact component={ Login } />
            {/* <Route path="**" exact={true} component={ NotFound } /> */}
            <ProtectedRoute path="/my-courses" exact component={ MyCourses } />
            <ProtectedRoute path="/course-details/:id" exact component={ CourseDetails } />
            <ProtectedRoute path="/user-course-details/:userId" exact component={ UserCourseDetails } />
            <ProtectedRoute path="/course-material/:courseId" exact component={ CourseMaterial } />
            <ProtectedRoute path="/register" exact component={ Register } />
            <ProtectedRoute path="/profile" exact component={ Profile } />
        </div>

    );
}

 