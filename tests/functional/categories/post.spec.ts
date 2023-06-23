import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

test.group('CATEGORIES - POST', () => {
  test('POST /categories', async ({ client }) => {
    const response = await client
      .post('/categories')
      .json({
        name: 'Testing post request',
        color: 'description test',
      })
      .headers({
        'x-access-token': Env.get('TEST_TOKEN'),
      })

    response.assertStatus(201)
    response.assertBodyContains({
      message: 'Category created successfully',
      data: {
        name: 'Testing post request',
        color: 'description test',
      },
    })

    if (response.status() === 201) {
      await prisma.category.delete({ where: { id: response.body().data.id } })
    }
  })
})
