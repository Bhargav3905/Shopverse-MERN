import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";
import { isAdmin } from "../utils/auth";

const Profile = () => {

    const admin = isAdmin();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put("/api/auth/change-password", formData);
            alert(response.data.message);
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        }
        catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="container mt-5">

            <h2>User Profile</h2>
            <hr />

            <h5>Name : {localStorage.getItem("fullName")}</h5>
            <h5>Email : {localStorage.getItem("email")}</h5>
            <h5>Role : {localStorage.getItem("role")}</h5>
            <hr />

            {
                !admin &&
                <Link to="/orders" className="btn btn-primary mt-4">
                    My Orders
                </Link>
            }

            <br />
            <br />
            <hr />

            <h3>Change Password</h3>

            <form onSubmit={handleChangePassword}>
                <input type="password" className="form-control mb-3" placeholder="Current Password" value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })} />

                <input type="password" className="form-control mb-3" placeholder="New Password" value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} />

                <input type="password" className="form-control mb-3" placeholder="Confirm Password" value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />

                <button className="btn btn-primary" >
                    Update Password
                </button>
            </form>

        </div>
    );
};

export default Profile;