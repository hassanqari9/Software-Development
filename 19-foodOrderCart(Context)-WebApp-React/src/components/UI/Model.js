import styles from './Model.module.css'
import ReactDOM from 'react-dom'

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onClose}></div>
}
const ModelOverlay = props => {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays')
const Model = props => {
    return <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
      {ReactDOM.createPortal(<ModelOverlay>{props.children}</ModelOverlay>, portalElement)}
    </>
}

export default Model