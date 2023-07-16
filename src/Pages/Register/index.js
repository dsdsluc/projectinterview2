import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helper/generateToken";
import { exitsEmail, newUser } from "../../services/userServices";

function Register (){
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const fullName = e.target.elements.fullName.value;
        const checkEmail = await exitsEmail(email);
        if(checkEmail.length > 0){
            alert("Email da ton tai");
        }
        else{
            const token = generateToken()
            const option = {
                fullName: fullName,
                email: email,
                password: password,
                token : token
            }
            const response = newUser(option);
            if(response){
                navigate("/login");
            }
            else{
                alert("Dang ki that bai")
            }

        }

    }

    return(
        <>
            <div className="form">
                <h3 className="inner-title">Register Account </h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="fullName" placeholder="FullName" required/>
                    <input type="email" name="email" placeholder="Email" required/>
                    <input type="password" name="password" placeholder="Password" required/>
                    <button className="button">Register</button>
                </form>
            </div>
        </>
    )
}
export default Register;