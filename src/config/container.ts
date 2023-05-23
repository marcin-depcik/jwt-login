import { Schema } from 'mongoose'
import { Container } from 'inversify'
import { TYPES } from '../types/containerTypes'
import { IUser } from '../interfaces/user.interface'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'
import { UserRepository } from '../repositories/user.repository'
import { UserSchemaFactory } from '../factories/userSchema.factory'
import { UserModel } from '../models/user.model'
import { JwtMiddleware } from '../middleware/jwt.middleware'
import { AuthService } from '../services/auth.service'
import { AuthController } from '../controllers/auth.controller'
import { CheckDuplicateEmailMiddleware } from '../middleware/checkDuplicateEmail.middleware'
import { CheckRolesExistedMiddleware } from '../middleware/checkRolesExisted.middleware'
import { IsAdminMiddleware } from '../middleware/isAdmin.middleware'

export const container = new Container({
  defaultScope: 'Singleton',
})

// bootstrap Schemas
container
  .bind<Schema<IUser>>(TYPES.Schemas.UserSchema)
  .toDynamicValue(() => new UserSchemaFactory().create())

// bootstrap Models
container.bind<UserModel>(TYPES.Models.UserModel).to(UserModel)

// bootstrap Controller
container
  .bind<UserController>(TYPES.Controllers.UserController)
  .to(UserController)
container
  .bind<AuthController>(TYPES.Controllers.AuthController)
  .to(AuthController)

// bootstrap Service
container.bind<UserService>(TYPES.Services.UserService).to(UserService)
container.bind<AuthService>(TYPES.Services.AuthService).to(AuthService)

// bootstrap Repository
container
  .bind<UserRepository>(TYPES.Repositories.UserRepository)
  .to(UserRepository)

// bootstrap Middleware
container.bind<JwtMiddleware>(TYPES.Middleware.JwtMiddleware).to(JwtMiddleware)
container
  .bind<CheckDuplicateEmailMiddleware>(
    TYPES.Middleware.CheckDuplicateEmailMiddleware
  )
  .to(CheckDuplicateEmailMiddleware)
container
  .bind<CheckRolesExistedMiddleware>(
    TYPES.Middleware.CheckRolesExistedMiddleware
  )
  .to(CheckRolesExistedMiddleware)
container
  .bind<IsAdminMiddleware>(TYPES.Middleware.IsAdminMiddleware)
  .to(IsAdminMiddleware)
