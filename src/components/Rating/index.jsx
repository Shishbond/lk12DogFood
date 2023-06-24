import React, { useState } from 'react'
import { StarFill, Star } from "react-bootstrap-icons"


const Rating = ({ rating = 0, isAnimationEnabled = false, onChange, onChangeError }) => {
    const [selectedRating, setSelectedRating] = useState(rating)

    const handleClick = (selected) => {
        setSelectedRating(selected + 1)
        onChange(selected + 1)
        onChangeError(false)
    }

    const stars = []

    for (let i = 0; i < 5; i++) {
        if (i < selectedRating) {
            stars.push(
                <StarFill
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`star ${isAnimationEnabled ? "" : "no-animation"}`}
                />
        )
        } else {
            stars.push(
                <Star
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`star ${isAnimationEnabled ? "" : "no-animation"}`}
                />
            )
        }
    }

    return <div style={{cursor: "pointer"}}>{stars}</div>
}

export default Rating