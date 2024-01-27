import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      {text: enteredGoalText, id: Math.random().toString()},
    ])
    endAddGoalHandler()
  }
  
  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goals) => goals.id !== id)
    })
  }
  function startAddGoalHandler() {
    setModalIsVisible(true)
  }
  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  return (
  <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button 
        title='Add New Goal' 
        color='grey' 
        onPress={startAddGoalHandler}
        />
      {modalIsVisible && (
        <GoalInput 
        visble={modalIsVisible} 
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalHandler}
        />)}
    
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem 
              text={itemData.item.text} 
              id={itemData.item.id}
              onDeleteItem={deleteGoalHandler}
              />
              )
            }}
            keyExtractor={(item, index) => {
              // return index
              return item.id
            }}
            alwaysBounceVertical={false} 
            />
      </View>
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    padding: 40,
  },
  goalsContainer: {
    flex: 5,
    backgroundColor: '#311b6b',
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden'
  }
})