import styles from './FormOutput.module.css'

const FormOutput = (props) => {
    return (
        <div className={styles.outerDiv}>
            <div className={styles.innerDiv}>
                <div>
                    <p>{props.name}</p>
                    <p>{`${props.age} years old`}</p>
                </div>
            </div>
        </div>
    )
}

export default FormOutput