import { useNavigate } from 'react-router-dom'
import { isAdmin } from "../utils/auth";
import { IMAGE_URL } from '../utils/helper'

const Card = ({ item, handleAddToCart }) => {

    const navigate = useNavigate();
    const admin = isAdmin();

    const handleProductDetail = (item) => {
        navigate(`/shop/${item._id}`);
    }

    return (
        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">

            <img src={`${IMAGE_URL}${item.image}`} className="card-img-top" alt={item.productName}
                style={{ height: "220px", objectFit: "cover", transition: "0.35s" }} />

            <div className="card-body d-flex flex-column">

                <h5 className="card-title">{item.productName}</h5>

                <p className="card-text text-muted flex-grow-1" style={{ minHeight: "55px" }}>
                    {item.description.length > 70 ? item.description.substring(0, 70) + "..." : item.description}
                </p>

                <h5 className="fw-bold text-success mb-3">₹ {item.price}</h5>

                <div className="d-flex gap-2 mt-auto">
                    {!admin && (
                        <button className="btn btn-custom-primary flex-fill" onClick={() => handleAddToCart(item._id)}>
                            Add to Cart
                        </button>
                    )}

                    <button className="btn btn-warning px-4" onClick={() => handleProductDetail(item)}>
                        View
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Card
