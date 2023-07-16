import LayoutDefault from "../Pages/Layout/LayoutDefault";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import Register from "../Pages/Register";
import PrivateRoutes from "../components/PrivateRoutes";
import Topic from "../Pages/Topic";
import Quiz from "../Pages/Quiz";
import Result from "../Pages/Result";
import Answer from "../Pages/Answer";


export const routes = [
    {
        path: "/",
        element : <LayoutDefault/>,
        children: [
            {
                index : true,
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/logout",
                element: <Logout/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {  
                element: <PrivateRoutes/>,
                children: [
                    {
                        path: "topic",
                        element: <Topic/>
                    },
                    {
                        path: "quiz/:id",
                        element: <Quiz/>
                    },
                    {
                        path: "result/:id",
                        element: <Result/>
                    },
                    {
                        path: "answer",
                        element: <Answer/>
                    },
                ]
            },
        ]
    }
]
