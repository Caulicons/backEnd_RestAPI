import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    const userSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const validatedUser = userSchema.parse(request.body())

    const isOldUser = await prisma.user.findUnique({
      where: { email: validatedUser.email },
    })

    if (isOldUser) {
      return response.status(400).json({ message: 'User already exists' })
    }

    const encryptedPassword = await bcrypt.hash(validatedUser.password, 10)

    const userData = await prisma.user.create({
      data: {
        name: validatedUser.name,
        email: validatedUser.email.toLowerCase(),
        password: encryptedPassword,
      },
    })

    const token = jwt.sign({ id: userData.id, email: userData.email }, Env.get('APP_KEY'), {
      expiresIn: '15m',
    })

    const user = { ...userData, token }

    response.status(201).json(user)
  }

  public async login({ request, response }: HttpContextContract) {
    const userSchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const validatedUser = userSchema.parse(request.body())

    const user = await prisma.user.findUnique({
      where: { email: validatedUser.email },
    })

    if (!user) {
      return response.status(400).json({ message: 'User not found' })
    }

    if (!(await bcrypt.compare(validatedUser.password, user.password))) {
      return response.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, Env.get('APP_KEY'), {
      expiresIn: '15m',
    })

    const userWithToken = { ...user, token }

    response.status(200).json(userWithToken)
  }
}
