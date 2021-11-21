import React, { useState, useEffect } from 'react';

import './courseDetails.page.css';

import axios from "axios";  

import { getCourseDetails } from "../../../api.constants";

import LoadingBar from 'react-top-loading-bar'

import { useParams } from 'react-router-dom';

export function CourseDetails() {

    const [course, setCourse] = useState();
    const [ isLoading, setLoading ] = useState(0);
    const { id } = useParams();


    useEffect(() => {
        setLoading(50)
        axios.get(`${ getCourseDetails }?id=${id}`)
        .then(response => {
            setLoading(isLoading + 100)
            setCourse(response.data.result);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div className="container course_details" key="course.id"> 
            <LoadingBar
                color='#f11946'
                progress={isLoading}
                onLoaderFinished={() => setLoading(0)}
            />
            
            {
                course ?
                <div className="row">
                <div className="col-md-5"> 
                    <img src={course.imagePath} alt="" />
                </div>
                    <div className="col-md-6 course-text">
                        <h3> { course.courseTranslations[0].title} </h3>
                        <p> { course.courseTranslations[0].description ?  course.courseTranslations[0].description : <p> no description in this course </p>} </p>
                        <h5> Valid For: { course.duration } Day</h5>
                        {
                            course.statusName
                            ?
                            <div className="course-status mt-5">
                                <button className="btn btn-primary btn-block"> { course.statusName } </button>
                            </div>
                            : ''
                        }
           
                    </div>
            </div>
            :
            ''
            }
 
        </div>
    );
}