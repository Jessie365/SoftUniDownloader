const helper = require('./helper')
const config = require('./../config/config').development
const confOptions = require('./../config/options')
const https = require('https')
const cheerio = require('cheerio')
const download = require('url-download')
const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn

function downloadCourse(title, rows) {
  let downloadsCount = {
    totalDocuments : 0,
    downloadedDocuments : 0,
    totalVideos : 0,
    videosToDownload: 0,
    downloadedVideos: 0
  }

  let courseDownloadDir = helper.joinPathRemoveSpecialSymbols(config.DOWNLOAD_LOCAL_PATH, title);
  let logFilePath = helper.joinPathRemoveSpecialSymbols(courseDownloadDir, config.LOG_FILE)

  //create Course DIR
  if (!fs.existsSync(courseDownloadDir)) {
    fs.mkdirSync(courseDownloadDir)
  }
  helper.writeLog(logFilePath, 'Course Title: ' + title)
  let index = 0
  for (let row of  rows) {
    if (!row.empty) {
      //create Topic DIR
      let topicDir = helper.addIndexToTitle(row.topic, index++)
      let topicDownloadDir = helper.joinPathRemoveSpecialSymbols(courseDownloadDir, topicDir);
      if (!fs.existsSync(topicDownloadDir)) {
        fs.mkdirSync(topicDownloadDir)
      }
      for (let resource of row.resources) {
        //check for different types of resources
        let check = /^\/trainings\/resources\/officedocument/
        if (check.test(resource.url)) {
          downloadsCount.totalDocuments++
          getResourceDownloadURL(resource.url, topicDownloadDir, logFilePath, downloadsCount)
        }
        check = /^\/downloads\/svn\//
        if (check.test(resource.url)) {
          downloadsCount.totalDocuments++
          let downloadUrl = helper.pathJoin('https://softuni.bg/', resource.url)
          console.log('Try: ' + downloadUrl)
          helper.writeLog(logFilePath, 'Try: ' + downloadUrl)
          //downloadFile(downloadUrl, topicDownloadDir)
        }
        check = /^\/trainings\/resources\/video/
        if (check.test(resource.url)) {
          downloadsCount.totalVideos++
          console.log('TOTAL VIDEOS = ' + downloadsCount.totalVideos)
          helper.writeLog(logFilePath, 'TOTAL VIDEOS = ' + downloadsCount.totalVideos)
          //if (resource.title.includes('Видео - 10 юли 2015 - Иван Йонков (камера)')) {
          if (resource.title.includes('(каамера)')) {
            console.log('WARNING: "Видео (камера)" found in video Title: ' + resource.title)
            helper.writeLog(logFilePath, 'WARNING: "Видео (камера)" found in video Title: ' + resource.title)
          } else if (resource.title.includes('Инструкции за използване на SoftUni Learning System (SULS)')) {
            console.log('WARNING: "Инструкции за използване на SoftUni Learning System (SULS)" found in video Title: '
              + resource.title)
            helper.writeLog(logFilePath, 'WARNING: "Инструкции за използване на SoftUni Learning System (SULS)" found in video Title: '
              + resource.title)
          } else {
            downloadsCount.videosToDownload++;
            getResourceDownloadURL(resource.url, topicDownloadDir, logFilePath, downloadsCount, 'video')
            //downloadVideo(resource.url, topicDownloadDir)
          }
        }
      }
    }
  }
}

