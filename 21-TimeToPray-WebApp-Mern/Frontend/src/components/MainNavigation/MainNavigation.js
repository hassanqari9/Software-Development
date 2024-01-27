import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMosque } from '@fortawesome/free-solid-svg-icons'

import styles from "./MainNavigation.module.css";

const MainNavigation = ({callback, onClick}) => {
   console.log("MainNavigation");
   
   const [isVisible, seIsVisible] = useState(false)
   const [loggedIn, setLoggedIn] = useState(false)
   
   const token = localStorage.getItem('token')

   useEffect(() => {
      if (token) {
         setLoggedIn(true)
      } else {
         setLoggedIn(false)
      }
   },[loggedIn, token])
   
   // const token = useRouteLoaderData('token')
   // console.log("Token: "+token)

   useEffect(() => {
      if (window.location.pathname === '/map') {
         seIsVisible(true);
      }
   }, []);

   // function buttonClick() {
   //    onClick()
   // }

   window.google.maps.event.addDomListener(window, 'load', initialize);
   function initialize() {
      var autocomplete = new window.google.maps.places.Autocomplete((document.getElementById('autocomplete')), {
         types: ['geocode'],
      })
      autocomplete.addListener('place_changed', function () {
         var place = autocomplete.getPlace();
         let location = {
            lat: place.geometry['location'].lat(),
            lng: place.geometry['location'].lng()
         }
         // console.log(location);
         callback(location)
      })
   }

   return (
      <header className={styles.header}>

         <nav className={styles.navbar}>
            <div className={styles.navbar_container}>
               <h1 className={styles.h1}><FontAwesomeIcon icon={faMosque} style={{ color: "#080808", }} /> TimeToPray</h1>

               <ul className={styles.items}>
                  <li className={styles.item}><Link to="/">Home</Link></li>
                  <li className="item"><Link to="/">About Us</Link></li>
                  <li className="item"><Link to="/">Contact us</Link></li>
                  {!loggedIn && <li className="item"><Link to="/login">Log In</Link></li>}
                  {loggedIn && <li className="item" onClick={() => localStorage.removeItem('token')}><Link to="/">Logout</Link></li>}
               </ul>
               {isVisible && <div>
                  <input id="autocomplete" className={styles.input} type="text" placeholder="Enter Location" />
                  {/* <button className={styles.search} onClick={buttonClick}>🔍</button> */}
               </div>}
            </div>
         </nav>

      </header>)
}

export default MainNavigation;