# chirp

Stream tweet data from Twitter's public stream all the way through to the browser.

![](https://raw.github.com/tanem/chirp/master/screenshot.png)

## Requirements

 * Node.js version 0.11.x (for the `harmony` flag which exposes generators)
 * Keys obtained from dev.twitter.com after [setting up a new app](https://apps.twitter.com/app/new).

## Installation

Create a `.env` file in the root of the project which contains the key information from Twitter:

```
export CHIRP_CONSUMER_KEY=[consumer key]
export CHIRP_CONSUMER_SECRET=[consumer secret]
export CHIRP_TOKEN=[token]
export CHIRP_TOKEN_SECRET=[token secret]
```

Then:

```sh
$ npm install -g gulp bunyan; npm install
```

## Run

Start [gulp](http://gulpjs.com/), then start the server (see [this article](https://dev.twitter.com/docs/streaming-apis/parameters#track) for information on the track phrases you can use). `port` will default to `3000` if it is not specified:

```sh
$ gulp
$ node --harmony server --track=[phrases] --port=[port]
```

To prettify the log output, pipe it through the [Bunyan](https://github.com/trentm/node-bunyan) tool: 

```sh
$ node --harmony server --track=[phrases] --port=[port] | bunyan
```

## Tests

_watch this space_

## Implementation

### Server

 * The [Stweam](https://github.com/tanem/stweam) module is used to connect to Twitter's public stream using the track keywords provided on startup
 * The key information required for the Twitter connection is loaded by [habitat](https://github.com/brianloveswords/habitat)
 * [Shoe](https://github.com/substack/shoe) is used to stream the response back to connected browsers.

### Browser

 * [Browserify](https://github.com/substack/node-browserify) is used to package up the various browser modules
 * The [browser-specific stream module](https://github.com/substack/stream-browserify) is used to deal with the server response
 * Rendering is then carried out by [React](https://github.com/facebook/react)
 * The total number of tweet avatars rendered is dependant on the size of the window
 * Once the tweet avatar total is maxed, new tweet data is added to the front of the list, and old data is removed
 * Hovering over a tweet avatar for a certain amount of time will render the associated tweet text in a popup
 * If the app is idle, random Tweets will be shown every ten seconds.
