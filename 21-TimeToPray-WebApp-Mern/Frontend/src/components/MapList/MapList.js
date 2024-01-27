import React from 'react';
import {Link} from 'react-router-dom'

import styles from './MapList.module.css'
import img404 from '../../images/404.png'

function MapList({ placesList }) {
  // console.log(placesList);
  // useEffect(() => {
  //   if (placesList.length > 0) {
  //     for (let i = 0; i < placesList.length; i++) {
  //       if (placesList[i].photos !== undefined) {
  //         console.log(placesList[i].photos[0].getUrl())
  //       }
  //     }
  //   } else {
  //     return
  //   }
  // }, [placesList])

  return <>
    <ul className={styles.ul}>
      <h2 className={styles.h2}>Mosques near me 🕌</h2>
      <div className={styles.wrapper}>
      {placesList.map((placeList, i) => (
        <>
          <Link to={`/mapdata/${placeList.name}/${placeList.place_id}`}>
          <div className={styles.lists}>
            <img className={styles.img} src={placeList.photos !== undefined ? placeList.photos[0].getUrl() : img404} alt='img'/>
            <li className={styles.li} key={placeList.place_id}>{placeList.name}</li>
            <li className={styles.li} >Rating: {placeList.rating ? placeList.rating + ' ⭐️' : 'Not Availible'}</li>
            <li className={styles.li} >Location: {placeList.vicinity}</li>
            
          </div>
          </Link>
        </>
      ))}
      </div>
    </ul>
  </>
}

export default MapList