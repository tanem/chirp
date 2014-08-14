# chirp

Stream tweet data from Twitter's public stream all the way through to the browser.


## Requirements

 * Node.js version 0.11.x (for the `harmony` flag which exposes generators)
 * Keys obtained from dev.twitter.com after [setting up a new app](https://apps.twitter.com/app/new)


## Installation

Create a `.env` file in the root of the project which contains the key info from Twitter:

```
export CHIRP_CONSUMER_KEY=[consumer key]
export CHIRP_CONSUMER_SECRET=[consumer secret]
export CHIRP_TOKEN=[token]
export CHIRP_TOKEN_SECRET=[token secret]
```

Then:

```sh
$ npm install -g gulp; npm install
```


## Run

Start [gulp](http://gulpjs.com/), then start the server:

```sh
$ gulp
$ node --harmony server --track=[phrases]
```

See [this article](https://dev.twitter.com/docs/streaming-apis/parameters#track) for information on the track phrases you can use.

## Tests

TODO!

## Implementation

### Server

The [Stweam](https://github.com/tanem/stweam) module is used to connect to [Twitter's public stream](https://dev.twitter.com/docs/api/1.1/post/statuses/filter) using the track keywords provided on startup. The key information required for the Twitter connection is loaded by [habitat](https://github.com/brianloveswords/habitat). [Shoe](https://github.com/substack/shoe) is used to stream the response back to connected browsers.

### Browser

[Browserify](https://github.com/substack/node-browserify) is used to package up the various browser modules. This means we can use the [browser-specific stream module](https://github.com/substack/stream-browserify) to deal with the server response. Rendering is then carried out by [React](https://github.com/facebook/react).
