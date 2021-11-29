// const CORS = 'https://cors-anywhere.herokuapp.com/';

// export const baseUrl = `http://khrs-api.sdex.online`;
export const baseUrl = `https://khrs-api-test.sdex.online`; // test url

// Account
export const loginAPI = `${baseUrl}/api/Account/Login`;
export const recommendedBy = `${baseUrl}/api/RecommendedBy/GetRecommendedBy`;
export const updatedPassword = `${baseUrl}/api/Account/changePasswod`;

// courses
export const getAllCoursesAPI = `${baseUrl}/api/Course/GetCourses`;
export const getUsersCoursesAPI = `${baseUrl}/api/UserCourse/GetAll`;
export const getCourseDetails = `${baseUrl}/api/Course/Details`;
export const getUserCourseDetails = `${baseUrl}/api/UserCourse/Details`;



