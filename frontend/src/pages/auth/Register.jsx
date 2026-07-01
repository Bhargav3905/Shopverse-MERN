import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance'

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/api/user/register", {
                email,
                fullName,
                phone,
                password,
            })

            alert("Registration successful")
            navigate("/login")
        } catch (error) {
            if (error.response?.data?.redirectToLogin) {
                alert("Account already exists.\nYou can login now.");
                navigate("/login");
            } else {
                alert("Registration failed");
            }
        }
    }

    return (
        <div className="container py-5">

            <div className="card border-0 shadow-lg overflow-hidden">

                <div className="row g-0 align-items-center">

                    <div className="col-lg-6 p-5">

                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
                            Create Account
                        </span>

                        <h1 className="fw-bold display-5 mb-3">
                            Join ShopVerse
                        </h1>

                        <p className="text-muted mb-4">
                            Create your account to discover premium products,
                            secure checkout and a seamless shopping experience.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    className="form-control"
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Phone</label>
                                <input
                                    type="number"
                                    value={phone}
                                    className="form-control"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    className="form-control"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-custom-primary w-100 py-3">
                                Create Account
                            </button>

                        </form>

                        <p className="text-center mt-4 mb-0">
                            Already have an account?{" "}
                            <span
                                className="text-success fw-semibold"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </span>
                        </p>

                    </div>

                    <div className="col-lg-6 d-flex justify-content-center align-items-center p-5">

                        <div
                            style={{
                                width: "100%",
                                maxWidth: "460px"
                            }}
                        >

                            <img
                                src="/sign up.svg"
                                alt="Register"
                                className="img-fluid"
                                style={{
                                    maxHeight: "420px",
                                    animation: "float 4s ease-in-out infinite"
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Register
