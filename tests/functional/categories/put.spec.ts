import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

test.group('CATEGORIES - PUT', () => {
  test('PUT /categories/:id', async ({ client }) => {
    const response = await client
      .put('/categories/1')
      .json({
        name: 'Test name Category',
        color: 'red2',
      })
      .headers({
        'x-access-token': Env.get('TEST_TOKEN'),
      })

    response.assertStatus(201)
    response.assertBodyContains({
      message: 'Category updated successfully',
      data: {
        id: '1',
        name: 'Test name Category',
        color: 'red2',
      },
    })

    if (response.status() === 201) {
      await prisma.category.update({
        where: { id: response.body().data.id },
        data: {
          name: 'LIVRE',
          color: 'green',
        },
      })
    }
  })
})
