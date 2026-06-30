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
        <div className="container mt-5">
            <h1 className="mb-5">Admin Dashboard</h1>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h5>Total Products</h5>
                            <h2>{dashboard.totalProducts}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h5>Total Categories</h5>
                            <h2>{dashboard.totalCategories}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h5>Total Users</h5>
                            <h2>{dashboard.totalUsers}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h5>Total Orders</h5>
                            <h2>{dashboard.totalOrders}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            <h5>Total Revenue</h5>
                            <h2>₹{dashboard.totalRevenue}</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;