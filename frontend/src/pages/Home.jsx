import { useNavigate } from 'react-router-dom'
import axiosInstance from '../services/axiosInstance';
import { isAdmin } from '../utils/auth';

const Home = () => {

    const navigate = useNavigate();
    const admin = isAdmin();
    const userName = localStorage.getItem("fullName");

    const handlePrimaryButton = () => {
        navigate(admin ? "/admin-dashboard" : "/shop");
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row align-items-center">

                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1>Welcome {userName ? `, ${userName}` : "to ShopVerse"}</h1>
                        <h3 className="mb-4 fs-6">
                            Discover premium products carefully selected to bring you the perfect
                            combination of quality, style, and affordability. Browse our latest
                            collection and enjoy a seamless shopping experience from start to finish.
                        </h3>
                        <button onClick={handlePrimaryButton} className="btn btn-primary btn-lg px-4 rounded-1">
                            {admin ? "Go to Dashboard" : "Shop Now"}
                        </button>
                    </div>

                    <div className="col-lg-6 text-center">
                        <img src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-9.webp" alt="Stylish fashion model" className="img-fluid" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home
