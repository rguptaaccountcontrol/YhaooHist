var yahooFinance = require('yahoo-finance');
var util = require('util');

var SYMBOL = 'tsla';
var startDt = '2021-07-26';
var endDt = '2021-07-28';
/*
yahooFinance.historical({
  symbol: SYMBOL,
  from: '2021-07-01',
  to: '2021-07-28',
  period: 'd',
  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, quotes) {
  //...
  console.log(quotes);
});
*/
/*
// This replaces the deprecated snapshot() API
yahooFinance.quote({
  symbol: 'AAPL',
  //modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
  modules: [ 'price']
}, function (err, quotes) {
  // ...
  console.log(quotes);
  let {regularMarketDayHigh, regularMarketDayLow, regularMarketPrice, regularMarketVolume} = quotes.price;
  console.log(regularMarketDayHigh, regularMarketDayLow, regularMarketPrice, regularMarketVolume);
});
*/

yahooFinance.historical({
    symbol: SYMBOL,
    from: startDt,
    to: endDt,
    period: 'd'
  }, function (err, quotes) {
    if (err) { 
        console.log(err); 
    }
    else if (quotes[0]) {
      //console.log(quotes);
      disPlayHistQuotes(quotes);
    } 
    else {
      console.log('N/A');
    }
  });

  function disPlayHistQuotes(q)
  {
    //console.log(q);
    var out = "date,High,Low,adjClose,volume\r\n";  // give the headers for the CSV file

    for (let i = 0; i < q.length; i++) {
        let {date, high, low, close,adjClose, volume} = q[i];
        date = date.toISOString().slice(0, 10);
        high = Number.parseFloat(high).toFixed(2);
        low = Number.parseFloat(low).toFixed(2);
        adjClose = Number.parseFloat(adjClose).toFixed(2);
        
        //console.log(date, high, low, adjClose, volume);
        if (i+1 < q.length)
            out = out + date + ',' + high + ',' + low + ',' + adjClose + ',' + volume + "\r\n";
        else 
            out = out + date + ',' + high + ',' + low + ',' + adjClose + ',' + volume;  // for the last one do not put "/r/n"

        //console.log(i);
      }

      console.log(out);
      convertCommaSeperated2JSON(out);
  }

  function convertCommaSeperated2JSON(csvStr)
  {

    //console.log(csvStr.split('\r\n'));

    // Split on row
    var f = csvStr.split("\r\n");

    // Get first row for column headers
    headers = f.shift().split(",");


    //console.log(f);
    //console.log(headers);

    var json = [];    
    f.forEach(function(d){
    // Loop through each row
        tmp = {}
        row = d.split(",")
        for(var i = 0; i < headers.length; i++){
            tmp[headers[i]] = row[i];
        }
    // Add object to list
        json.push(tmp);
    });

    console.log(json);
  }