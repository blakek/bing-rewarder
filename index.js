#!/usr/bin/env node

var request = require('request')
  , exec = require('child_process').exec
  , commander = require('commander')
  , googleNewsApi = require('./lib/google-news-titles')

commander
  .version('0.0.1')
  .option('-d, --dry-run', 'output what would have been searched, but don\'t actually search')
  .option('-g, --google [topic]', 'use Google News API to generate 10 things to search for')
  .option('-n, --num [value]', 'number of queries to perform (not compatible with --google option)', '20')
  .option('-w, --wait [value]', 'milliseconds to wait between requests')
  .parse(process.argv)

function cleanSearchItems(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/ /g, '+')
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getSearchArray(callback) {
  if (commander.google) {
    googleNewsApi.getResults(commander.google, (err, results) => {
      if (err) {
        console.error(err)
      } else {
        callback(results)
      }
    })
  }
}

getSearchArray((searchTerms) => {
  for (var term of searchTerms) {
    if (commander.dryRun) {
      console.log(`Searching for "${term}"`)
    } else {
      var searchText = cleanSearchItems(term)
      exec(`open https://www.bing.com/search?q=${searchText}`)
    }
  }
})
