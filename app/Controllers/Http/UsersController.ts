import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

    // check if the user already exists
    // Validate if user exist in our database
    /* const isOldUser = await prisma.user.findUnique({
      where: { email: validatedUser.email },
    })

    if(isOldUser) {
      return response.status(400).json({ message: 'User already exists' })
    }
    */

    const encryptedPassword = await bcrypt.hash(validatedUser.password, 10)

    // create new user
    /* const user = await prisma.user.create({
      data: {
        name: validatedUser.name,
        email: validatedUser.email.toLowerCase(),
        password: encryptedPassword,
      },
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30s',
    })

    user.token = token

    res.status(201).json({
      user
    })
    }) */


  }
}
