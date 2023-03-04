import React, { useState } from 'react'

interface StarReviewProps {
    selectedStar?: (rate: number) => void
}

export const StarReview: React.FC<StarReviewProps> = (props) => {
    const [rating, setRating] = useState(1)

    const handleClick = (index: number) => {
        props.selectedStar && props.selectedStar(index)
        setRating(index)
    }

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                index += 1
                return (
                    <button
                        type="button"
                        key={index}
                        className="mr-4"
                        onClick={() => handleClick(index)}
                    >
                        <i
                            className={
                                (index <= rating ? 'fa-solid ' : 'fa-regular') +
                                ' fa-star text-lg text-amber-300'
                            }
                        ></i>
                    </button>
                )
            })}
        </div>
    )
}
