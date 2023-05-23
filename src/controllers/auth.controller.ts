import 'reflect-metadata'
import { inject } from 'inversify'
import { Request, Response } from 'express'
import { controller, httpPost } from 'inversify-express-utils'
import { TYPES } from '../types/containerTypes'
import bcrypt from 'bcrypt'
import { BaseHttpResponse } from '../utils/baseHttpResponse'
import { IUserInput } from '../interfaces/user.interface'
import { AuthService } from '../services/auth.service'
import { HttpException } from '../errors/http.exception'

@controller('/api/auth')
export class AuthController {
  constructor(
    @inject(TYPES.Services.AuthService)
    private authService: AuthService
  ) {}

  @httpPost(
    '/signup',
    TYPES.Middleware.CheckDuplicateEmailMiddleware,
    TYPES.Middleware.CheckRolesExistedMiddleware
  )
  async signup(req: Request, res: Response) {
    try {
      const userInput: IUserInput = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 8),
      }

      const user = await this.authService.signup(userInput)

      const response = BaseHttpResponse.success(
        'Successfully signed up.',
        user,
        201
      )
      res.json(response)
    } catch (error) {
      throw new HttpException('Internal error.', 500)
    }
  }

  @httpPost('/signin')
  async signin(req: Request, res: Response) {
    try {
      const user = await this.authService.signin(
        req.body.email,
        req.body.password
      )

      const response = BaseHttpResponse.success(
        'Successfully signed in.',
        user,
        200
      )

      res
        .cookie('access-token', user.accessToken, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
        .json(response)
    } catch (error) {
      throw new HttpException('Internal error.', 500)
    }
  }

  @httpPost('/signout')
  async signout(req: Request, res: Response) {
    try {
      const response = BaseHttpResponse.success(
        'Successfully signed out.',
        {},
        200
      )

      res.clearCookie('access-token', { expires: new Date() }).json(response)
    } catch (error) {
      throw new HttpException('Internal error.', 500)
    }
  }
}
