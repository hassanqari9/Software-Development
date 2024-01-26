import {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from './NotesCard.module.css'
import {updateData, deleteData } from '../../util/http'
import {Context} from '../../store/context'

const NotesCard = ({id, title, tagline, body, isPinned, notify}) => {
  const notesCtx = useContext(Context)
  async function clickHandler(e) {
    e.stopPropagation()

    if (isPinned) {
      try {
        notesCtx.updateNotes(id, {
          isPinned: false
        })
        await updateData(id, {
          title: title,
          tagline: tagline,
          body: body,
          isPinned: false
      })
      notify("Data unpinned!")
      } catch (error) {
        notify(error.message + " Could not pin data")
      }
    }
    else {
      try {
        notesCtx.updateNotes(id, {
          isPinned: true
        })
        await updateData(id, {
          title: title,
          tagline: tagline,
          body: body,
          isPinned: true
        })
        notify("Data pinned 📍")
      } catch (error) {
        notify(error.message + " Could not pin data")
      }
    }
  }

  async function handleTrashButton(e) {
    e.stopPropagation()
    try {
      notesCtx.deleteNotes(id)
      await deleteData(id)
      notify("Data trashed successfully")
    } catch (error) {
      notify(error.message + " Could not delete data")
    }
  }

  return (
    <>
      <div className={styles.card}>
        <div>
          <button className={styles.buttons} onClick={clickHandler}>{isPinned ? <FontAwesomeIcon icon={faMapPin} size='xl' color='black'/> : <FontAwesomeIcon icon={faMapPin} size='xl' color='lightgrey'/>}</button>
          <button onClick={handleTrashButton} className={styles.buttons}><FontAwesomeIcon icon={faTrash} size='xl' /></button>
        </div>
        {/* <h4>{id}</h4> */}
        <h1 className={styles.h1}>{title}</h1>
        <h3 className={styles.h3}>{tagline}</h3>
        <p className={styles.p}>{body}</p>
    </div>
    </>
  )
}

export default NotesCard