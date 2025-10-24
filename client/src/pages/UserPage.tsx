import { useEffect, useState } from 'react'
import { fetchProfile } from '../apis/user'
import type { User } from '../utils/schemas'

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchProfile()
      .then((data) => {
        if (!mounted) return
        setUser(data)
        setError(null)
      })
      .catch((err) => {
        if (!mounted) return
        setError(String(err?.message || err))
        setUser(null)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="user-page">
      <h2>Current Profile</h2>

      {loading && <p>Loading profile…</p>}
      {error && <p className="error">Error: {error}</p>}

      {user && (
        <section className="profile-card">
          <img src={user.picture} alt={user.name} className="profile-pic" />
          <div className="profile-body">
            <h3>{user.name}</h3>
            <p className="muted">{user.location}</p>
            <p>{user.email}</p>
            {user.phone && <p>Phone: {user.phone}</p>}
            {user.address && <p className="muted small">{user.address}</p>}
          </div>
        </section>
      )}
    </div>
  )
}
