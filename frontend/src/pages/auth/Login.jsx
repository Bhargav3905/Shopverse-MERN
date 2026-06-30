import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/api/user/login", { email, password })

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("email", response.data.userEmail)
            localStorage.setItem("fullName", response.data.userFullName)
            localStorage.setItem("role", response.data.userRole)

            navigate("/", { replace: true });
            window.location.reload();
        } catch (error) {
            if (error.response?.data?.redirectToRegister) {
                alert("Account not found.\nPlease register first.");
                navigate("/register");
            } else {
                alert("Login failed");
            }
        }
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">

                <div className="col-6 mt-5" style={{ border: "1px solid", padding: "60px", borderRadius: "35px" }}>
                    <h1 className='text-center'>Login Page</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />

                            <div className="mt-2">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
