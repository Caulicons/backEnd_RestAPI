import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient()

export default class VideosController {
  public async index({ response }: HttpContextContract) {
    const videos = await prisma.videos.findMany()

    return response.status(200).json(videos)
  }

  public async show({ params, response }: HttpContextContract) {
    const video = await prisma.videos.findUnique({
      where: { id: params.id },
    })

    if (!video) {
      return response.status(404).json({ message: 'Video not found' })
    }

    return response.status(200).json(video)
  }

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

    const videoValidate = createdVideoSchema.parse(request.body())

    const videos = await prisma.videos.create({
      data: videoValidate,
    })

    return response.status(201).json(videos)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const updatedVideoSchema = z.object({
      title: z
        .string()
        .nonempty({ message: 'Title is required' })
        .min(3, { message: 'Title must have at least three character' })
        .max(50, { message: 'Title must have less than 50 characters' })
        .optional(),
      description: z
        .string()
        .nonempty({ message: 'Description is required' })
        .min(10, { message: 'Description must have at least ten character' })
        .max(200, { message: 'Description must have less than 200 characters' })
        .optional(),
      url: z
        .string()
        .nonempty({ message: 'URL is required' })
        .url({ message: 'Invalid URL' })
        .optional(),
    })

    const videoValidate = updatedVideoSchema.parse(request.body())

    const video = await prisma.videos.update({
      where: { id: params.id },
      data: videoValidate,
    })

    return response.status(200).json(video)
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      await prisma.videos.delete({
        where: { id: params.id },
      })

      return response.status(200).json({ message: 'Video deleted' })
    } catch (error) {
      return response.status(404).json({ message: 'Video not found' })
    }
  }
}
