import {View, StyleSheet, Text} from 'react-native'
import ExpensesSummary from '../ExpensesOutput/ExpensesSummary'
import ExpensesList from '../ExpensesOutput/ExpensesList'
import { GlobalStyles } from '../../constants/styles'


const ExpensesOutput = ({expenses, expensesPeriod, fallbackText}) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses}/>
  }

  return <View style={styles.container}>
    <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
    {content}
  </View>
}
export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,
    },
    infoText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
      marginTop: 32,
    }
})