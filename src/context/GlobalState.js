import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// const dummyTransactions = [
//     {id: 1, text: 'Flower', amount: -20},
//     {id: 2, text: 'Salary', amount: 300},
//     {id: 3, text: 'Book', amount: -10},
//     {id: 4, text: 'Camera', amount: 150}
// ]

const initialState = {
    transactions: []
}

console.log('initialState: ', initialState.transactions);

// create context
export const GlobalContext = createContext(initialState);

// create Global Provider
export const GlobalProvider = ({ children }) => {
    console.log('globalcontext: ', initialState.transactions);

    const newLocalState = () => {
        const localTransactions = localStorage.getItem('transactions');
//        return {transactions: localTransactions ? JSON.parse(localTransactions) : []};
        return (localTransactions !== null ? JSON.parse(localTransactions) : initialState);
    }

    const [state, dispatch] = useReducer(AppReducer, initialState, newLocalState);

    console.log('globalcontextState: ', state);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(state));
    }, [state]);

    console.log('useEffectState: ', state.transactions);

    // Actions
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    );
}