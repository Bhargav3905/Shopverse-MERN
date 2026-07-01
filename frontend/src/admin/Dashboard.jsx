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

                <p className="text-muted">
                    Monitor products, categories, users, orders and revenue.
                </p>

            </div>

            <div className="row g-4">

                <div className="col-lg-4 col-md-6">
                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body text-center py-5">

                            <h5 className="text-muted mb-3">
                                Total Products
                            </h5>

                            <h1 className="fw-bold text-success">
                                {dashboard.totalProducts || 0}
                            </h1>

                        </div>

                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body text-center py-5">

                            <h5 className="text-muted mb-3">
                                Total Categories
                            </h5>

                            <h1 className="fw-bold text-primary">
                                {dashboard.totalCategories || 0}
                            </h1>

                        </div>

                    </div>
                </div>

                <div className="col-lg-4 col-md-6">
                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body text-center py-5">

                            <h5 className="text-muted mb-3">
                                Total Users
                            </h5>

                            <h1 className="fw-bold text-warning">
                                {dashboard.totalUsers || 0}
                            </h1>

                        </div>

                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body text-center py-5">

                            <h5 className="text-muted mb-3">
                                Total Orders
                            </h5>

                            <h1 className="fw-bold">
                                {dashboard.totalOrders || 0}
                            </h1>

                        </div>

                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body text-center py-5">

                            <h5 className="text-muted mb-3">
                                Total Revenue
                            </h5>

                            <h1 className="fw-bold text-success">
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