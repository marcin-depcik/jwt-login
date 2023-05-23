export abstract class AbstractDatabase {
  constructor() {
    this.connect()
  }

  protected abstract connect(): Promise<void> | void
}
