import DotLoader from "react-spinners/DotLoader";

import styles from'./Loader.module.css'

function Loader() {
  return (
    <div className={styles.position}>
      <DotLoader	
        className={styles.loader}
        color='black'
        loading='true'
        size={50}
      />
    </div>
  );
}

export default Loader;