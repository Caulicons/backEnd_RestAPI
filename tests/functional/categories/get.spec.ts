import { test } from '@japa/runner'

test.group('CATEGORIES - GET', () => {
  test('GET /categories', async ({ client, assert }) => {
    const response = await client.get('/categories')

    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('GET /categories/:id', async ({ client, assert }) => {
    const response = await client.get('/categories/1')

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.properties(response.body(), ['id', 'title', 'color', 'videos'])
  })

  test('GET videos by categories /categories/:id/videos', async ({ client, assert }) => {
    const response = await client.get('/categories/1/videos')
    response.assertStatus(200)
    assert.isArray(response.body())
    response.assertBodyContains([
      {
        title: 'The Witch',
        description:
          'In the New England of the 17th century, a banished Puritan family sets up a farm by the edge of a huge remote forest where no other family lives. Soon, sinister forces then start haunting them.',
        url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
      },
      {
        title: 'test',
        description: 'test',
        url: 'test',
      },
    ])
  })
})
