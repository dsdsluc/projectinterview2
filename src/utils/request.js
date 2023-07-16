const DOMAIN = "https://databaseinterview2.vercel.app/";

export const get = async (path)=>{
    const reponse = await fetch(DOMAIN + path);
    const result = await reponse.json();
    return result;
}
export const post = async (path, option)=>{
    const reponse = await fetch(DOMAIN + path, {
        method: "POST",
        headers :{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(option),
    });
    const result = await reponse.json();
    return result;
}
export const patch = async (path, option)=>{
    const reponse = await fetch(DOMAIN + path, {
        method: "PATCH",
        headers :{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(option),
    });
    const result = await reponse.json();
    return result;
}
export const del = async (path)=>{
    const reponse = await fetch(DOMAIN + path,{
        method:"DELETE"
    });
    const result = await reponse.json();
    return result;
}
