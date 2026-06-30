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
        <div className="card" style={{ width: "18rem" }}>
            <img src={`${IMAGE_URL}${item.image}`} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{item.productName}</h5>
                <p className="card-text">{item.description}</p>
                <p>₹ {item.price}</p>
                {
                    !admin &&
                    <button className='btn btn-primary m-2' onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
                }
                <button className='btn btn-warning' onClick={() => handleProductDetail(item)}>View</button>
            </div>
        </div>
    )
}

export default Card
