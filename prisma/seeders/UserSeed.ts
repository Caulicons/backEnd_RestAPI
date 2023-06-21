import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import bcrypt from 'bcryptjs'

const users = [
  {
    id: '1',
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
  },
]

export default class UserSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    const promises = users.map(async (user) => {
      const encryptedPassword = await bcrypt.hash(user.password, 10)

      return prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          name: user.name,
          email: user.email,
          password: encryptedPassword,
        },
      })
    })

    await Promise.all(promises)

    await prisma.user.update({
      where: { email: 'admin@admin.com' },
      data: {
        id: '1',
      },
    })
  }
}
