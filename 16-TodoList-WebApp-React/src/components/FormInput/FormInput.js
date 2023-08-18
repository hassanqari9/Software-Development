import './FormInput.css'
import {useState, useRef} from 'react'
import ErrorModel from '../ErrorModel/ErrorModel'
import Wrapper from '../Helpers/Wrapper'

const FormInput = (props) => {
    const nameInputRef = useRef()
    const ageInputRef = useRef()
    const [error, setError] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        const enteredName = nameInputRef.current.value
        const enteredAge = ageInputRef.current.value

        if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Plz enter valid name,age'
            })
            return
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Plz enter valid age > 0'
            })
            return
        }
        const data = {
            id: Math.random().toString(),
            name: enteredName,
            age: enteredAge
        }
        props.onAddData(data)

        nameInputRef.current.value = ''
        ageInputRef.current.value = ''
    }
    const errorHandler = () => {
        setError(null)
    }
    return (
        <Wrapper>
        {error && <ErrorModel title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <div className="outerDiv">
            <form onSubmit={handleSubmit}>
                <div className="formDivs">
                    <div className='formDiv'> 
                        <label htmlFor='name'>Username</label>
                        <input 
                        type="text" 
                        ref={nameInputRef}
                        ></input>
                    </div>
                    <div className='formDiv'>
                        <label htmlFor='age'>Age(Years)</label>
                        <input 
                        type="number" 
                        id="age"
                        ref={ageInputRef}
                        ></input>
                    </div>
                    <div>
                        <button>Add User</button>
                    </div>
                </div>
            </form>
        </div>
        </Wrapper>
    )
}
export default FormInput
