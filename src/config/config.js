// Configuración de variables de entorno
import { config } from "dotenv"
config()

export const PORT = process.env.PORT || 3000
export const DB_NAME = process.env.DB_NAME || 'tesk_db'
export const DB_USER = process.env.DB_USER || 'postgres'
export const DB_PASSWORD = process.env.DB_PASSWORD || '1234'
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret'
export const FRONTEND_URL = process.env.FRONTEND_URL