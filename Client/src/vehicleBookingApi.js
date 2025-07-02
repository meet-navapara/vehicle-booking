import axios from 'axios';
import { BASE_URL } from './constants/apiConstants';

export const getVehicleTypes = async (wheels) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/vehicles/types/${wheels}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getTypes = async (wheels) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/vehicles/types/${wheels}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getModels = async (typeId) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/vehicles/models/${typeId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const bookVehicle = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/bookings/book`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};