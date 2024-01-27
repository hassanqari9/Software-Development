import React, { useEffect, useState } from 'react';
import MapList from '../MapList/MapList';
import styles from './MapComponent.module.css'
import mosqueMarker from '../../images/mosque2.svg'
import personMarker from '../../images/personMarker.svg'
import MainNavigation from '../MainNavigation/MainNavigation';

const MapComponent = () => {
  console.log("map");

  const [placesList, setPlacesList] = useState([])
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [current, setCurrent] = useState(false)

  const callback = (location) => {
    // console.log("Location: " + location);
    setCoordinates(location)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordinates(pos)
      }
    )
  }, [current])

  useEffect(() => {
    initMap()
  }, [coordinates])

  // const handleClick = () => {
  // }
  const handleClickCurrent = () => {
    // get currrent location for user
    setCurrent(prev => !prev)
  }

  const initMap = async () => {
    //create map
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 17,
      mapId: "8d193001f940fde3",
    });

    //create place-service
    const service = new window.google.maps.places.PlacesService(mapInstance);

    //perform a nearby search
    service.nearbySearch(
      { location: coordinates, radius: 1000, type: "mosque" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
        // console.log(results);
        setPlacesList(results)
        addPlaces(results, mapInstance);
      }
    );
  };
  window.google.maps.event.addDomListener(window, 'load', initMap);

  function addPlaces(places, map) {
    // Create an info window to share between markers.
    const infoWindow = new window.google.maps.InfoWindow();
    //add mosques location markers to map
    places.map((place) => {
      const marker = new window.google.maps.Marker({
        map,
        icon: mosqueMarker,
        title: place.name,
        position: place.geometry.location,
      });
      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.title);
        infoWindow.open(marker.map, marker);
        const selectedPlace = places.filter((place) => {
          return place.name === marker.title
        })
        setPlacesList([selectedPlace[0]])
        // console.log(placesList);
      });

      return 0;
    })
    //add user location marker to map
    new window.google.maps.Marker({
      map,
      icon: personMarker,
      title: 'Your current location',
      position: coordinates,
    });
  }

  return (
    <>
      <MainNavigation callback={callback} /*onClick={handleClick}*/ />
      <div className={styles.mapWrapper}>
        <div id="map" style={{ width: '70%', height: '92.5vh' }} className={styles.map}></div>
        <MapList placesList={placesList} />
      </div>
      <button className={styles.current} onClick={handleClickCurrent}>🔍</button>
    </>
  );
}

export default MapComponent;