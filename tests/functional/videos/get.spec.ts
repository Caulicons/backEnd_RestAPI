import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'

test.group('VIDEO - GET', () => {
  test('GET /videos', async ({ client, assert }) => {
    const response = await client.get('/videos').headers({
      'x-access-token': Env.get('TEST_TOKEN'),
    })

    response.assertStatus(200)

    assert.isArray(response.body())
  })

  test('GET /videos/:id', async ({ client, assert }) => {
    const response = await client.get('/videos/1').headers({
      'x-access-token': Env.get('TEST_TOKEN'),
    })

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.properties(response.body(), ['id', 'title', 'description', 'url', 'categories'])
  })

  test('GET by query params /videos/?', async ({ client, assert }) => {
    const response = await client.get('/videos/?title=The Witch').headers({
      'x-access-token': Env.get('TEST_TOKEN'),
    })
    response.assertStatus(200)
    assert.isArray(response.body())
    response.assertBodyContains([
      {
        id: '5913be33-8446-4499-a21a-b9e9b607bc96',
        title: 'The Witch',
        description:
          'In the New England of the 17th century, a banished Puritan family sets up a farm by the edge of a huge remote forest where no other family lives. Soon, sinister forces then start haunting them.',
        url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
        free: false,
        categories: [
          {
            id: 'cfb7fdf3-19db-4be5-851f-b13f1233549e',
            name: 'Horror',
            color: 'red',
          },
        ],
      },
    ])
  })
})
