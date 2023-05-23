import mongoose from 'mongoose'
import { injectable } from 'inversify'
import { AbstractDatabase } from './lib/database.abstract'

@injectable()
export class Database extends AbstractDatabase {
  constructor() {
    super()
  }

  protected async connect(): Promise<void> {
    if (process.env.DB_URI) {
      await mongoose
        .connect(process.env.DB_URI)
        .then((x) => {
          console.log('Connected to DB')
        })
        .catch((e) => console.error(e))
    }
  }
}
