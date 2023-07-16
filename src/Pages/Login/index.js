import { login } from "../../services/userServices";
import { setCookie } from "../../helper/cookie"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authen } from "../../action/authen";

function Login (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const response = await login(email, password);
        if(response.length > 0){
            const {id, fullName , email, token } = response[0];
            const time = 1
            setCookie("id", id , time);
            setCookie("fullName", fullName , time);
            setCookie("email", email , time);
            setCookie("token", token , time);
            navigate("/");
            dispatch(authen(true));
        }
        else{
            alert("Mat khau ko dung")
        }
    }

    return(
        <>
            <div className="form">
                <h3 className="inner-title">Login Quiz</h3>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" required/>
                    <input type="password" name="password" placeholder="Password" required/>
                    <button className="button">Login</button>
                </form>
            </div>
        </>
    )
}
export default Login;