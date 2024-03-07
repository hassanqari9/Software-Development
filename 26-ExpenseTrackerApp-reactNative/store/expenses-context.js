import { createContext, useReducer } from "react"

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
})

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state]
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted
        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            // console.log(updateableExpenseIndex);
            const updateableExpense = state[updateableExpenseIndex];
            // console.log(updateableExpense);
            const updatedItem = {...updateableExpense, ...action.payload.expenseData};
            // console.log(updatedItem);
            const updatedExpenses = [...state]
            updatedExpenses[updateableExpenseIndex] = updatedItem;
            // console.log(updatedExpenses);
            return updatedExpenses
        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload)
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData})
    }
    function setExpenses(expenses) {
        dispatch({type: 'SET', payload: expenses})
    }
    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id})
    }
    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id, expenseData}})
    }

    const value = {
        expenses: expensesState,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpense,
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>   
}

export default ExpensesContextProvider