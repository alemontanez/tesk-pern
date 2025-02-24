import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js'
import projectUsersRoutes from './routes/project_users.routes.js'
import roleRoutes from './routes/role.routes.js'
import boardRoutes from './routes/board.routes.js'
import cookieParser from 'cookie-parser'
import './models/relationships.js'
import { authRequired } from './middlewares/jwtValidator.middleware.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json('API funcionando.')
})

// Rutas públicas
app.use('/api', authRoutes)

// Rutas privadas
app.use('/api', authRequired, userRoutes)
app.use('/api', authRequired, projectRoutes)
app.use('/api', authRequired, projectUsersRoutes)
app.use('/api', authRequired, roleRoutes)
app.use('/api', authRequired, boardRoutes)
// Continuar con priorities



export default app