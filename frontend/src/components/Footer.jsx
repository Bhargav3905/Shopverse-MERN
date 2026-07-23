import { Link } from "react-router-dom";
import { isAdmin } from "../utils/auth";

const Footer = () => {

    const admin = isAdmin();

    return (

        <footer className="footer">

            <div className="container">

                <div className="row gy-5">

                    <div className="col-lg-4">

                        <h3 className="footer-logo">
                            ShopVerse
                        </h3>

                        <p className="footer-text">
                            Shop smarter with quality products, secure payments
                            and a seamless shopping experience.
                        </p>

                    </div>

                    <div className="col-lg-4">

                        <h5 className="footer-title">

                            {admin ? "Admin Panel" : "Quick Links"}

                        </h5>

                        <ul className="footer-links">

                            <li><Link to="/">Home</Link></li>

                            {

                                admin ?

                                    <>

                                        <li><Link to="/admin-dashboard">Dashboard</Link></li>

                                        <li><Link to="/manage-products">Manage Products</Link></li>

                                        <li><Link to="/manage-categories">Manage Categories</Link></li>

                                    </>

                                    :

                                    <>

                                        <li><Link to="/shop">Shop</Link></li>

                                        <li><Link to="/about">About Us</Link></li>

                                        <li><Link to="/contact">Contact Us</Link></li>

                                    </>

                            }

                        </ul>

                    </div>

                    <div className="col-lg-4">

                        <h5 className="footer-title">
                            Contact
                        </h5>

                        <p className="footer-text">
                            bhargavadmin1@gmail.com
                        </p>

                        <p className="footer-text">
                            +91 8128359990
                        </p>

                        <p className="footer-text">
                            Gujarat, India
                        </p>

                    </div>

                </div>

                <hr className="footer-divider" />

                <div className="text-center footer-copy">

                    © {new Date().getFullYear()} ShopVerse.
                    All Rights Reserved.

                </div>

            </div>

        </footer>

    );
};

export default Footer;