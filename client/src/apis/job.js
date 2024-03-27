import axios from "axios";
import { Navigate } from "react-router-dom";
export const createJobPost = async (JobPostPayload) => {
    try {
        const reqUrl = `http://localhost:4000/api/v1/job/create`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, JobPostPayload);
        console.log(response.data);
    } catch (error) {
        if (error.isTokenExpired) {
            localStorage.clear();
            Navigate("/login");
        }
        console.log(error);
    }
};

export const getJobPostById = async (jobPostId) => {
    try {
        const reqUrl = `http://localhost:4000/api/v1/job/job-details/${jobPostId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        return response.data ;
    } catch (error) {
        console.log(error);
    }
};

export const updateJobPostById = async (jobPostId, updatedFormData) => {
    try {
        const reqUrl = `http://localhost:4000/api/v1/job/update/${jobPostId}`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl, updatedFormData);
        return response.data;
    } catch (error) {
        console.log(error);
        // toast something went wrong please try after sometime
    }
};

export const getAllJobPost = async (filter) => {
    try {
        const reqUrl = `http://localhost:4000/api/v1/job/all?title=${
            filter?.title || ""
        }&skills=${filter?.skills || ""}`;
        const response = await axios.get(reqUrl);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        // toast something went wrong please try after sometime
    }
};