import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OutlinedButoon from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import { useEffect, useState } from 'react';
import { fetchPlaceDetails } from '../util/database';

function PlaceDetails({route, navigation}) {
    const [fetchedPlace, setFetchedPlace] = useState()

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLat: fetchedPlace.lat,
            initialLng: fetchedPlace.lng
        })
    }

    const selectedPlaceId = route.params.placeId;
   
    useEffect(() => {
        async function loadPlaceData() {
            const place = await fetchPlaceDetails(selectedPlaceId)
            setFetchedPlace(place)
            navigation.setOptions({title: place.title})
        }
        loadPlaceData()
    }, [selectedPlaceId])

    if (!fetchedPlace) {
        return <View style={styles.fallback}>
            <Text>Loading...</Text>
        </View>
    }

    return <ScrollView>
        <Image style={styles.image} source={{uri: fetchedPlace.imageUri}}/>
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{fetchedPlace.address}</Text>
            </View>
        </View>
        <OutlinedButoon icon="map" onPress={showOnMapHandler}>View on map</OutlinedButoon>
    </ScrollView>
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
})