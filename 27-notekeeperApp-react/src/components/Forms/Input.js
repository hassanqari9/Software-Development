import React from 'react'

import styles from './Input.module.css'

const Input = ({type, placeholder, style, onChange, value}) => {
  if (type === 'textArea') {
    return (
      <>
        {/* <label className={styles.label}>{placeholder}</label> */}
        <textarea placeholder={placeholder} onChange={onChange} className={styles.textarea} style={style} value={value}/>
      </>
    )
  }
  return (
    <>
      {/* <label className={styles.label}>{placeholder}</label> */}
      <input placeholder={placeholder} onChange={onChange} className={styles.input} style={style} value={value}/>
    </>
  )
}

export default Input