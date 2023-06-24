import React, { useState, useContext } from "react"
import { SuitHeart, SuitHeartFill } from "react-bootstrap-icons"
import "./style.css"

import Ctx from "../../ctx"

const LikeButton = ({ likes, _id, textRight = false }) => {
    const { setBaseData, api, userId, baseData} = useContext(Ctx)
    const [isLike, setIsLike] = useState(likes.includes(userId))
    const [isHovered, setIsHovered] = useState(false)

    const likeHandler = (newState, event) => {
        event.preventDefault()
        setIsLike(newState)
        api.setLike(_id, newState)
            .then((data) => {
                const updatedBaseData = baseData.map((product) => {
                    if (product._id === _id) {
                        return {
                            ...product,
                            likes: newState ? [...product.likes, userId] : product.likes.filter((id) => id !== userId)
                        }
                    }
                    return product
                })
                setBaseData(updatedBaseData)
            })
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <span
            onClick={(event) => {likeHandler(!isLike, event)}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{zIndex: "1", cursor: "pointer", position: "relative"}}
        >
            {isLike ? (
                <SuitHeartFill color={isHovered ? "black" : "red"} />
            ) : (
                <SuitHeart color={isHovered ? "black" : "red"} />
            )}
            {textRight && 
                <span className={`ms-2 ${isHovered ? 'hovered-text' : ''}`}>
                    {textRight}
                </span>}
        </span>
    )
}

export default LikeButton
