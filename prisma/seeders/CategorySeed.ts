import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'

const categories = [
  {
    id: '1',
    title: 'LIVRE',
    color: 'green',
  },
  {
    title: 'Action',
    color: 'gray',
  },
  {
    title: 'Comedy',
    color: 'blue',
  },
  {
    title: 'Horror',
    color: 'red',
  },
  {
    title: 'Romance',
    color: 'yellow',
  },
  {
    title: 'Thriller',
    color: 'purple',
  },
  {
    title: 'Suspense',
    color: 'orange',
  },
  {
    title: 'Fantasy',
    color: 'pink',
  },
  {
    title: 'Mystery',
    color: 'black',
  },
  {
    title: 'Drama',
    color: 'brown',
  },
]

export default class CategorySeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    const promises = categories.map(async (category) => {
      return prisma.category.upsert({
        where: { title: category.title },
        update: {},
        create: {
          title: category.title,
          color: category.color,
        },
      })
    })

    await Promise.all(promises)

    await prisma.category.update({
      where: { title: 'LIVRE' },
      data: { id: '1' },
    })
  }
}
