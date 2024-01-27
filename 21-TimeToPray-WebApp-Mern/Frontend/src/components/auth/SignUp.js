import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools';
import { useState } from "react";
import { useMutation } from '@tanstack/react-query'

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMosque } from '@fortawesome/free-solid-svg-icons'

import styles from './auth.module.css'
import {createUser} from './authAPI'


export default function SignUp() {
    console.log('signup');

    const navigate = useNavigate()
    const [validationError] = useState({ value: false, message: '' })
    const { register, control, handleSubmit, formState } = useForm()
    const { errors } = formState

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            navigate('/')
        }
    })

    const onSubmit = (formData) => {
        // if (data.password !== data.confirmPassword) {
        //     setValidationError({
        //         ...validationError,
        //         value: true,
        //         message: "Password & Confirm Password should be same."
        //     })
        // }
        // else {
        //     setValidationError({
        //         ...validationError,
        //         value: false,
        //         message: ''
        //     })
        //     console.log(data)
        //     // console.log(isNaN(data.name));
        // }
        mutate(formData)
    }
    // console.log(validationError);

    return <>
     <div className={styles.showcaseArea}></div>

        <div className={styles.wrapper}>
        <div className=" min-h-full flex-1 flex justify-center items-center px-6 py-12 lg:px-8 h-[100vh]">

            {/* Heading */}
            <div className="w-[600px]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm grid justify-items-center">
                    <FontAwesomeIcon icon={faMosque} className="text-white h-11" />
                    <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-100">
                        Create new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-100">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    className={!errors.name === true ? 'inputStyle' : 'inputStyleError'}
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        validate: (fieldValue) => {
                                            return fieldValue === "admin" ? "This name is not allowed" : null
                                        },
                                        validate1: (fieldValue) => {
                                            return !isNaN(fieldValue) ? "Numbers not allowed as name" : null
                                        }
                                    })}
                                />
                            </div>
                            {errors.name && <p className="text-red-500"><ExclamationTriangleIcon className="w-4 h-4 mx-1 inline-block" />{errors.name.message}</p>}
                        </div>

                        {/* email-field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-100">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    className={!errors.email === true ? 'inputStyle' : 'inputStyleError'}
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        pattern: {
                                            value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                            message: "Invalid email format"
                                        },
                                        validate: (fieldValue) => {
                                            return fieldValue === "admin@email.com" ? "This email address is not allowed" : null
                                        }
                                    })}
                                />
                            </div>
                            {errors.email && <p className="text-red-500"><ExclamationTriangleIcon className="w-4 h-4 mx-1 inline-block" />{errors.email.message}</p>}
                        </div>

                        {/* password-field */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className={!errors.password === true && validationError.value === false ? 'inputStyle' : 'inputStyleError'}
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Password length should be greater than 8 digit"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character"
                                        }
                                    })}
                                />
                            </div>
                            {errors.password && <p className="text-red-500"><ExclamationTriangleIcon className="w-4 h-4 mx-1 inline-block" />{errors.password.message}</p>}
                        </div>

                        {/* confirmPassword-field */}
                        {/* <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    className={!errors.confirmPassword === true && validationError.value === false ? 'inputStyle' : 'inputStyleError'}
                                    {...register('confirmPassword', {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Password length should be greater than 8 digit"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character"
                                        }
                                    })}
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-red-500"><ExclamationTriangleIcon className="w-4 h-4 mx-1 inline-block" />{errors.confirmPassword.message}</p>}

                        </div> */}

                        {/* Button */}
                        <div>
                            <button
                                type="submit"
                                className="submitButton"
                            >
                                Sign Up
                            </button>
                        </div>

                        {validationError.value && <p className="text-red-500"><ExclamationTriangleIcon className="w-4 h-4 mx-1 inline-block" /> {validationError.message}</p>}

                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-yellow-600 hover:text-white">
                            Log in here
                        </Link>
                    </p>

                    {isPending && <p className="text-white">Submitting...</p>}
                    {isError && <p className="text-white">{error.info.index}</p>}
                    
                </div>
            </div>
        </div>
        </div>

        <DevTool control={control} placement="top-right" />
    </>
}