import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import toast from "react-hot-toast";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let id;

        try {
            id = toast.loading("Signing in...");

            const response = await axiosInstance.post("/api/user/login", { email, password })

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("email", response.data.userEmail)
            localStorage.setItem("fullName", response.data.userFullName)
            localStorage.setItem("role", response.data.userRole)

            toast.success("Login Successful");
            setTimeout(() => {
                navigate("/", { replace: true });
                window.location.reload();
            }, 1000);

        } catch (error) {
            if (error.response?.data?.redirectToRegister) {
                toast.error("Account not found.\nPlease register first.");
                navigate("/register");
            } else {
                toast.error("Login failed");
            }
        } finally {
            toast.dismiss(id);
            setLoading(false);
        }
    }

    return (
        <div className="container py-5">

            <div className="card border-0 shadow-lg overflow-hidden">

                <div className="row g-0 align-items-center">

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
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-2">
                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    required
                                    minLength={5}
                                    value={password}
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
                                disabled={loading}
                                className="btn btn-custom-primary w-100 py-3">
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
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
