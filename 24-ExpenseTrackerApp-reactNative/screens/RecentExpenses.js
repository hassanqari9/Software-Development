import { useContext, useEffect, useState } from 'react'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpenses } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true)
  const expensesCtx = useContext(ExpensesContext)
  const [error, setError] = useState()

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError('Could not fetch expenses')
      }
      setIsFetching(false)
    }
    getExpenses()
  }, [])

  if (error) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter(expense => {
    const today = new Date()
    const  days7DaysAgo = getDateMinusDays(today, 7)
    return (expense.date >= days7DaysAgo) && (expense.date <= today)
  })

  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText='No expenses regisgered for the last 7 days'/>
}

export default RecentExpenses