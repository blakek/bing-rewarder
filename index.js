#!/usr/bin/env node

var request = require('request')
  , fs = require('fs')
  , exec = require('child_process').exec
  , commander = require('commander')
  , googleNewsApi = require('./lib/google-news-titles')

commander
  .version('0.0.1')
  .option('-d, --dry-run', 'output what would have been searched, but don\'t actually search')
  .option('-f, --file [file]', 'file to get random searches from', `${__dirname}/search-list.txt`)
  .option('-g, --google [topic]', 'use Google News API to generate 10 things to search for')
  .option('-n, --num [value]', 'number of queries to perform (not compatible with --google option)', '20')
  .option('-w, --wait [value]', 'milliseconds to wait between requests')
  .parse(process.argv)

/* Clean a string to be used for Bing searches
 */
function prepareSearchString(string) {
  return string
    .replace(/\s+/g, ' ')
    .replace(/ /g, '+')
}

/* Get "length" number of elements from an array without picking the same
 * element twice
 */
function getRandomFromArray(array, length) {
  if (typeof length === 'undefined' || length > array.length) {
    length = array.length
  }

  for (var i = array.length - 1, c = length; i > 0 && c > 0; i--, c--) {
    var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
  }

  return array.slice(array.length - length)
}

/* Returns random lines in a file as an array
 */
function getRandomFromFile(file) {
  var contents = fs
    .readFileSync(commander.file, {encoding: 'UTF8'})
    .trim()
    .split('\n')

  return getRandomFromArray(contents, commander.num)
}

/* Get stuff to search for depending on the methods specified
 */
function getSearchArray(callback) {
  if (commander.google) {
    googleNewsApi.getResults(commander.google, (err, results) => {
      if (err) {
        console.error(err)
      } else {
        callback(results)
      }
    })
  } else {
    callback(getRandomFromFile())
  }
}

getSearchArray((searchTerms) => {
  for (var term of searchTerms) {
    if (commander.dryRun) {
      console.log(`Searching for "${term}"`)
    } else {
      var searchText = prepareSearchString(term)
      exec(`open https://www.bing.com/search?q=${searchText}`)
    }
  }
})
