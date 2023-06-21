import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/videos/free', 'VideosController.free')
  Route.resource('videos', 'VideosController')
    .middleware({ '*': ['auth'] })
    .apiOnly()
}).prefix('/api')
