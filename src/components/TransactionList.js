import React, { useContext } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
    const { transactions } = useContext(GlobalContext);
    const { clearTransactions } = useContext(GlobalContext);

    return (
        <>
            <div className="tx-history">
                <h3>Transaction History</h3>
                <button 
                    className="clear-btn" 
                    onClick={() => clearTransactions()}
                >
                    clear all
                </button>
            </div>
            <ul className="list">
                {transactions.map(transaction => (
                    <Transaction 
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </ul>
        </>
    );
}