import type { User } from '../utils/schemas'

type UserPageProps = {
  user: User | null
  loading: boolean
  error: string | null
}

export default function UserPage({ user, loading, error }: UserPageProps) {
  return (
    <div className="user-page">
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
