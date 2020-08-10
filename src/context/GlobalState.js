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

// create context
export const GlobalContext = createContext(initialState);

// create Global Provider
export const GlobalProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(AppReducer, initialState, () => {

        const localTransactions = localStorage.getItem('transactions');
        return (localTransactions !== null ? JSON.parse(localTransactions) : initialState);
    });

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(state));
    }, [state]);

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

    function clearTransactions(transaction) {
        dispatch({
            type: 'CLEAR_TRANSACTIONS'
        });
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction,
            clearTransactions
        }}>
            {children}
        </GlobalContext.Provider>
    );
}