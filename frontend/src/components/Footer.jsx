import { Link } from "react-router-dom";
import { isAdmin } from "../utils/auth";

const Footer = () => {
    const admin = isAdmin();

    return (
        <footer className="mt-5 py-5 bg-dark text-light">
            <div className="container">

                <div className="row">
                    <div className="col-md-4">
                        <h4>ShopVerse</h4>
                        <p>
                            Your one-stop destination for quality products,
                            secure shopping, and an effortless online experience.
                        </p>
                    </div>

                    <div className="col-md-4">
                        {
                            admin ? (
                                <>
                                    <h5>Admin Panel</h5>
                                    <ul className="list-unstyled">
                                        <li><Link className="nav-link" to="/">Home</Link></li>
                                        <li><Link className="nav-link" to="/manage-categories">Manage Categories</Link></li>
                                        <li><Link className="nav-link" to="/manage-products">Manage Products</Link></li>
                                        <li><Link className="nav-link" to="/admin-dashboard">Dashboard</Link></li>
                                    </ul>
                                </>
                            )
                                :
                                <>
                                    <h5>Quick Links</h5>
                                    <ul className="list-unstyled">
                                        <li><Link className="nav-link" to="/">Home</Link></li>
                                        <li><Link className="nav-link" to="/shop">Shop</Link></li>
                                        <li><Link className="nav-link" to="/about">About Us</Link></li>
                                        <li><Link className="nav-link" to="/contact">Contact Us</Link></li>
                                    </ul>
                                </>
                        }
                    </div>

                    <div className="col-md-4">
                        <h5>Contact</h5>
                        <p>Email : bhargav@shopverse.com</p>
                        <p>Phone : +91 8128359990</p>
                        <p>Location : Gujarat, India</p>
                    </div>
                </div>

                <hr />

                <div className="text-center">
                    © {new Date().getFullYear()} ShopVerse. All Rights Reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;