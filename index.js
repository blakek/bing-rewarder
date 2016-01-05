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

/* Clean a string to be used for Bing searches
 */
function prepareSearchString(string) {
  return string
    .replace(/\s+/g, ' ')
    .replace(/ /g, '+')
}

  return array[Math.floor(Math.random() * array.length)]
/* Get "length" number of elements from an array without picking the same
 * element twice
 */
function getRandomFromArray(array, length) {
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
