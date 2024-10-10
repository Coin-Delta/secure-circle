import { Axios } from './axios';

export const getAllUser = async query => {
  const result = await Axios.get(`/users/all?${query}`);
  return result.data;
};

export const getUserById = async id => {
  const result = await Axios.get(`/users/${id}`);
  return result.data;
};

export const getUser = async () => {
  const result = await Axios.get(`/users/`);
  return result.data;
};

export const updateUser = async data => {
  const result = await Axios.put(`/users/`, data);
  return result.data;
};

export const verifyUser = async (id, data) => {
  const result = await Axios.put(`/users/${id}`, data);
  return result.data;
};
