import { test } from '@japa/runner'
import { PrismaClient } from '@prisma/client'
import Env from '@ioc:Adonis/Core/Env'
const prisma = new PrismaClient()

test.group('VIDEO - DELETE', () => {
  test('DELETE /videos/:id', async ({ client }) => {
    const videoToDelete = await prisma.movie.create({
      data: {
        title: 'test deleted',
        description: 'to testes deleted',
        url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
      },
    })

    const response = await client.delete(`/videos/${videoToDelete.id}`).headers({
      'x-access-token': Env.get('TEST_TOKEN'),
    })

    response.assertStatus(201)
    response.assertBodyContains({ message: 'Video deleted successfully' })
  })
})
