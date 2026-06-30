import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute
