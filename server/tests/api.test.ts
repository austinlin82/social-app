import app from '../src/app'
import request from 'supertest'
// Ensure mock is registered before importing the app under test
vi.mock('../src/services/userService', () => {
  return {
    getProfile: vi.fn(async () => ({
      id: 'mock-id',
      name: 'Mock User',
      email: 'mock@example.com',
      phone: '123-456-7890',
      picture: 'https://example.com/mock.jpg',
      location: 'Mockville, MV, USA',
      address: '1 Test Way, Mockville, MV, USA',
    })),
    getUsers: vi.fn(async (page: number, results: number) => ({
      page,
      results: [
        {
          id: 'u1',
          name: 'Alice Example',
          email: 'alice@example.com',
          phone: '111-222-3333',
          picture: 'https://example.com/alice.jpg',
          location: 'Austin, TX, USA',
          address: '1 First St, Austin, TX',
        },
        {
          id: 'u2',
          name: 'Bob Example',
          email: 'bob@example.com',
          phone: '444-555-6666',
          picture: 'https://example.com/bob.jpg',
          location: 'Denver, CO, USA',
          address: '2 Second St, Denver, CO',
        },
      ].slice(0, results),
    })),
  }
})

describe('API routes', () => {
  it('GET /api/health should return ok', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })

  it('GET /api/profile returns normalized user', async () => {
    const res = await request(app).get('/api/profile')
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({
      id: 'mock-id',
      name: 'Mock User',
      email: 'mock@example.com',
      phone: '123-456-7890',
      picture: expect.any(String),
      location: expect.stringContaining('Mockville'),
      address: expect.any(String),
    })
  })

  it('GET /api/users returns list with page', async () => {
    const res = await request(app).get('/api/users').query({ page: 2, results: 2 })
    expect(res.status).toBe(200)
    expect(res.body.page).toBe(2)
    expect(Array.isArray(res.body.results)).toBe(true)
    expect(res.body.results).toHaveLength(2)
    expect(res.body.results[0]).toMatchObject({ id: expect.any(String), name: expect.any(String) })
  })
})
