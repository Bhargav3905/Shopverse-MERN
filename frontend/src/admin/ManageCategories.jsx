import { useState, useRef, useEffect } from 'react'
import axiosInstance from '../services/axiosInstance';
import { IMAGE_URL } from "../utils/helper";

const ManageCategories = () => {

    const fileInputRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState()

    const [formData, setFormData] = useState({
        categoryName: "",
        image: null
    })

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get("/api/category/list-category")
            setCategories(response.data.category);
        } catch (error) {
            alert.log("Error fetching iecategors: ", error);
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append("categoryName", formData.categoryName)
        form.append("image", formData.image)

        try {

            if (editId) {
                const response = await axiosInstance.put(`/api/category/edit-category/${editId}`, form)
                alert(response.data.message)
            } else {
                const response = await axiosInstance.post('/api/category/add-category', form)
                alert(response.data.message)
            }
            setEditId(null);

            setFormData({
                categoryName: "",
                image: null
            })
            
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
            
            fetchCategory()
        } catch (error) {
            alert.log("Error", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/category/delete-category/${id}`)
            alert(response.data.message)
            fetchCategory()
        } catch (error) {
            alert("Error", error);
        }
    }

    const handleEdit = (category) => {
        setEditId(category._id)

        setFormData({
            categoryName: category.categoryName,
            image: null,
        })
    }

    return (
        <>

            <div className="container py-4">

                <div className="mb-5">

                    <h1 className="section-title fw-bold">
                        Manage Categories
                    </h1>

                    <p className="text-muted">
                        Create, update and organize product categories.
                    </p>

                </div>

                <div className="card border-0 shadow-sm mb-5">

                    <div className="card-body p-4">

                        <h4 className="fw-bold mb-4">
                            {editId ? "Update Category" : "Add New Category"}
                        </h4>

                        <form onSubmit={handleSubmit}>
                            <label>Category Name:</label>
                            <input value={formData.categoryName} className='form-control' type="text" name="categoryName" required
                                onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })} />
                            <br />

                            <label>Image:</label>
                            <input ref={fileInputRef} className='form-control' type="file" name="image"
                                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                            <br />

                            <button className="btn btn-custom-primary rounded-pill px-4" type="submit">{editId ? "Update Category" : "Add Category"}</button>
                        </form>

                    </div>

                </div>

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h4 className="fw-bold mb-0">
                                Category List
                            </h4>

                            <span className="badge bg-success">
                                {categories.length} Categories
                            </span>

                        </div>

                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Category Name</th>
                                        <th>Image</th>
                                        <th style={{ width: "170px" }}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories.map((item, index) => (
                                        <tr key={item._id}>
                                            <th>{index + 1}</th>
                                            <td>{item.categoryName}</td>
                                            <td>
                                                <img
                                                    src={`${IMAGE_URL}/${item.image}`}
                                                    alt={item.categoryName} width="70" height="90"
                                                    style={{
                                                        width: "70px",
                                                        height: "70px",
                                                        objectFit: "cover",
                                                        borderRadius: "12px"
                                                    }}
                                                />
                                            </td>
                                            <td>

                                                <div className="d-flex gap-2 flex-nowrap">

                                                    <button
                                                        type="button"
                                                        className="btn btn-warning btn-sm rounded-pill px-3"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                                        onClick={() => handleDelete(item._id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ManageCategories
