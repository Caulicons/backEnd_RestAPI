import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'

export default class Auth {
  public async handle({ response, request }: HttpContextContract, next: () => Promise<void>) {
    const token = request.body().token || request.qs().token || request.headers()['x-access-token']

    if (!token) {
      return response.status(403).send('A token is required for authentication')
    }

    try {
      const decoded = jwt.verify(token, Env.get('APP_KEY'))
      /*       console.log('decoded', decoded)
      console.log('type decoded', typeof decoded) */
      request.all().user = decoded
    } catch (err) {
      return response.status(401).send('Invalid Token')
    }

    await next()
  }
}
