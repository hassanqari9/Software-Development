import React, { useState, useEffect } from "react"

const Context = React.createContext({
    auth: '',
    isLoggedIn: false
})

export const ContextProvider = (props) => {
    const [auth, setAuth] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    console.log(auth);
    console.log(isLoggedIn);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [])

    function addAuth(value) {
        setAuth(value)
    }
    function logout() {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    }

    return <Context.Provider value={{ auth, addAuth, isLoggedIn, logout }} >
        {props.children}
    </Context.Provider>
}

export default Context