import createInstance from "@/lib/api";

const api = createInstance('multipart/form-data');

interface FormData {
    name: string;
    email: string;
    resume: string; 
    coverLetter: string,
    jobId:string
}

export const createApplication = async (jobId:string,formData: FormData) => {
    try {
        const response = await api.post(`/applications/${jobId}`,formData);
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
}