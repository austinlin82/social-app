import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import UserPage from './pages/UserPage'
import UserListPage from './pages/UserListPage'

function App() {
  const [page, setPage] = useState<'profile' | 'users'>('profile')

  return (
    <div className="app-root">
      <header className="app-header">
        <NavBar page={page} onNavigate={(p) => setPage(p)} />
      </header>

      <main className="app-main">
        {page === 'profile' && <UserPage />}
        {page === 'users' && <UserListPage />}
      </main>
    </div>
  )
}

export default App
