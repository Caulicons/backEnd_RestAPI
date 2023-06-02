/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class VideosController {
  public async index(ctx: HttpContextContract) {
    if (ctx.request.qs()) return this.getVideoByQueryParameters(ctx)

    const videos = await prisma.video.findMany({ include: { categories: true } })
    return ctx.response.status(200).json(videos)
  }

  public async show({ params, response }: HttpContextContract) {
    const video = await prisma.video.findUnique({
      where: { id: params.id },
      include: {
        categories: true,
      },
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
      categories: z.array(z.object({ id: z.string() })).optional(),
    })

    const videoValidate = createdVideoSchema.parse(request.body())

    const videos = await prisma.video.create({
      data: {
        ...videoValidate,
        categories: videoValidate.categories
          ? { connect: videoValidate.categories }
          : {
              connectOrCreate: {
                where: { title: 'LIVRE' },
                create: { title: 'LIVRE', color: 'green' },
              },
            },
      },
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
      categories: z.array(z.object({ id: z.string() })).optional(),
    })

    const videoValidate = updatedVideoSchema.parse(request.body())

    const customErrorCategories = async () => {
      if (!videoValidate.categories) return

      const categoryVerification = await Promise.all(
        videoValidate.categories.map(async (category) => {
          await prisma.category.findFirstOrThrow({ where: { id: category.id } }).catch(() => {
            throw new Error(`Category ${category.id} not found`)
          })

          return { id: category.id }
        })
      )

      return categoryVerification
    }

    const video = await prisma.video
      .update({
        where: { id: params.id },
        data: {
          ...videoValidate,
          categories: {
            set: await customErrorCategories(),
          },
        },
      })
      .catch((e) => {
        console.log(e)
        return response.status(404).json({ message: 'Video not found' })
      })

    return response.status(201).json(video)
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      await prisma.video.delete({
        where: { id: params.id },
      })

      return response.status(201).json({ message: 'Video deleted successfully' })
    } catch (error) {
      return response.status(404).json({ message: 'Video not found' })
    }
  }

  private async getVideoByQueryParameters({ response, request }: HttpContextContract) {
    const video = await prisma.video.findMany({
      where: { ...request.qs() },
      include: { categories: true },
    })

    if (!video.length) return response.status(404).json({ message: 'Video not found' })

    return response.status(200).json(video)
  }
}
