import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import UserListPage from './UserListPage'

vi.mock('../apis/user', () => {
  return {
    fetchUsers: vi.fn(async () => [
      {
        id: 'id1',
        name: 'Alice Smith',
        email: 'alice@example.com',
        phone: '111-222-3333',
        picture: 'https://example.com/alice.jpg',
        location: 'Austin, TX, USA',
        address: '1 First St, Austin, TX',
      },
      {
        id: 'id2',
        name: 'Bob Jones',
        email: 'bob@example.com',
        phone: '444-555-6666',
        picture: 'https://example.com/bob.jpg',
        location: 'Denver, CO, USA',
        address: '2 Second St, Denver, CO',
      },
    ]),
  }
})

describe('UserListPage', () => {
  it('renders users and can open/close inline profile', async () => {
    render(<UserListPage />)

    // list shows two users
    expect(await screen.findByText(/alice smith/i)).toBeInTheDocument()
    expect(await screen.findByText(/bob jones/i)).toBeInTheDocument()

    // click first user
    await userEvent.click(screen.getByText(/alice smith/i))

    // inline profile shows
    expect(await screen.findByRole('heading', { name: /alice smith/i })).toBeInTheDocument()
    expect(screen.getByText(/austin, tx, usa/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()

    // go back to list
    await userEvent.click(screen.getByRole('button', { name: /go back/i }))

    // list is visible again
    expect(await screen.findByText(/bob jones/i)).toBeInTheDocument()
  })
})
