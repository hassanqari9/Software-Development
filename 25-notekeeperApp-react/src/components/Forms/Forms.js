import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './Forms.module.css'
import Input from './Input'
import { getData, storeData, updateData } from '../../util/http'
import { Context } from '../../store/context'


const Forms = ({ type, inputValues, display, setDisplay, notify, setIsLoading }) => {
  const notesCtx = useContext(Context)
  const [inputs, setInputs] = useState({
    title: '',
    tagline: '',
    body: '',
  })

  useEffect(() => {
    if (type === 'update') {
      setInputs(inputValues);
    }
    else {
      setInputs({
        title: '',
        tagline: '',
        body: '',
      })
    }
  }, [inputValues, type]);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (type === 'update') {
      try {
        notesCtx.updateNotes(inputValues.id, inputs)
        setDisplay(false)
        await updateData(inputValues.id, inputs)
        notify("Data updated sucessfully")
      } catch (error) {
        notify(error.message + " Could not update data")
      }
    }
    else {
      try {
        setDisplay(false)
        setIsLoading(true)
        const id = await storeData(inputs)
        setIsLoading(false)
        notesCtx.addNotes({ ...inputs, id: id, isPinned: false })
        setInputs({
          title: '',
          tagline: '',
          body: '',
        })
        notify("Data added sucessfully")
      } catch (error) {
        notify(error.message + " Could not store data")
      }
    }
  }

  return (
    <>
    <div onClick={() => setDisplay(false)} className={`${styles.background} ${!display && styles.display}`}></div>
    <div className={`${styles.outerdiv} ${!display && styles.display}`}>
      <div className={styles.wrapper}>
        <button onClick={() => setDisplay(false)} className={styles.close}><FontAwesomeIcon icon={faXmark} size='xl' /></button>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.container}>
            <Input onChange={(e) => inputChangedHandler('title', e.target.value)} placeholder="Title" value={inputs.title} />
            <Input onChange={(e) => inputChangedHandler('tagline', e.target.value)} placeholder="Tagline" value={inputs.tagline} />
            <Input type="textArea" onChange={(e) => inputChangedHandler('body', e.target.value)} placeholder="Add your notes here" value={inputs.body} className={styles.textarea} />
            <button className={styles.button}>{type === 'post' ? 'ADD' : 'UPDATE'}</button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Forms