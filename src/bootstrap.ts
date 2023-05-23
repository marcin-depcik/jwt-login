import 'reflect-metadata'
import 'dotenv/config'

import { Database } from './config/database'
import { Application } from './config/application'

async function bootstrap(): Promise<void> {
  new Database()
  new Application()
}

bootstrap()
