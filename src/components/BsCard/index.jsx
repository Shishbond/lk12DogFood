import { useContext } from "react"
import {Link} from "react-router-dom"
import LikeButton from "../LikeButton"

import Ctx from "../../ctx"
import "./style.css"

const BsCard = ({
    discount,
    likes,
    name,
    pictures,
    price,
    _id,
    stock
}) => {
    const {userId, basket, setBasket} = useContext(Ctx)
    const inBasket = basket.filter(el => _id === el.id).length > 0

    const addToBasket = !inBasket && stock > 0
        ? (event) => {
            event.preventDefault()
            event.stopPropagation()
            setBasket(prev => [...prev,{
                id: _id,
                price,
                discount,
                cnt: 1
            }])
        }
        : (() => {})

    return <>
        <div id={"pro_" + _id} className="product-container">
            {userId && (
                <div className="like-button">
                    <LikeButton likes={likes} _id={_id}/>
                </div>
            )}
            <div className="image-container">
                <img src={pictures} alt={name}/>
                <Link to={`/product/${_id}`} className="card-link"></Link>
            </div>
            <div >
                <h4 className="price">{price} ₽</h4>
                <p className="name">{name}</p>
                {stock
                    ?
                        <button
                            className={`${!inBasket 
                                ? "button-buy"
                                : "button-toCard"} position-relative`
                            }
                            onClick={addToBasket}
                        >
                            {!inBasket
                                    ? "Купить"
                                    : <>
                                        Перейти в корзину
                                        <Link to={`/basket`} className="card-link"></Link>
                                    </>}
                        </button>
                    : <div className="text-center w-100 pt-1 pb-1 text-danger text-waiting">
                        Скоро будет!
                    </div>
                }
            </div>
        </div>
    </>
}

export default BsCard