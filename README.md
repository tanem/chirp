# chirp

 -- Work in progress! --

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

```sh
$ npm run build
$ npm start
```

[Watchify](https://github.com/substack/watchify) is also available for development purposes, e.g.:

```sh
$ npm run watch &
npm start
```