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
        <div className="container py-5">

            <div className="card border-0 shadow-lg overflow-hidden">

                <div className="row g-0 align-items-center">

                    {/* Left Image */}

                    <div className="col-lg-6 d-flex justify-content-center align-items-center p-5">

                        <div
                            style={{
                                width: "100%",
                                maxWidth: "460px"
                            }}
                        >

                            <img
                                src="/login.svg"
                                alt="Login"
                                className="img-fluid"
                                style={{
                                    maxHeight: "420px",
                                    animation: "float 4s ease-in-out infinite"
                                }}
                            />

                        </div>

                    </div>

                    {/* Right Form */}

                    <div className="col-lg-6 p-5">

                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
                            Welcome Back
                        </span>

                        <h1 className="fw-bold display-5 mb-3">
                            Sign In
                        </h1>

                        <p className="text-muted mb-4">
                            Login to continue shopping with ShopVerse.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-2">
                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="text-end mb-4">

                                <Link
                                    to="/forgot-password"
                                    className="text-success text-decoration-none"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-custom-primary w-100 py-3">
                                Sign In
                            </button>

                        </form>

                        <p className="text-center mt-4 mb-0">
                            New to ShopVerse?{" "}
                            <span
                                className="text-success fw-semibold"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/register")}
                            >
                                Create Account
                            </span>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login
