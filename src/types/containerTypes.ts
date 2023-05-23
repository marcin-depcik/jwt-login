export const TYPES = {
  Schemas: {
    UserSchema: Symbol.for('UserSchema'),
  },
  Models: {
    UserModel: Symbol.for('UserModel'),
  },
  Controllers: {
    UserController: Symbol.for('UserController'),
    AuthController: Symbol.for('AuthController'),
  },
  Services: {
    UserService: Symbol.for('UserService'),
    AuthService: Symbol.for('AuthService'),
  },
  Repositories: {
    UserRepository: Symbol.for('UserRepository'),
  },
  Middleware: {
    JwtMiddleware: Symbol.for('JwtMiddleware'),
    CheckDuplicateEmailMiddleware: Symbol.for('CheckDuplicateEmailMiddleware'),
    CheckRolesExistedMiddleware: Symbol.for('CheckRolesExistedMiddleware'),
    IsAdminMiddleware: Symbol.for('IsAdminMiddleware'),
  },
}
