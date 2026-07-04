import { Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin } from "../utils/auth";

const GuestRoute = ({ children }) => {

    if (isLoggedIn()) {
        return <Navigate to={isAdmin() ? "/admin-dashboard" : "/"} replace />;
    }

    return children;
};

export default GuestRoute;