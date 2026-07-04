import { useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

const Home = () => {

    const navigate = useNavigate();

    const admin = isAdmin();

    const userName = localStorage.getItem("fullName");

    const handlePrimaryButton = () => {
        navigate(admin ? "/admin-dashboard" : "/shop");
    };

    return (

        <section className="hero-section">

            <div className="container">

                <div className="row align-items-center gy-5">

                    <div className="col-lg-6">

                        <span className="hero-badge">
                            Welcome to ShopVerse
                        </span>

                        <h1 className="hero-title">

                            {userName
                                ? `Welcome, ${userName}`
                                : "Discover Your Next Favorite Product"}

                        </h1>

                        <p className="hero-description">

                            Discover premium products carefully selected
                            to deliver quality, affordability and style.
                            Enjoy a fast, secure and seamless shopping
                            experience from anywhere.

                        </p>

                        <div className="d-flex gap-3 mt-4">

                            <button
                                className="btn btn-custom-primary btn-lg px-4"
                                onClick={handlePrimaryButton}
                            >
                                {admin ? "Go to Dashboard" : "Shop Now"}
                            </button>

                            {
                                !admin &&
                                <button
                                    className="btn btn-custom-outline btn-lg px-4"
                                    onClick={() => navigate("/about")}
                                >
                                    Learn More
                                </button>
                            }

                        </div>

                    </div>

                    <div className="col-lg-6 text-center">

                        <img
                            src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-9.webp" alt="Shopping"
                            className="hero-image img-fluid "
                            style={{
                                animation: "float 4s ease-in-out infinite"
                            }}
                        />

                    </div>

                </div>

            </div>

        </section>

    );

};

export default Home;