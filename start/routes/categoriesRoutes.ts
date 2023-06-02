import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('categories', 'CategoriesController').apiOnly()

  Route.get('/categories/:id/videos', 'CategoriesController.listVideosByCategoryID')
}).prefix('/api')
