import { useState } from 'react'
import axiosInstance from '../services/axiosInstance';
import toast from "react-hot-toast";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
            toast.error("Please fill all fields.");
            setLoading(false);
            return;
        }

        let id;
        try {
            id = toast.loading("Sending message...");
            const response = await axiosInstance.post("/api/contacts/contact", formData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            toast.dismiss(id);
            setLoading(false);
        }
    }

    return (
        <div className="container">

            <h1 className="page-title text-center mb-5">Contact Us</h1>

            <div className="row g-5 align-items-start">

                <div className="col-lg-6">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d66318.58560081976!2d73.18431094748757!3d22.33234581045427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1782052580162!5m2!1sen!2sin"
                        width="100%" height="500" style={{ border: 0, borderRadius: "20px" }}
                        loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
                </div>

                <div className="col-lg-6">
                    <form className="surface p-4 p-lg-5" onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" minLength={3} className="form-control" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-control" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Subject</label>
                            <input type="text" minLength={5} className="form-control" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Message</label>
                            <textarea rows="5" minLength={10} className="form-control" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                        </div>

                        <button type="submit" className="btn btn-primary-custom" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Sending...
                                </>
                            ) : (
                                "Send Message"
                            )}
                        </button>

                    </form>
                </div>

            </div>

        </div>
    )
}

export default Contact
