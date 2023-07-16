import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helper/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authen } from "../../action/authen";

function Logout (){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    deleteAllCookies();
    useEffect(()=>{
        dispatch(authen(false));
        navigate("/login")
    },[dispatch, navigate])
    return(
        <></>
    )
}
export default Logout;