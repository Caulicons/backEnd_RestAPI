import { test } from '@japa/runner'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

test.group('CATEGORIES - DELETE', () => {
  test('DELETE /categories/:id', async ({ client }) => {
    const categoryToDelete = await prisma.category.create({
      data: {
        name: 'test deleted',
        color: 'to testes deleted',
      },
    })

    const response = await client.delete(`/categories/${categoryToDelete.id}`)

    response.assertStatus(201)
    response.assertBodyContains({ message: 'Category deleted successfully' })
  })
})
