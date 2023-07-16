import { Link, NavLink, Outlet } from "react-router-dom";
import { getCookie } from "../../../helper/cookie"
import { useSelector } from "react-redux";
function LayoutDefault (){
    const token = getCookie("token");
    const isLogin = useSelector(state => state.authenReducer);
    console.log(isLogin);
    return(
        <>
            <header className="header">
                <div className="logo">
                    <Link to={"/"}>Quiz</Link>
                </div>
                {token && (
                    <div className="menu">
                    <ul className="menu__ul">
                        <li> <NavLink to={"/"}>Home </NavLink> </li>
                        <li> <NavLink to={"/topic"}>Topic </NavLink> </li>
                        <li> <NavLink to={"/answer"}>Answer </NavLink> </li>
                        
                    </ul>
                </div>
                )}
                
                <div className="menu">
                    {token ? (
                        <ul className="menu__ul">
                            <li> <NavLink to={"/logout"}>Logout </NavLink> </li>
                        </ul>
                    ): (
                        <ul className="menu__ul">
                        <li> <NavLink to={"/login"}>Login </NavLink> </li>
                        <li> <NavLink to={"/register"}>Register </NavLink> </li>
                        </ul>
                    )}

                   
                </div>
            </header>
            <main className="main">
                <Outlet/>
            </main>
            <footer className="footer">
                Copyright 2023 by HaMinhPhuong
            </footer>
        </>

    )
}
export default LayoutDefault;