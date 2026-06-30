import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        email: location.state?.email || "",
        otp: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/api/auth/reset-password", form);
            alert(response.data.message);
            navigate("/login");
        }
        catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="container mt-5">

            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>

                <input value={form.email} readOnly className="form-control mb-3" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />

                <input className="form-control mb-3" placeholder="OTP" onChange={(e) => setForm({ ...form, otp: e.target.value })} />

                <input type="password" className="form-control mb-3" placeholder="New Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />

                <button className="btn btn-success">
                    Reset Password
                </button>

            </form>
        </div>
    );
};

export default ResetPassword;