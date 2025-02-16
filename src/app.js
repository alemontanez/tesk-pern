import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json('API funcionando.')
})

app.use('/api', authRoutes)

export default app
