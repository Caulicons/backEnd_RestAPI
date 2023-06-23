/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import ControllersUtils from '../../../utils/controllerUtils'
const prisma = new PrismaClient()

export default class VideosController {
  public async index({ request, response }: HttpContextContract) {
    let { page, ...searchParams } = request.qs()

    for (const [key, value] of Object.entries(searchParams)) {
      searchParams = {
        ...searchParams,
        [key]: {
          mode: 'insensitive',
          contains: value,
        },
      }
    }

    if (page) {
      const baseUrl = ControllersUtils.getBaseURL()
      const skip = (page - 1) * 5

      const videos = await prisma.movie.findMany({
        skip,
        take: 5,
        where: { ...searchParams },
        include: { categories: true },
      })

      if (!videos.length) return response.status(404).json({ message: 'Video not found' })

      const previous = skip === 0 ? false : `${baseUrl}/videos/?page=${page - 1}`
      const next = videos.length < 5 ? false : `${baseUrl}/videos/?page=${Number(page) + 1}`

      return response.status(200).json({
        videos,
        previous,
        next,
      })
    }

    const videos = await prisma.movie.findMany({
      where: { ...searchParams },
      include: { categories: true },
    })

    if (!videos.length) return response.status(404).json({ message: 'Video not found' })

    return response.status(200).json(videos)
  }

  public async show({ params, response }: HttpContextContract) {
    const video = await prisma.movie.findUnique({
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
    const videoSchema = z.object({
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
      free: z.boolean().optional(),
    })

    const videoValidate = videoSchema.parse(request.body())

    const videos = await prisma.movie.create({
      data: {
        ...videoValidate,
        categories: videoValidate.categories
          ? { connect: videoValidate.categories }
          : {
              connectOrCreate: {
                where: { name: 'LIVRE' },
                create: { name: 'LIVRE', color: 'green' },
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
      categories: z
        .array(z.object({ id: z.string().optional(), title: z.string().optional() }))
        .optional(),
    })

    const videoValidate = updatedVideoSchema.parse(request.body())

    /*     const customErrorCategories = async () => {
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
    } */

    const video = await prisma.movie
      .update({
        where: { id: params.id },
        data: {
          ...videoValidate,
          categories: {
            set: videoValidate.categories,
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
      await prisma.movie.delete({
        where: { id: params.id },
      })

      return response.status(201).json({ message: 'Video deleted successfully' })
    } catch (error) {
      return response.status(404).json({ message: 'Video not found' })
    }
  }

  public async free({ response }: HttpContextContract) {
    const freeVideos = await prisma.movie.findMany({
      where: {
        free: true,
      },
    })

    return response.status(200).json(freeVideos)
  }
}
