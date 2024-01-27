import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'

import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMosque } from '@fortawesome/free-solid-svg-icons'

import styles from './auth.module.css'
import {loginUser} from './authAPI'

export default function LogIn() {
  console.log('login');

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate('/')
    }
  })
  const onSubmit = (formData) => {
    mutate(formData)
  }

  return (
    <>
      <div className={styles.showcaseArea}></div>

      <div className={styles.wrapper}>
        <div className=" min-h-full flex-1 flex justify-center items-center px-6 py-12 lg:px-8 h-[100vh]">

          {/* Heading */}
          <div className=" w-[600px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm grid justify-items-center">
              <FontAwesomeIcon icon={faMosque} className="text-white h-11" />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
                Log in to your account
              </h2>
            </div>


            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" >
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* email-field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-100">
                    Email address
                  </label>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-5 h-5">
                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
              </svg> */}
                  <div className="mt-2">
                    <input
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
                    <div className="text-sm">
                      <a href="mailto:hassanqari9@gmail.com" className="font-semibold text-yellow-600 hover:text-white">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className={!errors.password === true ? 'inputStyle' : 'inputStyleError'}
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

                {/* Button */}
                <div>
                  <button
                    type="submit"
                    className="submitButton"
                  >
                    Log in
                  </button>
                </div>

              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Dont have an account?{' '}
                <Link to="/signup" className="font-semibold leading-6 text-yellow-600 hover:text-white">
                  Sign up here
                </Link>
              </p>

              {isPending && <p className="text-white">Submitting...</p>}
              {isError && <p className="text-white">{" "+error.info.index}</p>}

            </div>
          </div>
        </div>
      </div>

    </>
  )
}