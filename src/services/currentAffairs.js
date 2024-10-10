import { Axios } from './axios';

export const getAllAffair = async query => {
  const result = await Axios.get(`/current-affairs?${query}`);
  return result.data;
};

export const getAffairById = async id => {
  const result = await Axios.get(`/current-affairs/${id}`);
  return result.data;
};

export const createAffair = async data => {
  const result = await Axios.post('/current-affairs', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result.data;
};
export const deleteAffair = async id => {
  const result = await Axios.delete(`/current-affairs/${id}`);
  return result.data;
};
export const updateAffair = async (id, data) => {
  const result = await Axios.put(`/current-affairs/${id}`, data);
  return result.data;
};
