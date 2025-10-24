import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import UserPage from './pages/UserPage'
import UserListPage from './pages/UserListPage'
import { fetchProfile } from './apis/user'
import type { User } from './utils/schemas'

function App() {
  const [page, setPage] = useState<'profile' | 'users'>('profile')
  // Fetch current profile once per app load and keep it stable in memory
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true)
  const [profileError, setProfileError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoadingProfile(true)
    fetchProfile()
      .then((u) => {
        if (!mounted) return
        setCurrentUser(u)
        setProfileError(null)
      })
      .catch((err) => {
        if (!mounted) return
        setProfileError(String(err?.message || err))
        setCurrentUser(null)
      })
      .finally(() => {
        if (!mounted) return
        setLoadingProfile(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="app-root">
      <header className="app-header">
        <NavBar page={page} onNavigate={(p) => setPage(p)} />
      </header>

      <main className="app-main">
        {page === 'profile' && (
          <UserPage user={currentUser} loading={loadingProfile} error={profileError} />
        )}
        {page === 'users' && <UserListPage />}
      </main>
    </div>
  )
}

export default App
