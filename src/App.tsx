import { useState } from 'react'
import './App.css'
import TransactionsPage from './pages/TransactionsPage'
import AddTransactionPage from './pages/AddTransactionPage'
import TenpistasPage from './pages/TenpistasPage'
import AddTempistaPage from './pages/AddTempistaPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'transactions' | 'add-transaction' | 'tenpistas' | 'add-tenpista'>('transactions')

  const handleNavigation = (page: string) => {
    if (page === 'transactions') {
      setCurrentPage('transactions')
    } else if (page === 'add-transaction') {
      setCurrentPage('add-transaction')
    } else if (page === 'tenpistas') {
      setCurrentPage('tenpistas')
    } else if (page === 'add-tenpista') {
      setCurrentPage('add-tenpista')
    }
  }

  return (
    <>
      {currentPage === 'transactions' && <TransactionsPage onNavigate={handleNavigation} />}
      {currentPage === 'add-transaction' && <AddTransactionPage onNavigate={handleNavigation} />}
      {currentPage === 'tenpistas' && <TenpistasPage onNavigate={handleNavigation} />}
      {currentPage === 'add-tenpista' && <AddTempistaPage onNavigate={handleNavigation} />}
    </>
  )
}

export default App
