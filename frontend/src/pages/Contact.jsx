import { useState } from 'react'
import axiosInstance from '../services/axiosInstance';

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/api/contacts/contact", formData);
            alert(response.data.message);
        } catch (error) {
            alert("Error", error.response.data.message);
        }
    }

    return (
        <div className="container">

            <h1 className='text-center'>Contact Us</h1>

            <div className="d-flex">
                <div className='col-6 align-self-center p-5'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d66318.58560081976!2d73.18431094748757!3d22.33234581045427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1782052580162!5m2!1sen!2sin" width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <form className='col-6 p-5' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input onChange={(e) => setFormData({ ...formData, subject: e.target.value })} type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact
