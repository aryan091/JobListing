import axios from "axios";

export const registerUser = async ({ mobile , password , email , name}) => {
    try {

        const response = await axios.post("http://localhost:4000/api/v1/auth/register", {
            email,
            password,
            name,
            mobile
        });
        console.log(response.data);
        
    } catch (error) 
    {

        console.log(error);
        
    }
}

export const loginUser = async ({email , password}) => {
    try {

        const response = await axios.post("http://localhost:4000/api/v1/auth/login", {
            email,
            password
        });
        
        localStorage.setItem("token", response.data.token);

        return response.data.name;
        
    } catch (error) 
    {

        console.log(error);
        
    }
}