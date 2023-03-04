import React, { ChangeEvent } from 'react'
import { StarReview } from './StarReview'

export type InputType =
    | 'email'
    | 'text'
    | 'password'
    | 'checkbox'
    | 'starReview'
    | 'textarea'

interface InputProps {
    type: InputType
    isValid?: boolean
    starReviewType?: 'overall' | 'service' | 'food'
    onChange: (e: any, type?: InputType) => void
}

export const Input: React.FC<InputProps> = (props) => {
    switch (props.type) {
        case 'email':
            return (
                <>
                    <label
                        className={`${
                            props.isValid ? 'text-gray-500' : 'text-red-500'
                        } block mb-2 text-sm font-medium `}
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        className={`${
                            props.isValid
                                ? 'border-gray-300 focus:border-sky-200'
                                : 'border-red-500 focus:border-red-500'
                        } bg-gray-50 border  text-gray-900 focus:outline-none focus:border-2  text-sm rounded-lg block w-full p-2.5`}
                        placeholder="Email..."
                        onBlur={(e) => props.onChange(e, props.type)}
                    />
                    {!props.isValid && (
                        <span className="text-xs text-red-500">
                            *Email is required
                        </span>
                    )}
                </>
            )
        case 'checkbox':
            return (
                <div className="flex flex-row">
                    <div className="flex h-5 items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            onChange={(e) => props.onChange(e, props.type)}
                        />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-bold text-gray-600">
                            Get +5% discount 💸
                        </p>
                        <label className="text-sm font-sm text-gray-500">
                            Never miss an offer! Join our mail list 🔥
                        </label>
                    </div>
                </div>
            )
        case 'starReview':
            return (
                <div className="flex flex-row mb-4">
                    <div className="flex w-20">
                        <span className="font-bold text-gray-500 capitalize pt-1">
                            {props.starReviewType}
                        </span>
                    </div>
                    <div className="ml-3">
                        <StarReview
                            selectedStar={(rating) => props.onChange(rating)}
                        />
                    </div>
                </div>
            )
        case 'textarea':
            return (
                <>
                    <label className="block mb-2 font-bold text-gray-500">
                        Review
                    </label>
                    <textarea
                        rows={5}
                        className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-2 focus:border-sky-200 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Write your expirence, your meal, service, atmosphere?"
                        onChange={(e) => props.onChange(e, props.type)}
                    />
                </>
            )
        default:
            return null
    }
}
