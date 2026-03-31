import { useState } from 'react'
import './App.css'
import TransactionsPage from './pages/TransactionsPage'
import AddTransactionPage from './pages/AddTransactionPage'
import AddTempistaPage from './pages/AddTempistaPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'transactions' | 'add-transaction' | 'add-tempista'>('transactions')

  const handleNavigation = (page: string) => {
    if (page === 'transactions') {
      setCurrentPage('transactions')
    } else if (page === 'add-transaction') {
      setCurrentPage('add-transaction')
    } else if (page === 'tenpistas' || page === 'add-tempista') {
      setCurrentPage('add-tempista')
    }
  }

  return (
    <>
      {currentPage === 'transactions' && <TransactionsPage onNavigate={handleNavigation} />}
      {currentPage === 'add-transaction' && <AddTransactionPage onNavigate={handleNavigation} />}
      {currentPage === 'add-tempista' && <AddTempistaPage onNavigate={handleNavigation} />}
    </>
  )
}

export default App
