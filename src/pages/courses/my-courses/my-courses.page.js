import React, { useState, useEffect } from 'react';

import './my-courses.page.css';

import { getUsersCoursesAPI } from '../../../api.constants'; 

import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar'

export function MyCourses() {

    const history = useHistory();

    const [myCourses, setMyCourses] = useState([]);
    const [ isLoading, setLoading ] = useState(0);

    useEffect(() => {
        setLoading(50)
        axios.get(`${ getUsersCoursesAPI }?Offset=0&Limit=10`)
        .then(response => {
            console.log(response.data.result);
            setLoading(isLoading + 100)
            setMyCourses(response.data.result);
        }).catch((error) => {
            if (error.response.status === 403) {
                // <Redirect to="/login" />
                localStorage.clear()
                history.push('/login')
            }
        })
        return () => {
            console.log('clean up');
        }
    }, [])

    return (
        <div className="container">
            <h2 className="m-4">My Courses</h2>
            <LoadingBar
                color='#f11946'
                progress={isLoading}
                onLoaderFinished={() => setLoading(0)}
            />
            <div className="row">
                {
                    myCourses.map(course => {
                        return (
                            <div className="col-md-4" key={course.course.id}> 
                                <div className="card">
                                    <img src={course.course.imagePath} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title"> {course.course.courseTranslations[0].title} </h5>
                                        <Link to={'/user-course-details/' + course.course.id} className="btn btn-primary btn-view btn-block">View Course</Link>
                                    </div>
                                </div> 
                            </div>
                        );
                    })
                }

            </div>
        </div>
    )
}
