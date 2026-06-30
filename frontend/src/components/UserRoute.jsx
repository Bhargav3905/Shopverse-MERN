import { Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin } from "../utils/auth";

const UserRoute = ({ children }) => {

    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    if (isAdmin()) {
        return <Navigate to="/admin-dashboard" replace />;
    }

    return children;
};

export default UserRoute;