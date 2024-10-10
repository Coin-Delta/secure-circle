import { Axios } from './axios';

export const getAllExam = async query => {
  const result = await Axios.get(`/exam/?${query}`);
  return result.data;
};
export const createExam = async data => {
  const result = await Axios.post('/exam', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data;
};
export const deleteExam = async id => {
  const result = await Axios.delete(`/exam/${id}`);
  return result.data;
};
export const getExamById = async id => {
  const result = await Axios.get(`/exam/${id}`);
  return result.data;
};
export const updateExam = async (id, data) => {
  const result = await Axios.put(`/exam/${id}`, data);
  return result.data;
};
