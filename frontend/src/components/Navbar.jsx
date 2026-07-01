import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../utils/auth";

const Navbar = () => {

    const navigate = useNavigate();
    const admin = isAdmin();
    const loggedIn = isLoggedIn();

    const location = useLocation();
    const isProductDetail = location.pathname.startsWith("/shop/");

    const handleSignUp = () => {
        navigate("/register")
    }

    const handleSignIn = () => {
        navigate("/login")
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login", { replace: true });
        window.location.reload();
    }

    return (
        <div className="sticky-top pt-3">
            <div className="container">

                <nav className="navbar navbar-expand-lg custom-navbar">

                    <div className="container-fluid">

                        <Link className="navbar-brand brand-logo" to="/">
                            ShopVerse
                        </Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse align-items-center" id="navbarNavDropdown">

                            <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-3">

                                <li className="nav-item">
                                    <Link className={`nav-link nav-custom-link ${location.pathname === "/" ? "active-link" : ""}`} to="/">Home</Link>
                                </li>

                                {
                                    admin ?
                                        <>
                                            <li className="nav-item">
                                                <Link className={`nav-link nav-custom-link ${location.pathname === "/admin-dashboard" ? "active-link" : ""}`} to="/admin-dashboard">Dashboard</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className={`nav-link nav-custom-link ${location.pathname === "/manage-products" ? "active-link" : ""}`} to="/manage-products">Manage Products</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className={`nav-link nav-custom-link ${location.pathname === "/manage-categories" ? "active-link" : ""}`} to="/manage-categories">Manage Categories</Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className="nav-item">
                                                <Link className={`nav-link nav-custom-link ${location.pathname === "/shop" ? "active-link" : ""}`} to="/shop">Shop</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className={`nav-link nav-custom-link ${location.pathname === "/about" ? "active-link" : ""}`} to="/about">About Us</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className={`nav-link nav-custom-link ${location.pathname === "/contact" ? "active-link" : ""}`} to="/contact">Contact Us</Link>
                                            </li>
                                        </>
                                }

                            </ul>

                            <div className="d-flex align-items-center gap-3 nav-actions">

                                {
                                    loggedIn && !isProductDetail && !admin &&
                                    <Link to="/add-to-cart">
                                        <img src="/addToCart.svg" alt="cart" className="nav-icon" />
                                    </Link>
                                }
                                {
                                    loggedIn && !isProductDetail &&
                                    <Link to={'/profile'}>
                                        <img src="/profile.svg" alt="profile" className="nav-icon" />
                                    </Link>
                                }

                                {loggedIn ? <button className="btn btn-outline-danger rounded-pill px-4" onClick={handleLogout}>Logout</button>
                                    :
                                    <>
                                        <button className="btn btn-outline-primary rounded-pill px-4" onClick={handleSignUp}>Sign Up</button>
                                        <button className="btn btn-primary-custom rounded-pill px-4" onClick={handleSignIn}>Sign In</button>
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
