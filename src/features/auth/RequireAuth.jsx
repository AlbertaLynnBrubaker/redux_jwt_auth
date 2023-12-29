import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    return (
        // this would be where we could check our token if we wanted OR if we were using React Router to set up roles. This is just a routing component.
        token
            ? <Outlet />
            : <Navigate to='/login' state={{from: location}} replace />

    )
}

export default RequireAuth