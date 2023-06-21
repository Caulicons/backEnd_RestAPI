/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'

import './routes/videosRoutes'
import './routes/categoriesRoutes'
import './routes/userRoutes'

Route.group(() => {
  /* check if the router worked */
  Route.get('/', async ({ response }: HttpContextContract) => {
    return response.status(200).json({ opa: 'you beatty', environment: process.env.NODE_ENV })
  })
}).prefix('/api')
