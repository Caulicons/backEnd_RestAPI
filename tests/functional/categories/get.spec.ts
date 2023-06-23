import { test } from '@japa/runner'
import Env from '@ioc:Adonis/Core/Env'

test.group('CATEGORIES - GET', () => {
  test('GET /categories', async ({ client, assert }) => {
    const response = await client.get('/categories').headers({
      'x-access-token': Env.get('TEST_TOKEN'),
    })

    response.assertStatus(200)
    assert.isArray(response.body())
  })

  test('GET /categories/:id', async ({ client, assert }) => {
    const response = await client.get('/categories/1').headers({
      'x-access-token': Env.get('TEST_TOKEN'),
    })

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.properties(response.body(), ['id', 'name', 'color', 'videos'])
  })

  test('GET videos by categories /categories/:id/videos', async ({ client, assert }) => {
    const response = await client.get('/categories/1/videos').headers({
      'x-access-token': Env.get('TEST_TOKEN'),
    })
    response.assertStatus(200)
    assert.isArray(response.body())
  })
})
