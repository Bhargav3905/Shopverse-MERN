import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/api/auth/forgot-password", { email });
            alert(response.data.message);
            navigate("/reset-password", {
                state: { email }
            });
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className="container mt-5">

            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>
                <input className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <button className="btn btn-success mt-3" >
                    Send OTP
                </button>
            </form>

        </div>
    )
}

export default ForgotPassword;