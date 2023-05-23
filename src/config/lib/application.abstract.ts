export abstract class AbstractApplication {
  constructor() {
    this.setup()
  }

  protected abstract setup(): Promise<void> | void
}
