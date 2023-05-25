import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient()

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const categories = await prisma.category.findMany()
    return response.status(200).json(categories)
  }

  public async show({ params, response }: HttpContextContract) {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
    })

    if (!category) {
      return response.status(404).json({ message: 'category not found' })
    }

    return response.status(200).json(category)
  }

  public async store({ request, response }: HttpContextContract) {
    const createCategorySchema = z.object({
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

    const videoValidate = createCategorySchema.parse(request.body())

    const videos = await prisma.category.create({
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

    const video = await prisma.category.update({
      where: { id: params.id },
      data: videoValidate,
    })

    return response.status(200).json(video)
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const video = await prisma.category.delete({
        where: { id: params.id },
      })

      return response.status(200).json({ message: 'Video deleted' })
    } catch (error) {
      return response.status(404).json({ message: 'Video not found' })
    }
  }
}
