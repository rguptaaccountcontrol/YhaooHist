// We should avoid using this since it uses an NPM yahoo-finance

var yahooFinance = require('yahoo-finance');
//var util = require('util');

var SYMBOL = 'tsla';

// This replaces the deprecated snapshot() API
yahooFinance.quote({
    symbol: SYMBOL,
    //modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
    modules: [ 'price']
  }, function (err, quotes) {
    // ...
    console.log(quotes);
    let {regularMarketDayHigh, regularMarketDayLow, regularMarketPrice, regularMarketVolume} = quotes.price;
    console.log(regularMarketDayHigh, regularMarketDayLow, regularMarketPrice, regularMarketVolume);
  });