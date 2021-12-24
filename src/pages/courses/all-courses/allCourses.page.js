import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { getAllCoursesAPI } from '../../../api.constants'; 

import { CourseItemCard } from '../../../components/item-card/item-card.component';

import { useHistory } from 'react-router-dom';

import LoadingBar from 'react-top-loading-bar'


import './allCourses.page.css';

export const AllCourse = React.createContext();

export function AllCourses() {

    const history = useHistory();

    const [courses, setCourses] = useState([]);
    const [ isLoading, setLoading ] = useState(0);

    useEffect(() => {
        setLoading(50)
        axios.get(`${ getAllCoursesAPI }?Offset=0&Limit=10`)
        .then(response => {
            console.log(response)
            setLoading(isLoading + 100)
            setCourses(response.data.result);
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 403) {
                localStorage.clear();
                history.push('/login');
            }
        })
    }, [])


    return (
        <div className="container">
            
            <h2 className="m-4"> All courses </h2>
            <LoadingBar
                color='#f11946'
                progress={isLoading}
                onLoaderFinished={() => setLoading(0)}
            />

            <AllCourse.Provider value={ courses }>
                <CourseItemCard />
            </AllCourse.Provider>

        </div>


    )
}

