import express from 'express'
import middleware from './middlewares/app-middlewares'
import AppRouter from './routes'
import createDBConnection from './database/connection'
import configure from './config'

export async function app() {
    configure()
    try {
        const connection = await createDBConnection()
        const app = express()
        if (connection.isConnected) {
            console.log(
                `Connected to ${process.env.DB_DRIVER} database at ${process.env.DB_HOST}`,
            )
            app.use(express.json())
            app.use(express.urlencoded())
            app.use(AppRouter)
        } else {
            throw new Error(`Connection failed to ${process.env.DB_HOST} using current credential.`,)
        }
        return app
    } catch (error) {throw error}
}
