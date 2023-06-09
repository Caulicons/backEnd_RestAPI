import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PrismaClient } from '@prisma/client'
import ControllersUtils from '../../../utils/controller'
import { z } from 'zod'
const prisma = new PrismaClient()

export default class CategoriesController {
  public async index({ response, request }: HttpContextContract) {
    const baseUrl = ControllersUtils.getBaseURL()
    const { page } = request.qs()
    const skip = (page - 1) * 5
    const take = 5

    const categories = await prisma.category.findMany({
      skip,
      take,
      include: {
        videos: true,
      },
    })

    if (!categories.length) return response.status(404).json({ message: 'Categories not found' })

    const previous = skip === 0 ? false : `${baseUrl}/categories/?page=${page - 1}`
    const next = categories.length < 5 ? false : `${baseUrl}/categories/?page=${Number(page) + 1}`

    return response.status(200).json({
      categories,
      previous,
      next,
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        videos: true,
      },
    })

    if (!category) {
      return response.status(404).json({ message: 'Category not found' })
    }

    return response.status(200).json(category)
  }
  public async store({ request, response }: HttpContextContract) {
    const createdCategorySchema = z.object({
      name: z
        .string()
        .nonempty({ message: 'Title is required' })
        .min(1, { message: 'Title must have at least one character' })
        .max(50, { message: 'Title must have less than 50 characters' }),
      color: z
        .string()
        .nonempty({ message: 'Description is required' })
        .nonempty({ message: 'Color is required' })
        .max(21, { message: 'Color must have less than 21 characters' }),
    })

    const categoryValidate = createdCategorySchema.parse(request.body())

    const category = await prisma.category.create({
      data: categoryValidate,
    })

    return response.status(201).json({
      message: 'Category created successfully',
      data: category,
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const updatedCategorySchema = z.object({
      title: z
        .string()
        .nonempty({ message: 'Title is required' })
        .min(1, { message: 'Title must have at least one character' })
        .max(50, { message: 'Title must have less than 50 characters' })
        .optional(),
      color: z
        .string()
        .nonempty({ message: 'Color is required' })
        .max(21, { message: 'Color must have less than 21 characters' })
        .optional(),
    })

    const categoryValidate = updatedCategorySchema.parse(request.body())

    const category = await prisma.category.update({
      where: { id: params.id },
      data: categoryValidate,
    })

    return response.status(201).json({
      message: 'Category updated successfully',
      data: category,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      await prisma.category.delete({
        where: { id: params.id },
      })

      return response.status(201).json({ message: 'Category deleted successfully' })
    } catch (error) {
      return response.status(404).json({ message: 'Category not found, review ID or try later.' })
    }
  }

  public async listVideosByCategoryID({ params, response }: HttpContextContract) {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        videos: true,
      },
    })

    if (!category) {
      return response.status(404).json({ message: 'Category not found' })
    }

    return response.status(200).json(category.videos)
  }
}
