import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient()

export default class VideosController {
  public async store({ request, response }: HttpContextContract) {
    const createdVideoSchema = z.object({
      title: z
        .string()
        .nonempty({ message: 'Title is required' })
        .min(3, { message: 'Title must have at least three character' })
        .max(50, { message: 'Title must have less than 50 characters' }),
      description: z
        .string()
        .nonempty({ message: 'Description is required' })
        .min(10, { message: 'Description must have at least ten character' })
        .max(200, { message: 'Description must have less than 200 characters' }),
      url: z.string().nonempty({ message: 'URL is required' }).url({ message: 'Invalid URL' }),
    })

    const videos = await prisma.videos.create({
      data: createdVideoSchema.parse({
        ...request.body(),
      }),
    })

    console.log(videos)
    return response.status(201).json(videos)
  }
}
