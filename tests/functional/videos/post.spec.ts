import { test } from '@japa/runner'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

test.group('VIDEO - POST', () => {
  test('POST /videos', async ({ client }) => {
    const response = await client.post('/videos').json({
      title: 'Testing post request',
      description: 'description test',
      url: 'https://www.youtube.com/watch?v=OtUgra5BtwI&ab_channel=BK%27',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      title: 'Testing post request',
      description: 'description test',
      url: 'https://www.youtube.com/watch?v=OtUgra5BtwI&ab_channel=BK%27',
    })

    if (response.status() === 201) {
      await prisma.movie.delete({ where: { id: response.body().id } })
    }
  })
})
