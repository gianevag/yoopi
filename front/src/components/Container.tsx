import { ChangeEvent, useReducer, useState } from 'react'
import { Input, InputType } from './Input'
import { LikeButton, likeButtonType } from './LikeButton'
import { LinkButton, LinkButtonType } from './LinkButton'
import { Logo } from './Logo'
import { POST } from '../request/post.js'
import { toast } from 'react-toastify'

import axios from 'axios'

interface negativeFormInputsType {
    overall: number
    service: number
    food: number
    reviewtext: string | null
}

interface initialStateType {
    likeButtonClicked: boolean
    dislikeButtonClicked: boolean
    googleButtonClicked: boolean
    tripAdvisorButtonClicked: boolean
    submitButtonClicked: boolean
    showLikeDislikeButtons: boolean
    showThankYou: boolean
    showLikeForm: boolean
    showDisLikeForm: boolean
    emailIsValid: boolean
    emailText: string | null
    checkEmailList: boolean
    negativeFormInput: negativeFormInputsType
}

enum ACTIONS {
    LIKEDCLICKED = 'likeButtonClicked',
    DISLIKEDCLICKED = 'dislikeButtonClicked',
    GOOGLECLICKED = 'googleButtonClicked',
    TRIPADVISORCLICKED = 'tripAdvisorButtonClicked',
    SUBMITFORM = 'submitform',
    SETEMAIL = 'set_email',
    SETCHECKMAILLIST = 'set_check_mail_list',
    SETOVERALL = 'set_overall',
    SETSERVICE = 'set_service',
    SETFOOD = 'set_food',
    SETREVIEWTEXT = 'set_review_text',
}

interface action {
    type: ACTIONS
    payload?: any
}

const initialState: initialStateType = {
    likeButtonClicked: false,
    dislikeButtonClicked: false,
    googleButtonClicked: false,
    tripAdvisorButtonClicked: false,
    submitButtonClicked: false,
    showLikeDislikeButtons: true,
    showLikeForm: false,
    showDisLikeForm: false,
    showThankYou: false,
    emailIsValid: true,
    emailText: null,
    checkEmailList: false,
    negativeFormInput: {
        overall: 1,
        service: 1,
        food: 1,
        reviewtext: null,
    },
}

const reducer = (state: initialStateType, action: action) => {
    switch (action.type) {
        case ACTIONS.LIKEDCLICKED:
            return {
                ...state,
                likeButtonClicked: true,
                showLikeDislikeButtons: false,
                showLikeForm: true,
            }
        case ACTIONS.DISLIKEDCLICKED:
            return {
                ...state,
                dislikeButtonClicked: true,
                showLikeDislikeButtons: false,
                showDisLikeForm: true,
            }
        case ACTIONS.GOOGLECLICKED:
            return {
                ...initialState,
                showLikeDislikeButtons: false,
                showThankYou: true,
                googleButtonClicked: true,
            }
        case ACTIONS.TRIPADVISORCLICKED:
            return {
                ...initialState,
                showLikeDislikeButtons: false,
                showThankYou: true,
                tripAdvisorButtonClicked: true,
            }
        case ACTIONS.SUBMITFORM:
            return {
                ...initialState,
                showLikeDislikeButtons: false,
                showThankYou: true,
                submitButtonClicked: true,
            }
        case ACTIONS.SETEMAIL:
            const reqex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
            const isValid = reqex.test(action.payload)
            return {
                ...state,
                emailIsValid: isValid,
                emailText: isValid ? action.payload : null,
            }
        case ACTIONS.SETCHECKMAILLIST:
            return {
                ...state,
                checkEmailList: action.payload,
            }
        case ACTIONS.SETOVERALL:
            return {
                ...state,
                negativeFormInput: {
                    ...state.negativeFormInput,
                    overall: action.payload,
                },
            }
        case ACTIONS.SETSERVICE:
            return {
                ...state,
                negativeFormInput: {
                    ...state.negativeFormInput,
                    service: action.payload,
                },
            }
        case ACTIONS.SETFOOD:
            return {
                ...state,
                negativeFormInput: {
                    ...state.negativeFormInput,
                    food: action.payload,
                },
            }
        case ACTIONS.SETREVIEWTEXT:
            return {
                ...state,
                negativeFormInput: {
                    ...state.negativeFormInput,
                    reviewtext: action.payload,
                },
            }
        default:
            throw new Error()
    }
}

