const path = require('path')

module.exports = {
  development: {
    rootFolder: path.normalize(path.join(__dirname, '/../')),
    //conf options
    //Path to the youtube-dl.exe
    YOUTUBE_PATH : 'C:/Users/Example/tools/youtube-dl.exe',
    //Download path where the downloaded content will be stored
    DOWNLOAD_LOCAL_PATH : 'C:/Users/Example/Courses/',
    //Name of the Log File
    LOG_FILE : 'log.txt'
  },
  production: {}
}