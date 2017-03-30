const mongoose = require('mongoose')

module.exports = (config) => {
  mongoose.connect(config.connectionString)


  let database = mongoose.connection
  database.once('open', (error) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('DB Opened on address: ' + config.connectionString)
  })

  //REQUIRE MODULES HERE!

}
