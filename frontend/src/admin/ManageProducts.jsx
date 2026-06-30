import { useState, useRef, useEffect } from 'react'
import axiosInstance from '../services/axiosInstance';

const ManageProducts = () => {

    const fileInputRef = useRef(null);

    const [products, setProducts] = useState([])
    const [editId, setEditId] = useState()
    const [categories, setCategories] = useState([])

    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        image: null,
        description: "",
        price: 0
    })

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/api/products/list-product")
            setProducts(response.data.products)
        } catch (error) {
            alert.log("Error fetching products: ", error);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // help to manage images like key-value pair
        const form = new FormData();

        form.append("productName", formData.productName)
        form.append("image", formData.image)
        form.append("description", formData.description)
        form.append("price", formData.price)
        form.append("category", formData.category)

        try {

            if (editId) {
                const response = await axiosInstance.put(`/api/products/edit-product/${editId}`, form)
                alert(response.data.message)
            } else {
                const response = await axiosInstance.post('/api/products/add-product', form)
                alert(response.data.message)
            }
            setEditId(null);

            // to reset the form
            setFormData({
                productName: "",
                category: "",
                image: null,
                description: "",
                price: ""
            })
            // not directly the image - prototype clear, need useRef
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
            // to update table
            fetchProducts()
        } catch (error) {
            alert.log("Error", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/products/delete-product/${id}`)
            alert(response.data.message)
            fetchProducts()
        } catch (error) {
            alert("Error", error);
        }
    }

    const handleEdit = (product) => {
        setEditId(product._id)

        setFormData({
            productName: product.productName,
            image: null,
            description: product.description,
            price: product.price,
            category: product.category?._id
        })
    }

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get("/api/category/list-category")
            setCategories(response.data.category);
        } catch (error) {
            alert("Error fetching iecategors: ", error);
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <>

            <div className="container py-4">
                <h1>Manage Products</h1>

                <form onSubmit={handleSubmit}>
                    <label>Product Name:</label>
                    <input value={formData.productName} className='form-control' type="text" name="productName" required
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })} />
                    <br />

                    <label><b>Select Category</b></label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className='form-control'>
                        <option value="">Select Category</option>
                        {
                            categories?.map((item) => (
                                <option value={item._id} key={item._id}>{item.categoryName}</option>
                            ))
                        }
                    </select>

                    <label>Image:</label>
                    <input ref={fileInputRef} className='form-control' type="file" name="image"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                    <br />

                    <label>Description:</label>
                    <textarea value={formData.description} className='form-control' name="description" required
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                    <br />

                    <label>Price:</label>
                    <input value={formData.price} className='form-control' type="number" name="price" required
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    <br />

                    <button className='btn btn-primary' type="submit">{editId ? "Update Product" : "Add Product"}</button>
                </form>

                <div className="table-responsive mt-4">
                    <table className="table table-striped table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.productName}</td>
                                    <td>
                                        <img
                                            src={`http://localhost:3000/uploads/${item.image}`}
                                            alt={item.productName} width="70" height="90"
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "4px"
                                            }}
                                        />
                                    </td>
                                    <td>{item.category?.categoryName}</td>
                                    <td>{item.description}</td>
                                    <td>Rs {item.price}</td>
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

export default ManageProducts
