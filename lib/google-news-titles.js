var request = require('request')

function cleanSearchItems(text) {
  return text
    .replace(/<\/?b>/g, '')
    .replace(/&.*;/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
}

var options = {
  uri: 'https://ajax.googleapis.com/ajax/services/feed/find',
  qs: {
    v: '1.0',
    q: ''
  }
}

function getResults(query, callback) {
  options.qs.q = query

  if (options.dryRun) {
    console.log(options)
  }

  request(options, (err, res, data) => {
    if (err) {
      callback(err)
    } else {
      var entries = JSON.parse(data).responseData.entries
      var results = entries.map((searchItem) => cleanSearchItems(searchItem.title))

      callback(null, results)
    }
  })
}

module.exports = {
  options: options,
  getResults: getResults
}
