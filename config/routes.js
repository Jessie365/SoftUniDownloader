const homeController = require('../controllers/home2')
const testController = require('../controllers/test')

module.exports = (app) => {
  app.get('/', homeController.getIndex)
  app.post('/', homeController.postIndex)
  app.get('/test', testController.test)
}

