import { render, screen } from '@testing-library/react'
import UserPage from './UserPage'

const mockUser = {
  id: 'u1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '123-456-7890',
  picture: 'https://example.com/jane.jpg',
  location: 'Seattle, WA, USA',
  address: '123 Main St, Seattle, WA 98101, USA',
}

describe('UserPage', () => {
  it('shows loading state', () => {
    render(<UserPage user={null} loading={true} error={null} />)
    expect(screen.getByText(/loading profile/i)).toBeInTheDocument()
  })

  it('shows error state', () => {
    render(<UserPage user={null} loading={false} error={"Boom"} />)
    expect(screen.getByText(/error: boom/i)).toBeInTheDocument()
  })

  it('renders user content', () => {
    render(<UserPage user={mockUser as any} loading={false} error={null} />)
    expect(screen.getByRole('heading', { name: /jane doe/i })).toBeInTheDocument()
    expect(screen.getByText(/seattle, wa, usa/i)).toBeInTheDocument()
    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument()
    expect(screen.getByText(/phone: 123-456-7890/i)).toBeInTheDocument()
    expect(screen.getByText(/123 main st/i)).toBeInTheDocument()
  })
})
