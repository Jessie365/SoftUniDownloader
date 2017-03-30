const path = require('path')
const fs = require('fs')

function joinPathRemoveSpecialSymbols(path1, path2) {
  return path.normalize(path.join(path1, path2.replace(/[^а-яА-Яa-zA-Z0-9_\-., ]/g, "")))
}

//Write data to log file
function writeLog(logFilePath, data) {
  if (logFilePath !== '') {
    data += '\r\n'
    fs.appendFile(logFilePath, data, (err) => {
      if (err) console.log('ERROR: write to Log file: ' + err)
    })
  } else {
    console.log('ERROR: !!! NO LOG FILE !!!')
  }
}

function addIndexToTitle(title, index) {
  let indexPrefix = ''
  if (index < 10) {
    indexPrefix = '0' + index + '. ' + title
  } else {
    indexPrefix = index + '. ' + title
  }
  return indexPrefix
}

function pathJoin(urlPath1, urlPath2) {
  if (urlPath1.endsWith('/')) {
    if (urlPath2.startsWith('/')) {
      return urlPath1 + urlPath2.substring(1)
    } else {
      return urlPath1 + urlPath2
    }
  } else {
    if (urlPath2.endsWith('/')) {
      return urlPath1 + urlPath2
    } else {
      return urlPath1 + '/' + urlPath2
    }
  }
}

module.exports = {
  joinPathRemoveSpecialSymbols,
  pathJoin,
  writeLog,
  addIndexToTitle
}