import express from 'express'
import cookieParser from 'cookie-parser'
import { container } from './container'
import { AbstractApplication } from './lib/application.abstract'
import { InversifyExpressServer } from 'inversify-express-utils'
import { HttpException } from '../errors/http.exception'

export class Application extends AbstractApplication {
  constructor() {
    super()
  }

  protected async setup(): Promise<void> {
    const server = new InversifyExpressServer(container)

    server
      .setConfig((app) => {
        app.use(express.json())
        app.use(cookieParser())
      })
      .setErrorConfig((app) => {
        app.use((err, req, res, next) => {
          if (err instanceof HttpException) {
            const { message, statusCode } = err
            res.status(statusCode).json({ data: {}, error: message })
          }
        })
      })
      .build()
      .listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
      })
  }
}
