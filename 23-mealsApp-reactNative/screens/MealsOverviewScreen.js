import { useLayoutEffect } from 'react'

import {MEALS, CATEGORIES} from '../data/dummy-data'
import MealsList from '../components/MealsList/MealsList'

const MealsOverviewScreen = ({route, navigation}) => {
  const catId = route.params.categoryId
  const displayedMeals = MEALS.filter(mealItem => mealItem.categoryIds.indexOf(catId) >= 0)
  
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(category => category.id === catId).title
    navigation.setOptions({
      title: categoryTitle,
    })
  }, [navigation, catId])

  return <MealsList items={displayedMeals}/>

}
export default MealsOverviewScreen
