import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json('API funcionando.')
})

app.use('/api', authRoutes)
app.use('/api', userRoutes)

export default app
