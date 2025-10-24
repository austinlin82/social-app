type Props = {
  page: 'profile' | 'users'
  onNavigate: (page: 'profile' | 'users') => void
}

export default function NavBar({ page, onNavigate }: Props) {
  return (
    <nav className="nav-bar">
      <button
        className={page === 'profile' ? 'active' : ''}
        onClick={() => onNavigate('profile')}
      >
        Profile
      </button>
      <button
        className={page === 'users' ? 'active' : ''}
        onClick={() => onNavigate('users')}
      >
        Users
      </button>
    </nav>
  )
}
