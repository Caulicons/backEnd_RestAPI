import { test } from '@japa/runner'

test('display to developer', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertBodyContains({ opa: 'you beatty', environment: 'development' })
})
