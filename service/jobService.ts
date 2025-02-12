import createInstance from "@/lib/api";
const api = createInstance('multipart/form-data');

export const getJobById = async (jobId: string) => {
    try {
        const response = await api.get(`/jobs?id=${jobId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching job:", error);
        throw error;
    }
};

export const getJobs = async () => {
    try {
        const response = await api.get("/jobs");
        return response.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
}

export const createJob = async (job: any) => {
    try {
        const response = await api.post("/jobs", job);
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.error("Error creating job:", error);
        throw error;
    }
}


export const deleteJob = async(jobId:string) => {
    try{    
        const response = await api.delete(`/jobs/${jobId}`);
        return response.data;
    }catch(err){
        console.error('Error deleting job:',err);
        throw err;
    }
}

export const updateJob = async(jobId: string, job) => {
    try{    
        const response = await api.put(`/jobs?id=${jobId}`,job);
        return response.data;
    }catch(err){
        console.error('Error deleting job:',err);
        throw err;
    }
}

export const getApplicant = async(jobId:string) => {
    try{
        const response = await api.get(`/applications/${jobId}`);
         return response.data;
    }catch(err){
        console.error('Error fetching applicants:',err);
        throw err;
    }
}