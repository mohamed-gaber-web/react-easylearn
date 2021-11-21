import React, { useState, useEffect } from 'react';

import './user-course-details.css';

import axios from "axios";  

import { getUserCourseDetails } from "../../../api.constants";

import LoadingBar from 'react-top-loading-bar'

import { useParams } from 'react-router-dom';

import moment from 'moment';

export function UserCourseDetails() {

    const [course, setCourse] = useState();
    const [ isLoading, setLoading ] = useState(0);
    const { userId } = useParams();
    

    useEffect(() => {
        setLoading(50)
        axios.get(`${ getUserCourseDetails }?courseId=${userId}`)
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
                    <img src={course.course.imagePath} alt="" />
                </div>
                    <div className="col-md-6 course-text">
                        <h3> { course.userCourse.courseName} </h3>
                        <p>  { course.course.courseTranslations[0].description ?  course.course.courseTranslations[0].description :  'no description in this course' } </p>
                        <h5> <b> From : </b>  { moment(course.userCourse.startDate).format("MMM Do YY")} </h5>
                        <h5> <b> To : </b> { moment(course.userCourse.endDate).format("MMM Do YY") }</h5>
                        <h5> <b> Valid For : </b> { course.course.duration } Day </h5>

                        <div className="course-status mt-5">
                            <button className="btn btn-primary"> Material </button>
                            <button className="btn btn-primary"> Exercise </button>
                            <button className="btn btn-primary"> Final test </button>
                        </div>
 
           
                    </div>
            </div>
            :
            ''
            }
 
        </div>
    );
}