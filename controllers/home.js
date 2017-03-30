const request = require('request')
const cheerio = require('cheerio')
const downloadController = require('./downloader')

module.exports = {
  getIndex: (req, res) => {
    res.render('index')
  },
  postIndex: (req, res) => {
    let url = req.body.inputURL

    request(url, (error, response, html) => {
      if(!error) {
        let $ = cheerio.load(html)
        let title = $('h2.content-title').text()
        console.log(title)

        // var rows will contain different topics with their resources
        let rows = []
        // let row = {
        //   topic: ,
        //   recources: {
        //      name: , link:
        //   }
        //   empty: true/false
        // }
        $('table#lectures-grid tr').each(function(index, tr) {
          //get topics from table
          let topic = $('td strong', tr).text()
          if (topic === '') return true
          let row = {topic: topic}
          row.resources = []
          row.empty = true
          //get resources from table
          $('ul.lecture-resources-list', tr).each(function (index, ul) {
            $('li a', ul).each(function (index, a) {
              let resource = {}
              resource.title = $(a).text()
              resource.url = $(a).attr('href')
              row.resources.push(resource)
            })
            row.empty = false
          })
          rows.push(row)
          //console.log(row)
        })
        //check if there are any valid rows to download
        if (rows.length == 0) {
          res.render('index', {error : "Error: No Topics Found."})
        } else {
          //create table and render page
          res.render('download', {title: title, rows: rows})
          downloadController.downloadCourse(title, rows)
        }
      } else {
        res.render('index', {error : error})
      }
    })
  }
}