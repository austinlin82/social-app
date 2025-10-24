import { useEffect, useState } from 'react'
import { fetchUsers } from '../apis/user'
import type { User } from '../utils/schemas'

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchUsers(1, 20)
      .then((data) => {
        if (!mounted) return
        setUsers(data)
        setError(null)
      })
      .catch((err) => {
        if (!mounted) return
        setError(String(err?.message || err))
        setUsers([])
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  if (selectedUser) {
    return (
      <div className="user-page">
        <button className="back-button" onClick={() => setSelectedUser(null)}>
          ← Go back
        </button>

        <section className="profile-card" style={{ marginTop: '1rem' }}>
          <img src={selectedUser.picture} alt={selectedUser.name} className="profile-pic" />
          <div className="profile-body">
            <h3>{selectedUser.name}</h3>
            <p className="muted">{selectedUser.location}</p>
            <p>{selectedUser.email}</p>
            {selectedUser.phone && <p>Phone: {selectedUser.phone}</p>}
            {selectedUser.address && <p className="muted small">{selectedUser.address}</p>}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="users-page">
      <h2>Random Users (20)</h2>

      {loading && <p>Loading users…</p>}
      {error && <p className="error">Error: {error}</p>}

      <ul className="users-list">
        {users.map((u) => (
          <li
            key={u.id}
            className="user-card"
            role="button"
            onClick={() => setSelectedUser(u)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedUser(u)
            }}
            tabIndex={0}
            style={{ cursor: 'pointer' }}
          >
            <img src={u.picture} alt={u.name} className="user-thumb" />
            <div>
              <strong>{u.name}</strong>
              <div className="muted">{u.email}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
