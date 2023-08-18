import { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';



const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()
  
  useEffect(() => {
    const fetchMeals = async() => {
      const response = await fetch('https://react-http-95506-default-rtdb.firebaseio.com/meals.json')

      if (!response.ok) {
        throw new Error('Somthing went wrong!')
      }

      const responseData = await response.json()

      const loadedMeals = []
      for (const key in responseData) {
        loadedMeals.push({
          id:key,
          name: responseData[key].name,
          descripton: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch(error => {
      setIsLoading(false)
      setHttpError(error.message)
    })

  }, [])

  if (isLoading) {
    return <section className={styles.MealsLoading}>
      <h1>Loading...</h1>
    </section>
  }
  if (httpError) {
    return <section className={styles.MealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map(meal =>
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  )

  return <section className={styles.meals}>
    <Card>
      <ul>{mealsList}</ul>
    </Card>
  </section>
}
export default AvailableMeals