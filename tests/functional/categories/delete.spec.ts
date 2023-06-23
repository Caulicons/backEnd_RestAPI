import { test } from '@japa/runner'
import { PrismaClient } from '@prisma/client'
import Env from '@ioc:Adonis/Core/Env'
const prisma = new PrismaClient()

test.group('CATEGORIES - DELETE', () => {
  test('DELETE /categories/:id', async ({ client }) => {
    const categoryToDelete = await prisma.category.create({
      data: {
        name: 'test deleted',
        color: 'to testes deleted',
      },
    })

    const response = await client.delete(`/categories/${categoryToDelete.id}`).headers({
      'x-access-token': Env.get('TEST_TOKEN'),
    })

    response.assertStatus(201)
    response.assertBodyContains({ message: 'Category deleted successfully' })
  })
})
