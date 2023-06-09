import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'

const categories = [
  {
    id: '1',
    name: 'LIVRE',
    color: 'green',
  },
  {
    name: 'Action',
    color: 'gray',
  },
  {
    name: 'Comedy',
    color: 'blue',
  },
  {
    name: 'Horror',
    color: 'red',
  },
  {
    name: 'Romance',
    color: 'yellow',
  },
  {
    name: 'Thriller',
    color: 'purple',
  },
  {
    name: 'Suspense',
    color: 'orange',
  },
  {
    name: 'Fantasy',
    color: 'pink',
  },
  {
    name: 'Mystery',
    color: 'black',
  },
  {
    name: 'Drama',
    color: 'brown',
  },
  {
    name: 'Crime',
    color: 'coral',
  },
  {
    name: 'Documentary',
    color: 'indigo',
  },
  {
    name: 'Animation',
    color: 'crimson',
  },
  {
    name: 'Musical',
    color: 'azure',
  },
  {
    name: 'War',
    color: 'marron',
  },
  {
    name: 'History',
    color: 'olive',
  },
  {
    name: 'Western',
    color: 'teal',
  },
]

export default class CategorySeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    const promises = categories.map(async (category) => {
      return prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: {
          name: category.name,
          color: category.color,
        },
      })
    })

    await Promise.all(promises)

    await prisma.category.update({
      where: { name: 'LIVRE' },
      data: { id: '1' },
    })
  }
}
