import { StarFill, StarHalf, Star } from "react-bootstrap-icons"

const RatingStatic = ({ rating = 0, isAnimationEnabled = false }) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(
                <StarFill
                    key={i}
                    className={`star ${isAnimationEnabled ? "" : "no-animation"}`}
                />
            )
        } else if (hasHalfStar && i === fullStars) {
            stars.push(
                <StarHalf
                    key={i}
                    className={`star ${isAnimationEnabled ? "" : "no-animation"}`}
                />
            )
        } else {
            stars.push(
                <Star
                    key={i}
                    className={`star ${isAnimationEnabled ? "" : "no-animation"}`}
                />
            )
        }
    }

    return stars
}

export default RatingStatic