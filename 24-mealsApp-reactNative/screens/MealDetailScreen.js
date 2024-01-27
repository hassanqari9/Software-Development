import { useContext, useLayoutEffect } from "react"
import { Text, View, Image, StyleSheet, ScrollView } from "react-native"
import { useSelector, useDispatch } from "react-redux"

import MealDetails from "../components/MealDetails"
import Subtitle from "../components/MealDetail/Subtitle"
import List from "../components/MealDetail/List"
import IconButton from "../components/IconButton"
import { MEALS } from "../data/dummy-data"
// import {FavoritesContext} from '../store/context/favorites-context'
import {addFavorite, removeFavorite} from '../store/redux/favorites'

const MealDetailScreen = ({ route, navigation }) => {
  // const favoriteMealsCtx = useContext(FavoritesContext)
  const favoriteMealsIds = useSelector((state) => state.favoritesMeals.ids)
  const dispatch = useDispatch()

  const mealId = route.params.mealId
  const selectedMeal = MEALS.find(meal => meal.id === mealId)
  const mealsIsFavorite = favoriteMealsIds.includes(mealId)

  changeFavoriteStatusHandler = () => {
    if (mealsIsFavorite) {
      // favoriteMealsCtx.removeFavorite(mealId)
      dispatch(removeFavorite({id: mealId}))
    } else {
      // favoriteMealsCtx.addFavorite(mealId)
      dispatch(addFavorite({id: mealId}))
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton 
          icon={mealsIsFavorite ? 'star' : 'star-outline'} 
          color="white" 
          onPress={changeFavoriteStatusHandler}
        />
      }
    })
  }, [navigation, changeFavoriteStatusHandler])

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View>
        <MealDetails
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          affordability={selectedMeal.affordability}
          textStyle={styles.detailText}
        />
      </View>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  )
}
export default MealDetailScreen

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white'
  },
  detailText: {
    color: 'white'
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
})