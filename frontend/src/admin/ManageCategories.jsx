import { useState, useRef, useEffect } from 'react'
import axiosInstance from '../services/axiosInstance';

const ManageCategories = () => {

    const fileInputRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState()

    const [formData, setFormData] = useState({
        categoryName: "",
        image: null
    })

    const fetchCategory= async () => {
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

        // help to manage images like key-value pair
        const form = new FormData();

        form.append("categoryName", formData.categoryName)
        form.append("image", formData.image)

        try {

            if(editId) {
                const response = await axiosInstance.put(`/api/category/edit-category/${editId}`, form)
                alert(response.data.message)
            } else {
                const response = await axiosInstance.post('/api/category/add-category', form)
                alert(response.data.message)
            }
            setEditId(null);

            // to reset the form
            setFormData({
                categoryName: "",
                image: null
            })
            // not directly the image - prototype clear, need useRef
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
            // to update table
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
                <h1>Manage Categories</h1>

                <form onSubmit={handleSubmit}>
                    <label>Category Name:</label>
                    <input value={formData.categoryName} className='form-control' type="text" name="categoryName" required
                        onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })} />
                    <br />

                    <label>Image:</label>
                    <input ref={fileInputRef} className='form-control' type="file" name="image"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                    <br />

                    <button className='btn btn-primary' type="submit">{editId ? "Update Category" : "Add Category"}</button>
                </form>

                <div className="table-responsive mt-4">
                    <table className="table table-striped table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Category Name</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.categoryName}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:3000/uploads/${item.image}`}
                                            alt={item.categoryName} width="70" height="90"
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "4px"
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item)}>Edit</button>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default ManageCategories
