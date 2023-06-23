import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

test.group('VIDEO - PUT', () => {
  test('PUT /videos/:id', async ({ client }) => {
    const response = await client
      .put('/videos/1')
      .json({
        title: 'Best film in the world ?',
        description: 'I think no one is better than me',
        url: 'https://www.youtube.com/watch?v=gpK6uc2yD3w&ab_channel=Bib48_MovieClips',
        categories: [{ id: '1' }],
      })
      .headers({
        'x-access-token': Env.get('TEST_TOKEN'),
      })

    response.assertStatus(201)
    response.assertBodyContains({
      id: '1',
      title: 'Best film in the world ?',
      description: 'I think no one is better than me',
      url: 'https://www.youtube.com/watch?v=gpK6uc2yD3w&ab_channel=Bib48_MovieClips',
    })

    if (response.status() === 201) {
      await prisma.movie.update({
        where: { id: response.body().id },
        data: {
          title: 'The Godfather',
          description:
            'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
          url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
          categories: { update: [] },
        },
      })
    }
  })
})
