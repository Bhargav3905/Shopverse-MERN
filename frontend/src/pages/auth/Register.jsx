import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance'

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/api/user/register", {
                email,
                fullName,
                phone,
                password,
            })

            alert("Registration successful")
            navigate("/login")
        } catch (error) {
            if (error.response?.data?.redirectToLogin) {
                alert("Account already exists.\nYou can login now.");
                navigate("/login");
            } else {
                alert("Registration failed");
            }
        }
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">

                <div className="col-6 mt-5" style={{ border: "1px solid", padding: "60px", borderRadius: "35px" }}>

                    <h1 className='text-center'>Register Page</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
                            <div className="form-text">We'll never share your email with anyone else.</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" value={fullName} className="form-control" onChange={(e) => setFullName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="number" value={phone} className="form-control" onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
