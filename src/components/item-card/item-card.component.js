import React, { useContext } from 'react';

import './item-card.component.css';

import { AllCourse, AllCourses } from '../../pages/courses/all-courses/allCourses.page';

import { Link } from 'react-router-dom';

export function CourseItemCard() {

    const allCourses  = useContext(AllCourse)

    return (
        <div className="row">

            {
                allCourses.map(res => {
                    return(
                        <div className="col-md-4" key={res.id}> 
                            <div className="card">
                            <img src={res.imagePath} className="card-img-top" alt={res.imagePath} />
                            <div className="card-body">
                                <h5 className="card-title">{ res.courseTranslations[0].title }</h5>
                                <Link to={'/course-details/' + res.id} className="btn btn-primary btn-view btn-block">View Course</Link>
                            </div>
                            </div> 
                        </div>
                    );
                })
            }
    
        </div>
    )
}

