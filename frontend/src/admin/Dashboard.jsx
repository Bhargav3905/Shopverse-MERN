import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({});

    const fetchDashboard = async () => {
        try {
            const response = await axiosInstance.get("/api/dashboard");
            setDashboard(response.data);
        }
        catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <div className="container py-5">

            <div className="mb-5">

                <h1 className="fw-bold section-title">
                    Admin Dashboard
                </h1>

                <p className="text-muted fs-5">
                    Monitor products, categories, users, orders and revenue.
                </p>

            </div>

            <div className="row g-4">

                {/* Products */}

                <div className="col-lg-4 col-md-6">
                    <div
                        className="card shadow bg-success-subtle border-success-subtle"
                        style={{
                            borderRadius: "24px",
                            transition: "0.25s",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-6px)";
                            e.currentTarget.style.boxShadow = "0 18px 35px rgba(0,0,0,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "";
                        }}
                    >
                        <div className="card-body text-center py-5">

                            <i className="bi bi-box-seam fs-1 text-success mb-3"></i>

                            <h5
                                className="fw-semibold text-secondary mb-3"
                                style={{ letterSpacing: "0.5px" }}
                            >
                                Total Products
                            </h5>

                            <h1
                                className="fw-bold mb-0"
                                style={{ fontSize: "3.2rem" }}
                            >
                                {dashboard.totalProducts || 0}
                            </h1>

                        </div>
                    </div>
                </div>

                {/* Categories */}

                <div className="col-lg-4 col-md-6">
                    <div
                        className="card shadow bg-primary-subtle border-primary-subtle"
                        style={{
                            borderRadius: "24px",
                            transition: "0.25s",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-6px)";
                            e.currentTarget.style.boxShadow = "0 18px 35px rgba(0,0,0,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "";
                        }}
                    >
                        <div className="card-body text-center py-5">

                            <i className="bi bi-grid fs-1 text-primary mb-3"></i>

                            <h5
                                className="fw-semibold text-secondary mb-3"
                                style={{ letterSpacing: "0.5px" }}
                            >
                                Total Categories
                            </h5>

                            <h1
                                className="fw-bold mb-0"
                                style={{ fontSize: "3.2rem" }}
                            >
                                {dashboard.totalCategories || 0}
                            </h1>

                        </div>
                    </div>
                </div>

                {/* Users */}

                <div className="col-lg-4 col-md-6">
                    <div
                        className="card shadow bg-warning-subtle border-warning-subtle"
                        style={{
                            borderRadius: "24px",
                            transition: "0.25s",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-6px)";
                            e.currentTarget.style.boxShadow = "0 18px 35px rgba(0,0,0,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "";
                        }}
                    >
                        <div className="card-body text-center py-5">

                            <i className="bi bi-people fs-1 text-warning mb-3"></i>

                            <h5
                                className="fw-semibold text-secondary mb-3"
                                style={{ letterSpacing: "0.5px" }}
                            >
                                Total Users
                            </h5>

                            <h1
                                className="fw-bold mb-0"
                                style={{ fontSize: "3.2rem" }}
                            >
                                {dashboard.totalUsers || 0}
                            </h1>

                        </div>
                    </div>
                </div>

                {/* Orders */}

                <div className="col-lg-6">
                    <div
                        className="card shadow bg-info-subtle border-info-subtle"
                        style={{
                            borderRadius: "24px",
                            transition: "0.25s",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-6px)";
                            e.currentTarget.style.boxShadow = "0 18px 35px rgba(0,0,0,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "";
                        }}
                    >
                        <div className="card-body text-center py-5">

                            <i className="bi bi-bag-check fs-1 text-info mb-3"></i>

                            <h5
                                className="fw-semibold text-secondary mb-3"
                                style={{ letterSpacing: "0.5px" }}
                            >
                                Total Orders
                            </h5>

                            <h1
                                className="fw-bold mb-0"
                                style={{ fontSize: "3.2rem" }}
                            >
                                {dashboard.totalOrders || 0}
                            </h1>

                        </div>
                    </div>
                </div>

                {/* Revenue */}

                <div className="col-lg-6">
                    <div
                        className="card shadow bg-danger-subtle border-danger-subtle"
                        style={{
                            borderRadius: "24px",
                            transition: "0.25s",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-6px)";
                            e.currentTarget.style.boxShadow = "0 18px 35px rgba(0,0,0,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "";
                        }}
                    >
                        <div className="card-body text-center py-5">

                            <i className="bi bi-currency-rupee fs-1 text-danger mb-3"></i>

                            <h5
                                className="fw-semibold text-secondary mb-3"
                                style={{ letterSpacing: "0.5px" }}
                            >
                                Total Revenue
                            </h5>

                            <h1
                                className="fw-bold mb-0"
                                style={{ fontSize: "3rem" }}
                            >
                                ₹{dashboard.totalRevenue || 0}
                            </h1>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;