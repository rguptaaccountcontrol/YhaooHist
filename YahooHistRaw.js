var ticker = 'AAPL';
var stDt = new Date('2021/7/2');
var endDt = new Date('2021/8/4');

endDt.setDate(endDt.getDate() + 1);  // need to increase the endDate by 1 for some reason for yahoo to give the correct result

var period1 = Math.floor((stDt)/1000);
var period2 = Math.floor((endDt)/1000);

//console.log(period1,period2);


//var url = "https://query1.finance.yahoo.com/v7/finance/download/" + {ticker} + "?period1=1596413275&period2=1627949275&interval=1d&events=history&includeAdjustedClose=true";
// note the quote mark it is ` and not ', the ` mark is where the tilda mark is on the top left part of the keyboard.
//var url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=1596413275&period2=1627949275&interval=1d&events=history&includeAdjustedClose=true`;
var url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=${period1}&period2=${period2}&interval=1d&events=history&includeAdjustedClose=true`;


console.log(url);

var request = require("request");

request(url, function (error, response, body) { 
    if (!error && response.statusCode == 200) {  
        var stock_data = body;
        console.log("Yahoo Finance API: ", stock_data);

          
    }
    else
    {
        console.log(error, response.statusCode);
    }
});