//Send HTTP GET REQ to find the direct download url for the particular resource
function getResourceDownloadURL(resourceURL, topicDownloadDir, logFilePath, downloadsCount,
    resourceType = 'doc') {
  let url = helper.pathJoin('https://softuni.bg/', resourceURL)
  console.log('Try: ' + url)
  helper.writeLog(logFilePath, 'Try: ' + url)
  //download a tag document
  //use https GET REQ with Cookies
  let options = confOptions.getOptions(resourceURL)
  let req = https.request(options, function(res)
  {
    let html = ''
    console.log(options.host + ':' + res.statusCode)
    res.setEncoding('utf8')

    res.on('data', function (chunk) {
      html += chunk
    })

    res.on('end', function() {
      let $ = cheerio.load(html)
      if (resourceType === 'doc') {
        //DOWNLOAD DOCUMENT
        let downloadURL = $("a[href*='softuni.bg/download']").attr('href')
        if (downloadURL) {
          downloadFile(downloadURL, topicDownloadDir, logFilePath, downloadsCount)
        } else {
          //cannot get file from server
          console.log('ERROR: cannot get file from server:\n' + url)
          helper.writeLog(logFilePath, 'ERROR: cannot get file from server:' + url)
        }
      } else if (resourceType === 'video') {
        //DOWNLOAD VIDEO
        videoURL = $("meta[content*='https://i.ytimg.com/vi/']").attr('content')
        if (videoURL) {
          videoURL = videoURL.match(/^https:\/\/i\.ytimg\.com\/vi\/(.+?)\//)
          if (videoURL) {
            downloadVideo(videoURL[1], topicDownloadDir, logFilePath, downloadsCount)
          }
        } else {
          console.log('ERROR: Cannot get YOUTUBE URL for: ' + url)
          helper.writeLog(logFilePath, 'ERROR: Cannot get YOUTUBE URL for: ' + url)
        }
      }
    })
  })
  req.end()
}

function downloadFile(downloadURL, topicDownloadDir, logFilePath, documentsCount) {
  download(downloadURL, topicDownloadDir).on('close', (err, url, file) => {
    if (err) {
      console.log(err)
      helper.writeLog(logFilePath, err)
    }
  }).on('done', () => {
    documentsCount.downloadedDocuments++
    console.log('DOWNLOADED Document: ' + downloadURL)
    helper.writeLog(logFilePath, 'DOWNLOADED Document: ' + downloadURL)
    console.log(`DOWNLOADED Documents: ${documentsCount.downloadedDocuments} / ${documentsCount.totalDocuments}`)
    helper.writeLog(logFilePath, `DOWNLOADED Documents: ${documentsCount.downloadedDocuments} / ${documentsCount.totalDocuments}`)
  })
}

function downloadVideo(youtubeURL, topicDownloadDir, logFilePath, downloadsCount) {
  if (youtubeURL) {
    let url = helper.pathJoin('https://youtu.be/', youtubeURL)
    let cmd_getFileName = spawn(config.YOUTUBE_PATH, [url, '--get-filename'])
    let fileName = ''
    cmd_getFileName.stdout.on('data', (data) => {
      console.log(`FILE NAME: ${data}`)
      helper.writeLog(logFilePath, `FILE NAME: ${data}`)
      fileName = data
    })
    cmd_getFileName.on('close', (code) => {
      if (code === 0) {
        //success when reading the filename
        //concat destination folder with file name
        let destinationPath = topicDownloadDir + '\\' + fileName
        console.log('DESTINATION: ' + destinationPath)
        helper.writeLog(logFilePath, 'DESTINATION: ' + destinationPath)
        let cmd_download = spawn(config.YOUTUBE_PATH, ['-o', destinationPath, url])

        cmd_download.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`)
        })

        cmd_download.on('close', (code) => {
          console.log(`child process exited with code ${code}`)
          downloadsCount.downloadedVideos++
          console.log('DOWNLOADED VIDEOS = ' + downloadsCount.downloadedVideos)
          helper.writeLog(logFilePath, `child process exited with code ${code}`)
          helper.writeLog(logFilePath, `DOWNLOADED VIDEOS: ${downloadsCount.downloadedVideos} / ${downloadsCount.videosToDownload}`)
        })
      } else {
        console.log('ERROR: cannot find video URL for ' + url)
        helper.writeLog(logFilePath, 'ERROR: cannot find video URL for ' + url)
      }
    })
  }
}

module.exports = {
  downloadCourse
}