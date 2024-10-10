import { Axios } from './axios';

export const getAllJobs = async query => {
  const result = await Axios.get(`/jobs?${query}`);
  return result.data;
};

export const getJobsById = async id => {
  const result = await Axios.get(`/jobs/${id}`);
  return result.data;
};

export const createJobs = async data => {
  const result = await Axios.post('/jobs', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data;
};
export const deleteJobs = async id => {
  const result = await Axios.delete(`/jobs/${id}`);
  return result.data;
};
export const updateJobs = async (id, data) => {
  const result = await Axios.put(`/jobs/${id}`, data);
  return result.data;
};
