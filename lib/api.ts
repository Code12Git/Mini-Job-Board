import axios from 'axios';

const createInstance = (contentType) => {
    return axios.create({
        baseURL: 'http://localhost:3000/api',
        headers: {
            'Content-Type': contentType
        }
    });
};

export default createInstance;