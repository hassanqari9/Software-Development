import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast';

import styles from './Notes.module.css'
import NotesCard from './NotesCard'
import { getData } from '../../util/http'
import Forms from '../Forms/Forms'
import Loader from '../../ui/Loader'
import {Context} from '../../store/context'

const Notes = () => {
    const notesCtx = useContext(Context)
    const [type, setType] = useState('post')
    // const [notes, setNotes] = useState([])
    const [inputValues, setInputValues] = useState({})
    const [display, setDisplay] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 6
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = notesCtx.notes.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(notesCtx.notes.length / recordsPerPage)
    const buttonArray = [...Array(totalPages + 1).keys()].slice(1)

    useEffect(() => {
        async function fetchNotes() {
            setIsLoading(true)
            try {
                const datas = await getData()
                notesCtx.setFetchedNotes(datas.reverse())
            } catch (error) {
                notify(error.message + " Could not fetch data")
            }
            setIsLoading(false)
        }
        fetchNotes()
    }, [])

    function addNotes() {
        setDisplay(true)
        setType('post')
    }

    function updateNotes(note) {
        setDisplay(true)
        setType('update')
        setInputValues(note)
    }
    function buttonClickHandler(button) {
        setCurrentPage(button)
    }

    const notify = (message) => toast(message);

    return (
        <>
            <Toaster />
            <Forms type={type} inputValues={inputValues} display={display} setDisplay={setDisplay}  setIsLoading={setIsLoading} notify={notify}/>
            <div className={styles.navbar}><button><FontAwesomeIcon icon={faBook} size='2xl'/></button><h1 className={styles.h1}>NotesKeep</h1></div>
            <button onClick={addNotes}><FontAwesomeIcon icon={faNoteSticky} size='2xl'/></button>
            {isLoading && <Loader />}
            {!isLoading && <div className={styles.wrapper}>
                <div className={styles.cardsouterdiv}>
                    <div className={styles.cardscontainer} >
                        {records.map((note) => {
                            if (note.isPinned === true) {
                                return (
                                    <div className={styles.innerdiv} key={note.id} onClick={() => updateNotes(note)}>
                                        <NotesCard id={note.id} title={note.title} tagline={note.tagline} body={note.body} isPinned={note.isPinned}  setIsLoading={setIsLoading} notify={notify}/>
                                    </div>
                                )
                            }
                            return null
                        })}
                    </div>
                </div>
                <div className={styles.cardsouterdiv}>
                    <div className={styles.cardscontainer} >
                        {records.map((note) => {
                            if (note.isPinned === false) {
                                return (
                                    <div className={styles.innerdiv} key={note.id} onClick={() => updateNotes(note)}>
                                        <NotesCard id={note.id} title={note.title} tagline={note.tagline} body={note.body} isPinned={note.isPinned}  setIsLoading={setIsLoading} notify={notify}/>
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                {buttonArray.map((button) => {
                    return (
                        <button key={button} onClick={() => buttonClickHandler(button)}>{button}</button>
                        )
                })}
            </div>
            </div>}
        </>
    )
}

export default Notes