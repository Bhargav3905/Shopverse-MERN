import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";
import { isAdmin } from "../utils/auth";
import toast from "react-hot-toast";

const Profile = () => {

    const admin = isAdmin();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        let id;
        try {
            id = toast.loading("Updating password...");
            const response = await axiosInstance.put("/api/auth/change-password", formData);

            toast.success(response.data.message);
            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
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

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm rounded-4 p-5">

                        <div className="text-center mb-5">

                            <div className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm mb-4"
                                style={{ width: "110px", height: "110px", background: "#F8FAFC", border: "2px solid #E2E8F0" }} >
                                <img
                                    src="/profile.svg"
                                    alt="profile"
                                    width={58}
                                    height={58}
                                />
                            </div>

                            <h2 className="fw-bold">
                                My Profile
                            </h2>

                            <p className="text-muted mb-0">
                                View your information and manage your account settings.
                            </p>

                        </div>

                        <div className="row g-4">

                            <div className="col-md-6">
                                <label className="text-muted">
                                    Full Name
                                </label>

                                <div className="form-control bg-light">
                                    {localStorage.getItem("fullName")}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="text-muted">
                                    Email
                                </label>

                                <div className="form-control bg-light">
                                    {localStorage.getItem("email")}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="text-muted">
                                    Role
                                </label>

                                <div className="form-control bg-light text-capitalize">
                                    {localStorage.getItem("role")}
                                </div>
                            </div>

                        </div>

                        {
                            !admin &&
                            <div className="mt-4">

                                <Link
                                    to="/orders"
                                    className="btn btn-custom-primary rounded-pill px-4"
                                >
                                    My Orders
                                </Link>

                            </div>
                        }

                        <hr className="my-5" />

                        <h3 className="fw-bold mb-4">
                            Change Password
                        </h3>

                        <form onSubmit={handleChangePassword}>

                            <div className="mb-3">

                                <label>
                                    Current Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter current password"
                                    value={formData.currentPassword}
                                    required
                                    minLength={5}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            currentPassword: e.target.value
                                        })
                                    }
                                />

                            </div>

                            <div className="mb-3">

                                <label>
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter new password"
                                    required
                                    minLength={5}
                                    value={formData.newPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            newPassword: e.target.value
                                        })
                                    }
                                />

                            </div>

                            <div className="mb-4">

                                <label>
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm new password"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value
                                        })
                                    }
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-custom-primary rounded-pill px-4"
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Updating...
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;