export const Container = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const butttonHandler = async (
        type?: likeButtonType | LinkButtonType | 'submitForm'
    ) => {
        let data = {}
        switch (type) {
            case 'like':
                dispatch({ type: ACTIONS.LIKEDCLICKED })
                break
            case 'dislike':
                dispatch({ type: ACTIONS.DISLIKEDCLICKED })
                break
            case 'google':
                data = {
                    email: state.emailText,
                    experience: 'positive',
                    subToMailList: state.checkEmailList,
                    clickedGoogle: true,
                }

                axios({ ...POST.GOOGLE_REVIEW, data })
                    .then((res) => {
                        window.location.href = res?.data?.redirect
                        dispatch({ type: ACTIONS.GOOGLECLICKED })
                    })
                    .catch((e) => {
                        toast.error(
                            e?.response?.data?.message || 'Something goes wrong'
                        )
                    })

                break
            case 'tripadvisor':
                data = {
                    email: state.emailText,
                    experience: 'positive',
                    subToMailList: state.checkEmailList,
                    clickedTripadvison: true,
                }

                axios({ ...POST.TRIPADVISOR_REVIEW, data })
                    .then((res) => {
                        window.location.href = res?.data?.redirect
                        dispatch({ type: ACTIONS.TRIPADVISORCLICKED })
                    })
                    .catch((e) => {
                        toast.error(
                            e?.response?.data?.message || 'Something goes wrong'
                        )
                    })
                break
            case 'submitForm':
                data = {
                    email: state.emailText,
                    experience: 'negative',
                    subToMailList: state.checkEmailList,
                    submitedForm: true,
                    negativeFormInputs: state.negativeFormInput,
                }
                console.log(data)
                axios({ ...POST.NEGATIVE_REVIEW, data })
                    .then(() => {
                        dispatch({ type: ACTIONS.SUBMITFORM })
                    })
                    .catch((e) => {
                        toast.error(
                            e?.response?.data?.message || 'Something goes wrong'
                        )
                    })
                break
            default:
                break
        }
    }

    const inputHandler = (
        e: ChangeEvent<HTMLInputElement>,
        type: InputType
    ) => {
        switch (type) {
            case 'email':
                dispatch({
                    type: ACTIONS.SETEMAIL,
                    payload: e.target.value,
                })
                break
            case 'checkbox':
                dispatch({
                    type: ACTIONS.SETCHECKMAILLIST,
                    payload: e.target.checked,
                })
                break
            default:
                break
        }
    }

    return (
        <div className="mt-6 flex justify-center">
            <div
                className="bg-teal-50 p-10 rounded-lg"
                style={{ maxWidth: '460px' }}
            >
                <div className="flex flex-col">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>

                    {state.showLikeDislikeButtons && (
                        <>
                            <p className="text-gray-500 mb-4 text-lg text-center ">
                                How was your expirience in Hellas Your
                                Tastynation Restaurant?
                            </p>

                            <div className="flex justify-center gap-12">
                                <LikeButton
                                    type="like"
                                    onClick={() => butttonHandler('like')}
                                />
                                <LikeButton
                                    type="dislike"
                                    onClick={() => butttonHandler('dislike')}
                                />
                            </div>
                        </>
                    )}

                    {state.showLikeForm && (
                        <>
                            <p className="text-gray-500 text-lg text-center mb-6">
                                Leaving a review and you will receive a{' '}
                                <b>10% discount coupon </b>
                                for the next visit to our restaurant.*
                            </p>

                            <div className="mb-20">
                                <Input
                                    type="email"
                                    onChange={(e) => inputHandler(e, 'email')}
                                    isValid={state.emailIsValid}
                                />
                                <br />
                                <Input
                                    type="checkbox"
                                    onChange={(e) =>
                                        inputHandler(e, 'checkbox')
                                    }
                                />
                            </div>

                            <LinkButton
                                onClick={() => butttonHandler('google')}
                            >
                                <>
                                    <span className="mr-2">
                                        <img
                                            className="inline-block h-6"
                                            src="/icons/googleIcon.png"
                                            alt="tripadvisorIcon"
                                        />
                                    </span>
                                    Write a Review on Google
                                </>
                            </LinkButton>
                            <div className="mt-2">
                                <LinkButton
                                    onClick={() =>
                                        butttonHandler('tripadvisor')
                                    }
                                >
                                    <>
                                        <span className="mr-2">
                                            <img
                                                className="bg-teal-500 rounded-full inline-block h-6"
                                                src="/icons/tripadvisorIcon.svg"
                                                alt="tripadvisorIcon"
                                            />
                                        </span>
                                        Write a Review on Tripadvisor
                                    </>
                                </LinkButton>
                            </div>

                            <p className="text-xs text-gray-400 mt-6">
                                *Coupon is valid from 19:00 until 20:00 for the
                                next visit to our restaurant.
                            </p>
                        </>
                    )}

                    {state.showDisLikeForm && (
                        <>
                            <p className="text-gray-500 text-lg text-center mb-6">
                                Your feedback is important for us, answer
                                following questions and you will receive a{' '}
                                <b>10% discount coupon </b>
                                for the next visit to our restaurant.*
                            </p>

                            <Input
                                type="starReview"
                                starReviewType="overall"
                                onChange={(data) =>
                                    dispatch({
                                        type: ACTIONS.SETOVERALL,
                                        payload: data,
                                    })
                                }
                            />
                            <Input
                                type="starReview"
                                starReviewType="service"
                                onChange={(data) =>
                                    dispatch({
                                        type: ACTIONS.SETSERVICE,
                                        payload: data,
                                    })
                                }
                            />
                            <Input
                                type="starReview"
                                starReviewType="food"
                                onChange={(data) =>
                                    dispatch({
                                        type: ACTIONS.SETFOOD,
                                        payload: data,
                                    })
                                }
                            />

                            <div className="mt-6">
                                <Input
                                    type="textarea"
                                    onChange={(data) =>
                                        dispatch({
                                            type: ACTIONS.SETREVIEWTEXT,
                                            payload: data.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="mt-20">
                                <Input
                                    type="email"
                                    onChange={(e) => inputHandler(e, 'email')}
                                    isValid={state.emailIsValid}
                                />
                                <br />
                                <Input
                                    type="checkbox"
                                    onChange={(e) =>
                                        inputHandler(e, 'checkbox')
                                    }
                                />
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="#9ca3af"
                                    className="text-gray-500 font-bold text-center text-sm py-2 px-4 rounded-lg border border-gray-300 w-full"
                                    onClick={() => butttonHandler('submitForm')}
                                >
                                    Send your Review
                                </button>
                            </div>

                            <p className="text-xs text-gray-400 mt-6">
                                *Coupon is valid from 19:00 until 20:00 for the
                                next visit to our restaurant.
                            </p>
                        </>
                    )}

                    {state.showThankYou && (
                        <div className="flex justify-center">
                            <img
                                className="w-1/2 my-4"
                                src="/logo/Thank_You.svg"
                                alt="thank you"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
