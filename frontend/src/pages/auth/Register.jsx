import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance'
import toast from "react-hot-toast";

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!/^[6-9]\d{9}$/.test(phone)) {
            toast.error("Enter valid phone number");
            setLoading(false);
            return;
        }

        let id;

        try {
            id = toast.loading("Creating account...");

            const response = await axiosInstance.post("/api/user/register", {
                email,
                fullName,
                phone,
                password,
            })

            toast.success("Registration successful")

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error) {
            if (error.response?.data?.redirectToLogin) {
                toast.success("Account already exists.\nYou can login now.");
                navigate("/login");
            } else {
                toast.error("Registration failed");
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
                                    required
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    required
                                    minLength={2} maxLength={40}
                                    className="form-control"
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    value={phone}
                                    required
                                    maxLength={10}
                                    className="form-control"
                                    placeholder="9876543210"
                                    onChange={(e) =>
                                        setPhone(
                                            e.target.value.replace(/\D/g, "").slice(0, 10)
                                        )
                                    }
                                />
                            </div>

                            <div className="mb-4">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    required
                                    minLength={5}
                                    className="form-control"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-custom-primary w-100 py-3">
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
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
