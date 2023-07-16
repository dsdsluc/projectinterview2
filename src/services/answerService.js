import { getCookie } from "../helper/cookie";
import { get, post } from "../utils/request"

export const createAnswer = async (option)=>{
    const response = await post("answers", option);
    return response;
}
export const getAnswer = async (id)=>{
    const response = await get(`answers/${id}`);
    return response;
}
export const getlistAnswer = async ()=>{
    const userId = getCookie("id");
    const response = await get(`answers?userId=${userId}`);
    return response;
}