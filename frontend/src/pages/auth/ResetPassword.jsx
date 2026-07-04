import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        email: location.state?.email || "",
        otp: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let id;
        try {
            id = toast.loading("Resetting password...");

            const response = await axiosInstance.post("/api/auth/reset-password", form);
            toast.success(response.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000)
        }
        catch (error) {
            toast.error(error.response.data.message);
        } finally {
            toast.dismiss(id);
            setLoading(false);
        }
    };

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
                                src="/reset password.svg"
                                alt="Reset Password"
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
                            Secure Reset
                        </span>

                        <h1 className="fw-bold display-5 mb-3">
                            Reset Password
                        </h1>

                        <p className="text-muted mb-4">
                            Verify your OTP and create a new secure password.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>Email Address</label>

                                <input
                                    value={form.email}
                                    readOnly
                                    className="form-control bg-light"
                                />

                            </div>

                            <div className="mb-3">

                                <label>OTP</label>

                                <input
                                    className="form-control"
                                    placeholder="Enter OTP"
                                    required
                                    inputMode="numeric"
                                    minLength={6} maxLength={6}
                                    onChange={(e) =>
                                        setForm({ ...form, otp: e.target.value.replace(/\D/g, "").slice(0, 6) })
                                    }
                                />

                            </div>

                            <div className="mb-4">

                                <label>New Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    minLength={5}
                                    required
                                    placeholder="Enter new password"
                                    onChange={(e) =>
                                        setForm({ ...form, password: e.target.value })
                                    }
                                />

                            </div>

                            <button
                                className="btn btn-custom-primary w-100 py-3"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Resetting...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ResetPassword;