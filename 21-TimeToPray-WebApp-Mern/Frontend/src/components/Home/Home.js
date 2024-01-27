import React from "react";
import {Link} from 'react-router-dom'

import styles from './Home.module.css'

const Home = ()=>{
   console.log("Home");
   
    return  (
    <section className={styles.showcaseArea}>
       <div className={styles.showcaseContainer}>
          <h2>TIME TO PRAY</h2>
          <p>Grow community of your Masjid by new technology!</p>
     
          <button  className={styles.btn}>Search Masjid</button>
          <Link to="/map"><button  className={styles.btn}>Locate Nearby Mosque</button></Link>
 
       </div>
    </section>)
}

export default Home;