import { get } from "../utils/request"

export const getListTopic =async ()=>{
    const response = await get("topics");
    return response;
}
export const getTopic = async (id)=>{
    const response = await get(`topic/${id}`);
    return response;
}