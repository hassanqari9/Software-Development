import { createContext, useState } from "react";

export const Context = createContext({
    notes: [],
    setFetchedNotes: () => {},
    addNotes: () => {},
    updateNotes: () => {},
    deleteNotes: () => {},
})

const ContextProvider = ({children}) => {
    const [notes, setNotes] = useState([])

    const setFetchedNotes = (notes) => {
        setNotes(notes)
    }

    const addNotes = (note) => {
        setNotes((prevNotes) => [note, ...prevNotes])
    }
    const updateNotes = (id, newnote) => {
        const updatedNotes = notes.map((note) => {
            if (note.id === id) {
                return {...note, ...newnote}
            }
            return note
        })
        setNotes(updatedNotes)
    }
    const deleteNotes = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id)
        setNotes(updatedNotes)
    }

    const value = {
        notes,
        setFetchedNotes,
        addNotes,
        updateNotes,
        deleteNotes,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
