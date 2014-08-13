# chirp

**-- NOTE: Work in progress! --**

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
$ npm install
```


## Run

Start [gulp](http://gulpjs.com/), then start the server:

```sh
$ gulp
$ node --harmony server --track=[phrases]
```

See [this article](https://dev.twitter.com/docs/streaming-apis/parameters#track) for information on the track phrases you can use.


## Server

## Browser