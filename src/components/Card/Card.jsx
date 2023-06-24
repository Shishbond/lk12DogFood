import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {SuitHeart, SuitHeartFill} from "react-bootstrap-icons"
import "./card.css";
import Ctx from "../../ctx";


const Card = ({
    discount,
    likes,
    name,
    pictures,
    price,
    tags,
    _id, 
    user
}) => {
    const {setBaseData, basket, setBasket} = useContext(Ctx)
    const [isLike, setIsLike] = useState(likes?.includes(user) || []);
    const inBasket = basket.filter(el => _id === el.id).length > 0;

    const likeHandler = () => {
        setIsLike(!isLike);
        setBaseData((old) => old.map(el => {
            
            if (el._id === _id) {
                
                isLike 
                
                ? el.likes = el.likes.filter(lk => lk !== user)
                
                : el.likes.push(user);
            }
            return el;
        }))
    }
    const addToBasket = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setBasket(prev => [...prev, {
            id: _id,
            price,
            discount,
            cnt: 1
        }])
    }
    return <div className="card-lite" id={"pro_" + _id}>
        {likes && <span className="card-like" onClick={likeHandler}>
            {isLike ? <SuitHeartFill/> : <SuitHeart/>}
        </span>}
        <img src={pictures} alt={name}/>
        <h4>{price} ₽</h4>
        <p>{name}</p>
        <button
            disabled={inBasket}
            onClick={addToBasket}
        >Купить</button>
        <Link to={`/product/${_id}`} className="card-link"></Link>
    </div>
}

export default Card;