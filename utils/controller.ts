const ControllersUtils = {
  getBaseURL: function () {
    return process.env.NODE_ENV === 'production'
      ? 'challegebackendapi-production.up.railway.app/api'
      : 'http://127.0.0.1:5432/api'
  },
}

export default ControllersUtils
