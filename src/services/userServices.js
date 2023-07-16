import { get, post } from "../utils/request";
export const login = (email, password) => {
  const response = get(`users?email=${email}&password=${password}`);
  return response;
};
export const exitsEmail = async (email) => {
  const response = await get(`users?email=${email}`);
  return response;
};
export const newUser = async (options) => {
  const response = await post("users", options);
  return response;
};
