import express from 'express'
import { sequelize } from './config/database.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
  res.json('API funcionando.')
})

async function testDb() {
  try {
    await sequelize.authenticate()
    console.log('Connection to db has been established successfully')
  } catch (error) {
    console.log('Unable to connect database', error)
  }
}
testDb()

export default app
