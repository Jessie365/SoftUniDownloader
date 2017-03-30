const homeController = require('../controllers/home')

module.exports = (app) => {
  app.get('/', homeController.getIndex)
  app.post('/', homeController.postIndex)
}
