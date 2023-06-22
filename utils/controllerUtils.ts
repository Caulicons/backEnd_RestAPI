import Env from '@ioc:Adonis/Core/Env'

const ControllersUtils = {
  getBaseURL: function () {
    return Env.get('NODE_ENV') === 'production'
      ? 'challegebackendapi01.up.railway.app/api'
      : 'http://127.0.0.1:5432/api'
  },
}

export default ControllersUtils
