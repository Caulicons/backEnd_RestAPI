import { test } from '@japa/runner'

test.group('VIDEO - GET', () => {
  test('GET /videos', async ({ client, assert }) => {
    const response = await client.get('/videos')

    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('GET /videos/:id', async ({ client, assert }) => {
    const response = await client.get('/videos/1')

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.properties(response.body(), ['id', 'title', 'description', 'url', 'categories'])
  })

  test('GET by query params /videos/?', async ({ client, assert }) => {
    const response = await client.get('/videos/?title=The Godfather')
    response.assertStatus(200)
    assert.isArray(response.body())
    response.assertBodyContains([
      {
        id: '1',
        title: 'The Godfather',
        description:
          'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
        url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
        categories: [],
      },
    ])
  })
})
