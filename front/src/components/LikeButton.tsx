import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export type likeButtonType = 'like' | 'dislike'

interface LikeButtonProps {
    type: likeButtonType
    onClick: (e: any, type?: likeButtonType) => void
}

export const LikeButton: React.FC<LikeButtonProps> = (props) => {
    switch (props.type) {
        case 'like':
            return (
                <button
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="#16a34a"
                    className="bg-green-200 text-green-500  text-2xl rounded-full w-14 h-14 flex items-center justify-center"
                    onClick={props.onClick}
                >
                    <i className="fa-solid fa-thumbs-up"></i>
                </button>
            )
        case 'dislike':
            return (
                <button
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="#dc2626"
                    className="bg-red-200 text-red-500 text-2xl rounded-full w-14 h-14 flex items-center justify-center"
                    onClick={props.onClick}
                >
                    <i className="fa-solid fa-thumbs-down"></i>
                </button>
            )
        default:
            return null
    }
}
