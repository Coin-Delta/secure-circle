import { Axios } from './axios';

export const getAllExamCategory = async query => {
  const result = await Axios.get(`/exam-category/?${query}`);
  return result.data;
};
export const createExamCategory = async data => {
  const result = await Axios.post('/exam-category', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data;
};
export const deleteExamCategory = async id => {
  const result = await Axios.delete(`/exam-category/${id}`);
  return result.data;
};
export const getExamCategoryById = async id => {
  const result = await Axios.get(`/exam-category/${id}`);
  return result.data;
};
export const updateExamCategory = async (id, data) => {
  const result = await Axios.put(`/exam-category/${id}`, data);
  return result.data;
};
