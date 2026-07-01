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
        <div className="container">
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold brand-logo" to="/">
                        ShopVerse
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse align-items-center" id="navbarNavDropdown">

                        <ul className="navbar-nav me-auto align-items-lg-center gap-lg-2">

                            <li className="nav-item">
                                <Link className="nav-link nav-link-custom" to="/">Home</Link>
                            </li>

                            {
                                admin ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-custom" to="/admin-dashboard">Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-custom" to="/manage-products">Manage Products</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-custom" to="/manage-categories">Manage Categories</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-custom" to="/shop">Shop</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-custom" to="/about">About Us</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-link-custom" to="/contact">Contact Us</Link>
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

                            {loggedIn ? <button className="btn btn-custom-danger" onClick={handleLogout}>Logout</button>
                                :
                                <>
                                    <button className="btn btn-custom-outline" onClick={handleSignUp}>Sign Up</button>
                                    <button className="btn btn-custom-primary" onClick={handleSignIn}>Sign In</button>
                                </>
                            }
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
