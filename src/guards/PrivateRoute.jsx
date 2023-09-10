import { Navigate, useNavigate } from 'react-router';
import { PATH_DASHBOARD } from '../routes/paths';
import { useEffect } from 'react';
// pages


// ----------------------------------------------------------------------
export default function PrivateRoute({ children }) {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("panelType") !== "2") {
            navigate("/dashboard/home");
        }
    }, [])


    if (localStorage.getItem("panelType") === "2") {
        return (<>{children}</>);
    }
    return null

}
