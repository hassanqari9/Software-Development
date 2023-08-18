import styles from './ErrorModel.module.css'
import ReactDOM from 'react-dom'

const Backdrop = props => {
    return <div onClick={props.onConfirm} className={styles.backdrop}></div>

}
const ModelOverlay = props => {
    return <div className={styles.modal}>
        <header className={styles.header}>
            <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
            <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
            <button onClick={props.onConfirm}>Okay</button>
        </footer>
    </div>
}

const ErrorModel = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<ModelOverlay title={props.title} message={props.message} onConfirm={props.onConfirm}/>, document.getElementById('overlay-root'))}
        </>
    )
}

export default ErrorModel