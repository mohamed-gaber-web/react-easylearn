import { useState, useEffect } from 'react';
import './courseMaterial.css';
import axios from 'axios';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { courseMaterialApi } from '../../../api.constants';
import { useParams } from 'react-router-dom';

export function CourseMaterial() {

    const [courseMaterial, setCourseMaterial] = useState([]);
    const params = useParams();

    useEffect(() => {
        const getCourseMaterial = async() => {
            const response = await axios.get(`${courseMaterialApi}`, { params: {
                Offset: 0,
                Limit: 5,
                courseId: params.courseId
            }})
            console.log(response)
            setCourseMaterial(response.data.result)
        }
        getCourseMaterial();

    }, []);

    const materialData = courseMaterial.map(cm => {
        return (
            <div className='' key={cm.id}>
                <div className='container'> 
                    <img src={cm.imagePath} />
                    <p className='mt-5'> <span dangerouslySetInnerHTML={{ __html: cm.materialTranslations[0].description }} />  </p>
                </div>
            </div>
        );
    })

    return (
        <div className='course-material container mt-5'>
            <div className='row'>
                <AwesomeSlider>
                {materialData}
                </AwesomeSlider>
            </div>
        </div>
    );
}