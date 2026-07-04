import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let id;

        try {
            id = toast.loading("Sending OTP...");

            const response = await axiosInstance.post("/api/auth/forgot-password", { email });

            toast.success(response.data.message);
            setTimeout(() => {
                navigate("/reset-password", {
                    state: { email }
                });
            }, 1000);
        }
        catch (error) {
            toast.error(error.response.data.message);
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
                            Password Recovery
                        </span>

                        <h1 className="fw-bold display-5 mb-3">
                            Forgot Password?
                        </h1>

                        <p className="text-muted mb-4">
                            Enter your registered email address and we'll send you
                            a One-Time Password (OTP) to reset your password.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">

                                <label>Email Address</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-custom-primary w-100 py-3"
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Sending OTP...
                                    </>
                                ) : (
                                    "Send OTP"
                                )}
                            </button>

                        </form>

                    </div>

                    <div className="col-lg-6 d-flex justify-content-center align-items-center p-5">

                        <div
                            style={{
                                width: "100%",
                                maxWidth: "460px"
                            }}
                        >

                            <img
                                src="/forgot password.svg"
                                alt="Forgot Password"
                                className="img-fluid"
                                style={{
                                    maxHeight: "390px",
                                    animation: "float 4s ease-in-out infinite"
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;