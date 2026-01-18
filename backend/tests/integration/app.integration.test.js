import app from '../../src/app.js'
import request from 'supertest'
import { sequelize } from '../../src/config/database.js'

describe('App integration tests', () => {
  describe('GET /', () => {
    beforeAll(async () => {
      await sequelize.authenticate()
    })

    afterAll(async () => {
      await sequelize.close()
    })

    it('should return 200 and API message', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
      expect(res.body).toBe('API up and running')
    })
  })
})