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
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">
                        ShopVerse
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse gap-3" id="navbarNavDropdown">

                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>

                            {
                                admin ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin-dashboard">Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/manage-products">Manage Products</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/manage-categories">Manage Categories</Link>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/shop">Shop</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/about">About Us</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/contact">Contact Us</Link>
                                        </li>
                                    </>
                            }

                        </ul>

                        <div className="d-flex gap-2">

                            {
                                loggedIn && !isProductDetail && !admin &&
                                <Link to="/add-to-cart">
                                    <img src="/addToCart.svg" alt="cart" style={{ width: 30, height: 35 }} />
                                </Link>
                            }
                            {
                                loggedIn && !isProductDetail &&
                                <Link to={'/profile'}>
                                    <img src="/profile.svg" alt="profile" style={{ width: "30px", height: "35px" }} />
                                </Link>
                            }

                            {loggedIn ? <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                :
                                <>
                                    <button className="btn btn-outline-success" onClick={handleSignUp}>Sign Up</button>
                                    <button className="btn btn-success" onClick={handleSignIn}>Sign In</button>
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
