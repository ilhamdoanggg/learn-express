import dotenv from 'dotenv'
import { dirname, resolve } from 'path'

export default function configure() {
  if (process.env.NODE_ENV === 'test') {
    console.log('Masuk test')
    dotenv.config({
      path: resolve('test.env'),
    })
  } else {
    console.log('Masuk Real')
    dotenv.config()
  }

  if (!process.env.APP_NAME) {
    console.error(
      `Enviroment file (.env) cannot be found in the root folder, copy .env.example file to .env`,
    )
    process.exit(1)
  }
  process.env.BASE_PATH = dirname(resolve('index.js'))
}
